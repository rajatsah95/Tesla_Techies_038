document.addEventListener("DOMContentLoaded", () => {
    // Select the elements
    const writeButton = document.getElementById('write-button');
    const initialPage = document.getElementById('initial-page');
    const newPage = document.getElementById('new-page');
    const publishButton = document.getElementById('publish-button');
    const postsSection = document.getElementById('posts-section');
    const titleField = document.getElementById('editable-title');
    const contentField = document.getElementById('editable-content');

    // Show the new page when "Write" button is clicked
    writeButton.addEventListener('click', () => {
        initialPage.classList.add('hidden');
        newPage.classList.remove('hidden');
    });

    // Clear placeholder text on focus if it matches the default
    titleField.addEventListener('focus', () => {
        if (titleField.classList.contains('empty')) {
            titleField.textContent = '';
            titleField.classList.remove('empty');
        }
    });

    contentField.addEventListener('focus', () => {
        if (contentField.classList.contains('empty')) {
            contentField.textContent = '';
            contentField.classList.remove('empty');
        }
    });

    // Restore placeholder text if left empty on blur
    titleField.addEventListener('blur', () => {
        if (titleField.textContent.trim() === '') {
            titleField.textContent = '';
            titleField.classList.add('empty');
        }
    });

    contentField.addEventListener('blur', () => {
        if (contentField.textContent.trim() === '') {
            contentField.textContent = '';
            contentField.classList.add('empty');
        }
    });

    // Handle the publish button click
    publishButton.addEventListener('click', () => {
        // Get the values from the editable fields
        const title = titleField.textContent.trim();
        const content = contentField.textContent.trim();

        // Simple validation
        if (title && content) {
            // Create a new post element
            const post = document.createElement('div');
            post.className = 'post';

            const postTitle = document.createElement('div');
            postTitle.className = 'post-title';
            postTitle.textContent = title;

            const postContent = document.createElement('div');
            postContent.className = 'post-content';
            postContent.textContent = content;

            const deleteButton = document.createElement('button');
            deleteButton.className = 'delete-button';
            deleteButton.textContent = 'Delete';

            // Append title, content, and delete button to the post
            post.appendChild(postTitle);
            post.appendChild(postContent);
            post.appendChild(deleteButton);

            // Append the post to the posts section
            postsSection.appendChild(post);

            // Clear the editable fields
            titleField.textContent = '';
            contentField.textContent = '';
            titleField.classList.add('empty');
            contentField.classList.add('empty');

            // Add event listener to delete button to remove the post
            deleteButton.addEventListener('click', () => {
                postsSection.removeChild(post);
            });
        } else {
            alert('Please provide both a title and story content.');
        }
    });

    // Initialize placeholders
    titleField.classList.add('empty');
    contentField.classList.add('empty');
});
