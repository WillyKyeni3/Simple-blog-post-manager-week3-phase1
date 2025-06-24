// DOM Elements
const postsUl = document.getElementById('posts-ul');
const postDetail = document.getElementById('post-detail');
const newPostForm = document.getElementById('new-post-form');
const newPostBtn = document.getElementById('new-post-btn');

// State
let allPosts = [];

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  main();
});

function main() {
  fetchPosts();
  setupEventListeners();
}

// Fetch all posts from JSON Server
async function fetchPosts() {
  try {
    const response = await fetch('http://localhost:3000/posts');
    allPosts = await response.json();
    renderPosts(allPosts.slice(0, 3)); // Show latest 3 posts initially

    // Show details for the first post automatically
    if (allPosts.length > 0) {
      showPostDetail(allPosts[0].id);
    }
  } catch (error) {
    console.error('Error fetching posts:', error);
    postsUl.innerHTML = '<li>Error loading posts</li>';
  }
}

//  show post detail by ID
// added edit and delete buttons
async function showPostDetail(postId) {

  try {
    const response = await fetch(`http://localhost:3000/posts/${postId}`);
    const post = await response.json();

    postDetail.innerHTML = `
      <img src="${post.imageUrl}" alt="${post.title}">
      <h2>${post.title}</h2>
      <p>Author: <strong>${post.author}</strong></p>
      <div class="content">${post.content}</div>
      <div class="actions">
    <button class="myButton edit-btn"><i class='bx bx-edit-alt'></i></button>
    <button class="myDeleteButton delete-btn"><i class='bx bx-trash'></i></button>
</div>
    `;

    // Add click to title to toggle content
    const title = postDetail.querySelector('h2');
    title.addEventListener('click', () => {
      const content = postDetail.querySelector('.content');
      content.style.display = content.style.display === 'none' ? 'block' : 'none';
    });

    // Add event listeners for edit and delete
    postDetail.querySelector('.edit-btn').addEventListener('click', () => {
      showEditForm(post.id, post.title, post.author, post.imageUrl, post.content);
    });
    postDetail.querySelector('.delete-btn').addEventListener('click', () => {
      deletePost(post.id);
    });

  } catch (error) {
    console.error('Error fetching post details:', error);
    postDetail.innerHTML = '<p>Error loading post details</p>';
  }
}

// Render posts to DOM
function renderPosts(posts) {
  postsUl.innerHTML = '';
  
  posts.forEach(post => {
    const li = document.createElement('li');
    li.className = 'post-item';
    li.dataset.id = post.id;
    
    li.innerHTML = `
      <strong>${post.title}</strong>
      <p>${post.content.substring(0, 50)}...</p>
    `;
    
    li.addEventListener('click', handlePostClick);
    postsUl.appendChild(li);
  });
}

// Setup all event listeners
function setupEventListeners() {
  // Show/hide form
  newPostBtn.addEventListener('click', () => {
    newPostForm.style.display = newPostForm.style.display === 'none' ? 'flex' : 'none';
  });

  // Form submission
  newPostForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const newPost = {
      title: document.getElementById('title').value,
      author: document.getElementById('author').value,
      imageUrl: document.getElementById('image-url').value,
      content: document.getElementById('content').value
    };
    
    try {
      const response = await fetch('http://localhost:3000/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newPost)
      });
      
      const createdPost = await response.json();
      allPosts.unshift(createdPost);
      renderPosts(allPosts.slice(0, 3));
      
      // Reset form and hide
      newPostForm.reset();
      newPostForm.style.display = 'none';
      
    } catch (error) {
      console.error('Error creating post:', error);
    }
  });

  // Dropdown actions
  document.getElementById('show-all')?.addEventListener('click', (e) => {
    e.preventDefault();
    renderPosts(allPosts);
  });
  
  document.getElementById('show-latest')?.addEventListener('click', (e) => {
    e.preventDefault();
    renderPosts(allPosts.slice(0, 3));
  });
}

// Handle post click
async function handlePostClick(e) {
  // Prevent default link behavior
  e.preventDefault();
  const postId = e.currentTarget.dataset.id;
  
  try {
    const response = await fetch(`http://localhost:3000/posts/${postId}`);
    const post = await response.json();
    
    postDetail.innerHTML = `
      <img src="${post.imageUrl}" alt="${post.title}">
      <h2>${post.title}</h2>
      <p>Author: <strong>${post.author}</strong></p>
      <div class="content">${post.content}</div>
      <div class="actions">
    <button class="myButton edit-btn"><i class='bx bx-edit-alt'></i></button>
    <button class="myDeleteButton delete-btn"><i class='bx bx-trash'></i></button>
</div>
    `;
    
    // Add click to title to toggle content
    const title = postDetail.querySelector('h2');
    title.addEventListener('click', () => {
      const content = postDetail.querySelector('.content');
      content.style.display = content.style.display === 'none' ? 'block' : 'none';
    });

    // Add event listeners for edit and delete
    postDetail.querySelector('.edit-btn').addEventListener('click', () => {
      showEditForm(post.id, post.title, post.author, post.imageUrl, post.content);
    });
    postDetail.querySelector('.delete-btn').addEventListener('click', () => {
      deletePost(post.id);
    });
    
  } catch (error) {
    console.error('Error fetching post details:', error);
    postDetail.innerHTML = '<p>Error loading post details</p>';
  }
}
// Advanced deliverables
// Show edit form with pre-filled values
function showEditForm(postId, title, author, imageUrl, content) {
  postDetail.innerHTML = `
    <div class="edit-form">
      <h3>Edit Post</h3>
      <div>
        <input type="text" id="edit-title" value="${title}" placeholder="Edit title">
        <input type="text" id="edit-author" value="${author}" placeholder="Edit author">
        <input type="url" id="edit-image-url" value="${imageUrl}" placeholder="Edit image URL">
        <textarea id="edit-content" placeholder="Edit content">${content}</textarea>
      </div>
      <div>
        <button class="myButton edit-btn"><i class='bx bx-check'></i></button>
        <button class="myDeleteButton delete-btn"><i class='bx bx-x'></i></button>
      </div>
    </div>
  `;

  // Save button (check icon)
  postDetail.querySelector('.edit-btn').addEventListener('click', () => {
    saveEdit(postId);
  });

  // Cancel button (x icon)
  postDetail.querySelector('.delete-btn').addEventListener('click', () => {
    cancelEdit(postId);
  });
}

// update the post by saving the changes 
function saveEdit(postId) {  
  const newTitle = document.getElementById('edit-title').value;
  const newAuthor = document.getElementById('edit-author').value;
  const newImageUrl = document.getElementById('edit-image-url').value;
  const newContent = document.getElementById('edit-content').value;

  fetch(`http://localhost:3000/posts/${postId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: newTitle,
      author: newAuthor,
      imageUrl: newImageUrl,
      content: newContent
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      alert("Post updated successfully!");
      // Update local state and UI
      fetchPosts();
      showPostDetail(postId);
    })
    .catch((error) => {
      alert("Error updating post.");
      console.error(error);
    });
}

// Cancel edit and return to post detail
function cancelEdit(postId) {
  showPostDetail(postId);
}

// Delete post by ID
function deletePost(postId) {
  if (confirm("Are you sure you want to delete this post?")) {
    fetch(`http://localhost:3000/posts/${postId}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) throw new Error("Delete failed");
        alert("Post deleted successfully!");
        fetchPosts();
        postDetail.innerHTML = ""; // Optionally clear the detail view
      })
      .catch((error) => {
        alert("Error deleting post.");
        console.error(error);
      });
  }
}

// Initial call to fetch and display posts
fetchPosts();