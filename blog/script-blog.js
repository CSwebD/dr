document.addEventListener('DOMContentLoaded', function () {
    // Grab references to the DOM elements
    const firstRow = document.getElementById('first-row');
    const subsequentRows = document.getElementById('subsequent-rows');

    // Fetch articles.json
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

            // 1) Handle the first 2 articles (with images)
            const firstTwo = articles.slice(0, 2);
            firstTwo.forEach(article => {
                // Create an article card
                const articleCard = document.createElement('div');
                articleCard.classList.add('article-card');

                // Calculate relative date
                const relativeDate = getRelativeTime(article.date);

                // Include an image for the first two articles
                articleCard.innerHTML = `
                    <div class="article-content">
                        <img src="${article.image}" alt="${article.title}" class="article-image">
                        <h3><a href="${article.url}">${article.title}</a></h3>
                        <p>${article.description}</p>
                        <small class="article-date">${relativeDate}</small>
                    </div>
                `;

                // Append to the first row
                firstRow.appendChild(articleCard);
            });

            // 2) Remaining articles (all with images), grouped by 3
            const remainingArticles = articles.slice(2);
            for (let i = 0; i < remainingArticles.length; i += 3) {
                // Create a new row
                const rowDiv = document.createElement('div');
                rowDiv.classList.add('row');

                // Take a chunk of 3 articles
                const chunk = remainingArticles.slice(i, i + 3);
                chunk.forEach(article => {
                    // Create an article card
                    const articleCard = document.createElement('div');
                    articleCard.classList.add('article-card');

                    // Calculate relative date
                    const relativeDate = getRelativeTime(article.date);

                    // Include an image for all articles
                    articleCard.innerHTML = `
                        <div class="article-content">
                            <img src="${article.image}" alt="${article.title}" class="article-image">
                            <h3><a href="${article.url}">${article.title}</a></h3>
                            <p>${article.description}</p>
                            <small class="article-date">${relativeDate}</small>
                        </div>
                    `;

                    // Append to the row
                    rowDiv.appendChild(articleCard);
                });

                // Append each row to the subsequent rows container
                subsequentRows.appendChild(rowDiv);
            }
        })
        .catch(error => {
            console.error('Error fetching articles:', error);
            firstRow.innerHTML = `<p>Failed to load articles. Please try again later.</p>`;
        });

    /**
     * Returns a relative or formatted date string.
     * - If fewer than 7 days, show 'X days ago' (or 'Today').
     * - Otherwise, show 'DD MMM YYYY'.
     */
    function getRelativeTime(dateString) {
        const articleDate = new Date(dateString);
        const now = new Date();
        const diffInSeconds = Math.floor((now - articleDate) / 1000);
        const diffInDays = Math.floor(diffInSeconds / 86400);

        if (diffInDays < 7) {
            return diffInDays === 0
                ? 'Today'
                : `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
        } else {
            const options = { day: '2-digit', month: 'short', year: 'numeric' };
            return articleDate.toLocaleDateString('en-GB', options);
        }
    }
});
