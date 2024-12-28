document.addEventListener('DOMContentLoaded', function () {
    const firstRow = document.getElementById('first-row');
    const subsequentRows = document.getElementById('subsequent-rows');

    fetch('/blog/articles.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch articles');
            }
            return response.json();
        })
        .then(articles => {
            // Sort articles by date (newest first)
            articles.sort((a, b) => new Date(b.date) - new Date(a.date));

            // 1) Handle the first 2 articles
            const firstTwo = articles.slice(0, 2);
            firstTwo.forEach(article => {
                const articleCard = document.createElement('div');
                articleCard.classList.add('article-card');

                // Generate relative or formatted date
                const relativeDate = getRelativeTime(article.date);

                // Build card
                articleCard.innerHTML = `
                    <div class="article-content">
                        <img src="${article.image}" alt="${article.title}" class="article-image">
                        <h3><a href="${article.url}">${article.title}</a></h3>
                        <p>${article.description}</p>
                        <small class="article-date">${relativeDate}</small>
                    </div>
                `;
                firstRow.appendChild(articleCard);
            });

            // 2) Remaining articles, grouped by 3
            const remainingArticles = articles.slice(2);

            for (let i = 0; i < remainingArticles.length; i += 3) {
                // Create a new row
                const rowDiv = document.createElement('div');
                rowDiv.classList.add('row');

                // For each group of 3
                const chunk = remainingArticles.slice(i, i + 3);
                chunk.forEach(article => {
                    const articleCard = document.createElement('div');
                    articleCard.classList.add('article-card');

                    const relativeDate = getRelativeTime(article.date);

                    articleCard.innerHTML = `
                        <div class="article-content">
                            // <img src="${article.image}" alt="${article.title}" class="article-image">.
                            <img src="${article.image}" alt="${article.title}">
                            <h3><a href="${article.url}">${article.title}</a></h3>
                            <p>${article.description}</p>
                            <small class="article-date">${relativeDate}</small>
                        </div>
                    `;
                    rowDiv.appendChild(articleCard);
                });

                // Append each row to subsequentRows
                subsequentRows.appendChild(rowDiv);
            }
        })
        .catch(error => {
            console.error('Error fetching articles:', error);
            firstRow.innerHTML = `<p>Failed to load articles. Please try again later.</p>`;
        });

    // Helper function to return a relative date string or a formatted date
    function getRelativeTime(dateString) {
        const articleDate = new Date(dateString);
        const now = new Date();
        const diffInSeconds = Math.floor((now - articleDate) / 1000);
        const diffInDays = Math.floor(diffInSeconds / 86400);

        if (diffInDays < 7) {
            // Show 'x days ago' if less than 7 days
            return diffInDays === 0 ? 'Today' : `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
        } else {
            // Format the date for articles older than 7 days
            const options = { day: '2-digit', month: 'short', year: 'numeric' };
            return articleDate.toLocaleDateString('en-GB', options);
        }
    }
});
