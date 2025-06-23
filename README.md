# Simple Blog Post Manager

A simple web application for managing blog posts. Users can view a list of blog posts, see post details, and create new posts. The app uses a JSON server as a mock backend for storing and retrieving posts.

## Features

- **View Blog Posts:** See a list of the latest blog posts in the sidebar.
- **Post Details:** Click on a post to view its full details, including title, author, image, and content.
- **Show More/Show Less:** Toggle between viewing the latest 3 posts or all posts.
- **Create New Post:** Add a new blog post using a simple form.
- **Responsive UI:** Clean and modern interface styled with CSS.

## Project Structure

```
.
├── Css/
│   └── style.css         # Styles for the app
├── src/
│   └── index.js          # Main JavaScript logic
├── db.json               # Mock database for JSON server
├── index.html            # Main HTML file
└── README.md             # Project documentation
```

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/)
- [JSON Server](https://github.com/typicode/json-server) (for mock backend)

### Installation

1. **Clone the repository:**
   ```sh
   git clone https://github.com/your-username/simple-blog-post-manager.git
   cd simple-blog-post-manager
   ```

2. **Install JSON Server globally (if not already installed):**
   ```sh
   npm install -g json-server
   ```

3. **Start the JSON Server:**
   ```sh
   json-server --watch db.json --port 3000
   ```
   This will start the server at `http://localhost:3000`.

4. **Open the app:**
   - Open `index.html` in your browser.

## Usage

- **View Posts:** The sidebar shows the latest 3 posts by default. Click "Show All Posts" to see all posts.
- **View Details:** Click on any post in the list to see its details on the right.
- **Toggle Content:** Click the post title in the detail view to show/hide the full content.
- **Add Post:** Click "Create New Post", fill in the form, and submit to add a new post.

## Customization

- **Styling:** Modify [`Css/style.css`](Css/style.css) to change the look and feel.
- **Backend:** The app uses [`db.json`](db.json) as a mock database. You can edit this file to add or remove posts manually.

## Code Overview

- **HTML:** [`index.html`](index.html) defines the structure of the app.
- **CSS:** [`Css/style.css`](Css/style.css) provides all the styles.
- **JavaScript:** [`src/index.js`](src/index.js) handles fetching posts, rendering UI, and managing events.

## Example Post Structure

Each post in [`db.json`](db.json) looks like:
```json
{
  "id": "1",
  "title": "Sample Post",
  "author": "Jane Doe",
  "imageUrl": "https://example.com/image.jpg",
  "content": "This is the content of the post."
}
```

## Screenshots

![Blog Post Manager Screenshot](https://via.placeholder.com/800x400?text=Blog+Post+Manager+Screenshot)

## License

This project is licensed under the MIT License.

---

