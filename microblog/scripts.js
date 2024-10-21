const postForm = document.getElementById('post-form');
const usernameInput = document.getElementById('username');
const postContent = document.getElementById('post-content');
const postsList = document.getElementById('posts-list');
const yourPostsList = document.getElementById('your-posts-list');

postForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = usernameInput.value;
    const content = postContent.value;

    const response = await fetch('/posts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, content })
    });

    const post = await response.json();
    displayPost(post);
    displayYourPost(post);
    postContent.value = '';
    usernameInput.value = '';
});

async function loadPosts() {
    const response = await fetch('/posts');
    const posts = await response.json();
    posts.forEach(post => {
        displayPost(post);
        displayYourPost(post); // Display in both sections
    });
}

function displayPost(post) {
    const postDiv = document.createElement('div');
    postDiv.classList.add('post');
    postDiv.innerHTML = `
        <p><strong>${post.username}</strong>: ${post.content}</p>
        <small>${new Date(post.createdAt).toLocaleString()}</small>
        <button onclick="deletePost(${post.id})">Delete</button>
        <button onclick="editPost(${post.id}, '${post.content}')">Edit</button>
        <button onclick="likePost(${post.id})">Like (${post.likes || 0})</button>
        <button onclick="sharePost('${post.content}')">Share</button>
        <div id="comments-${post.id}"></div>
        <form id="comment-form-${post.id}" onsubmit="addComment(event, ${post.id})">
            <input type="text" placeholder="Add a comment" required>
            <button type="submit">Comment</button>
        </form>
    `;
    postsList.prepend(postDiv);
    loadComments(post.id);
}

function displayYourPost(post) {
    const yourPostDiv = document.createElement('div');
    yourPostDiv.classList.add('post');
    yourPostDiv.innerHTML = `
        <p><strong>${post.username}</strong>: ${post.content}</p>
        <small>${new Date(post.createdAt).toLocaleString()}</small>
        <button onclick="deletePost(${post.id})">Delete</button>
        <button onclick="editPost(${post.id}, '${post.content}')">Edit</button>
    `;
    yourPostsList.prepend(yourPostDiv);
}

function editPost(id, content) {
    const newContent = prompt("Edit your post:", content);
    if (newContent) {
        fetch(`/posts/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ content: newContent })
        })
        .then(response => response.json())
        .then(updatedPost => {
            // Update both your posts and all posts sections
            document.querySelector(`#posts-list .post:nth-child(${id})`).innerHTML = updatedPost.content;
            document.querySelector(`#your-posts-list .post:nth-child(${id})`).innerHTML = updatedPost.content;
        });
    }
}

function deletePost(id) {
    fetch(`/posts/${id}`, { method: 'DELETE' })
        .then(() => {
            document.querySelector(`#posts-list .post:nth-child(${id})`).remove();
            document.querySelector(`#your-posts-list .post:nth-child(${id})`).remove();
        });
}

function likePost(id) {
    fetch(`/posts/${id}/like`, { method: 'POST' })
        .then(() => loadPosts());
}

function sharePost(content) {
    navigator.clipboard.writeText(content).then(() => {
        alert("Post content copied to clipboard!");
    });
}

function addComment(event, postId) {
    event.preventDefault();
    const commentInput = event.target.querySelector('input[type="text"]');
    const commentContent = commentInput.value;

    fetch(`/posts/${postId}/comments`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ content: commentContent })
    }).then(() => {
        commentInput.value = '';
        loadComments(postId);
    });
}

function loadComments(postId) {
    fetch(`/posts/${postId}/comments`)
        .then(response => response.json())
        .then(comments => {
            const commentsDiv = document.getElementById(`comments-${postId}`);
            commentsDiv.innerHTML = comments.map(comment => `<p>${comment.content}</p>`).join('');
        });
}

loadPosts();
