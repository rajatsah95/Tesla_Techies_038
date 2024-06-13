// Function to fetch and display users
async function fetchAndDisplayUsers() {
    try {
        const response = await fetch('http://localhost:3000/users');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const users = await response.json();
        const usersContainer = document.getElementById('users-container');

        users.forEach(user => {
            const userDiv = document.createElement('div');
            userDiv.classList.add('user');
            userDiv.innerHTML = `
                <h3>${user.name}</h3>
                <p>Email: ${user.email}</p>
            `;
            usersContainer.appendChild(userDiv);
        });
    } catch (error) {
        console.error('Error fetching users:', error);
    }
}

// Function to fetch and display articles
async function fetchAndDisplayArticles() {
    try {
        const response = await fetch('http://localhost:3000/articles');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const articles = await response.json();
        const articlesContainer = document.getElementById('articles-container');

        articles.forEach(article => {
            const articleDiv = document.createElement('div');
            articleDiv.classList.add('article');
            articleDiv.innerHTML = `
                <h3>${article.articleTitle}</h3>
                <h4 class="authorName">authorName:${article.authorName}</h4>
              
                <img src="${article.articleImage}" alt="${article.articleTitle}">
                <p class="article-content">${article.content}</p>
            `;
            articlesContainer.appendChild(articleDiv);
        });
        // articlesContainer.style.textAlign = "center"; // Center-align articles container
    } catch (error) {
        console.error('Error fetching articles:', error);
    }
}

// Fetch and display users and articles on page load
window.addEventListener('DOMContentLoaded', () => {
    fetchAndDisplayUsers();
    fetchAndDisplayArticles();
});
