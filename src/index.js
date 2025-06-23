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
  } catch (error) {
    console.error('Error fetching posts:', error);
    postsUl.innerHTML = '<li>Error loading posts</li>';
  }
}

// Render posts to DOM
function renderPosts(posts) {
  postsUl.innerHTML = '';
  
  posts.forEach(post => {
    const li = document.createElement('li');
    li.className = 'post-item';
    li.dataset.id = post.id;
    
    // Display first 50 characters of content
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
  const postId = e.currentTarget.dataset.id;
  
  try {
    const response = await fetch(`http://localhost:3000/posts/${postId}`);
    const post = await response.json();
    
    postDetail.innerHTML = `
      <img src="${post.imageUrl}" alt="${post.title}">
      <h2>${post.title}</h2>
      <p>Author: <strong>${post.author}</strong></p>
      <div class="content">${post.content}</div>
    `;
    
    // Add click to title to toggle content
    const title = postDetail.querySelector('h2');
    title.addEventListener('click', () => {
      const content = postDetail.querySelector('.content');
      content.style.display = content.style.display === 'none' ? 'block' : 'none';
    });
    
  } catch (error) {
    console.error('Error fetching post details:', error);
    postDetail.innerHTML = '<p>Error loading post details</p>';
  }
}