document.addEventListener('DOMContentLoaded', function () {
    const featuredArticles = document.getElementById('featured-articles');
    const articleGrid = document.getElementById('article-grid');
    const articleList = document.getElementById('article-list');

    fetch('/blog/articles.json')
        .then(response => {
            if (!response.ok) throw new Error('Failed to fetch articles');
            return response.json();
        })
        .then(articles => {
            // Sort articles by date (newest first)
            articles.sort((a, b) => new Date(b.date) - new Date(a.date));

            // Display featured articles (first 2)
            const featured = articles.slice(0, 2);
            featured.forEach(article => {
                const articleCard = document.createElement('div');
                articleCard.classList.add('featured-article-card');
                const relativeDate = getRelativeTime(article.date);

                articleCard.innerHTML = `
                    <div class="featured-image">
                        <img src="${article.image}" alt="${article.title}">
                        <div class="overlay">
                            <h3><a href="${article.url}">${article.title}</a></h3>
                            <p>${article.description}</p>
                            <small class="article-date">${relativeDate}</small>
                        </div>
                    </div>
                `;
                featuredArticles.appendChild(articleCard);
            });

            // Display next 3 articles in grid
            const gridArticles = articles.slice(2, 5);
            gridArticles.forEach(article => {
                const articleCard = document.createElement('div');
                articleCard.classList.add('article-card');
                const relativeDate = getRelativeTime(article.date);

                articleCard.innerHTML = `
                    <img src="${article.image}" alt="${article.title}">
                    <div class="article-content">
                        <h3><a href="${article.url}">${article.title}</a></h3>
                        <p>${article.description}</p>
                        <small class="article-date">${relativeDate}</small>
                    </div>
                `;
                articleGrid.appendChild(articleCard);
            });

            // Remaining articles as full-width rows
            const remainingArticles = articles.slice(5);
            remainingArticles.forEach(article => {
                const articleRow = document.createElement('div');
                articleRow.classList.add('article-row');
                const relativeDate = getRelativeTime(article.date);

                articleRow.innerHTML = `
                    <div class="row-content">
                        <h3><a href="${article.url}">${article.title}</a></h3>
                        <p>${article.description}</p>
                        <small class="article-date">${relativeDate}</small>
                    </div>
                `;
                articleList.appendChild(articleRow);
            });
        })
        .catch(error => {
            console.error('Error fetching articles:', error);
            articleGrid.innerHTML = `<p>Failed to load articles. Please try again later.</p>`;
        });

    // Calculate relative time (e.g., "2 days ago")
    function getRelativeTime(dateString) {
        const articleDate = new Date(dateString);
        const now = new Date();
        const diffInSeconds = Math.floor((now - articleDate) / 1000);

        const intervals = {
            year: 31536000,
            month: 2592000,
            week: 604800,
            day: 86400,
            hour: 3600,
            minute: 60
        };

        for (const [key, value] of Object.entries(intervals)) {
            const interval = Math.floor(diffInSeconds / value);
            if (interval >= 1) {
                return `${interval} ${key}${interval > 1 ? 's' : ''} ago`;
            }
        }
        return 'Just now';
    }
});
