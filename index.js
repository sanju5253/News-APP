/**
 * Fetches news articles from the specified news source using the News API.
 * 
 * @param {string} source - The news source to fetch articles from (e.g., "bbc-news", "cnn").
 */
async function fetchNews(source) {
    const apiKey = 'fbcc7ff8f07a4d89b4775589f980059d'; // Replace with your API key
    const url = `https://newsapi.org/v2/top-headlines?sources=${source}&apiKey=${apiKey}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        displayNews(data.articles);
    } catch (error) {
        console.error('Error fetching news:', error);
    }
}

/**
 * Searches for news articles based on the user's query using the News API.
 * 
 * @param {string} query - The search term entered by the user.
 */
async function searchNews(query) {
    const apiKey = 'fbcc7ff8f07a4d89b4775589f980059d'; // Replace with your API key
    const url = `https://newsapi.org/v2/everything?q=${query}&apiKey=${apiKey}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        displayNews(data.articles);
    } catch (error) {
        console.error('Error fetching news:', error);
    }
}

/**
 * Displays news articles in the accordion format on the webpage.
 * 
 * @param {Array} articles - An array of article objects to display.
 */
function displayNews(articles) {
    const newsAccordion = document.getElementById('newsAccordian');
    newsAccordion.innerHTML = ''; // Clear previous news

    // Loop through each article and create an accordion item
    articles.forEach((article, index) => {
        const accordionItem = document.createElement('div');
        accordionItem.classList.add('accordion-item');
        accordionItem.innerHTML = `
            <h2 class="accordion-header" id="heading${index}">
                <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${index}" aria-expanded="true" aria-controls="collapse${index}">
                    ${article.title}
                </button>
            </h2>
            <div id="collapse${index}" class="accordion-collapse collapse" aria-labelledby="heading${index}" data-bs-parent="#newsAccordian">
                <div class="accordion-body">
                    <p>${article.description}</p>
                    <a href="${article.url}" target="_blank">Read more</a>
                </div>
            </div>
        `;
        newsAccordion.appendChild(accordionItem);
    });
}

/**
 * Event listener for the "Get News" button. Fetches news based on the selected source.
 */
document.getElementById('getNewsBtn').addEventListener('click', function() {
    const newsSource = document.getElementById('newsSource').value;
    fetchNews(newsSource);
});

/**
 * Event listener for the "Search" button. Fetches news based on the search query.
 */
document.getElementById('searchbtn').addEventListener('click', function() {
    const query = document.getElementById('searchText').value;
    searchNews(query);
});
