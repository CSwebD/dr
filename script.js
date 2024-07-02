document.addEventListener('DOMContentLoaded', function() {
    var searchInput = document.querySelector('#searchInput');
    var searchResults = document.querySelector('#searchResults');

    searchInput.addEventListener('input', function() {
        var query = searchInput.value.toLowerCase();
        var results = performSearch(query);

        displayResults(results);
    });

    function performSearch(query) {
        // Example hardcoded data
        var data = [
        { id: 1, title: 'Frontend', category: 'Role based Roadmaps' },
        { id: 2, title: 'Backend', category: 'Role based Roadmaps' },
        { id: 3, title: 'DevOps', category: 'Role based Roadmaps' },
        { id: 4, title: 'Full Stack', category: 'Role based Roadmaps' },
        { id: 5, title: 'Software Architect', category: 'Role based Roadmaps' },
        { id: 6, title: 'Python', category: 'Role based Roadmaps' },
        { id: 7, title: 'Java', category: 'Role based Roadmaps' },
        { id: 8, title: 'JavaScript', category: 'Role based Roadmaps' },
        { id: 9, title: 'TypeJava', category: 'Role based Roadmaps' },
        { id: 10, title: 'Vue', category: 'Role based Roadmaps' },
        { id: 11, title: 'Docker', category: 'Role based Roadmaps' },
        { id: 12, title: 'Angular', category: 'Role based Roadmaps' }
        ];

        // Perform the search
        var results = data.filter(function(item) {
            return item.title.toLowerCase().includes(query);
        });

        return results;
    }

    function displayResults(results) {
        searchResults.innerHTML = '';

        if (results.length === 0) {
            var noResultsItem = document.createElement('li');
            noResultsItem.textContent = 'No results found.';
            searchResults.appendChild(noResultsItem);
        } else {
            var limitedResults = results.slice(0, 5); // Take only the first 5 results

            limitedResults.forEach(function(result) {
                var listItem = document.createElement('li');
                var link = document.createElement('a');
                link.textContent = result.title;
                link.href = generateLink(result.id); // Call the function to generate the link based on the ID

                listItem.appendChild(link);
                searchResults.appendChild(listItem);
            });
        }

        if (searchInput.value.trim() === '') {
            searchResults.style.display = 'none'; // Hide the search results
        } else {
            searchResults.style.display = 'block'; // Show the search results
        }
    }

    function generateLink(id) {
        // Define your specific links for each ID
        var links = {
            1: 'Frontend.html',
            2: 'Backend.html',
            3: 'DevOps.html',
            4: 'FullStack.html',
            5: 'Software_Architect.html',
            6: 'Python.html',
            7: 'Java.html',
            8: 'JavaScript.html',
            9: 'TypeJava.html',
            10: 'Vue.html',
            11: 'Docker.html',
            12: 'Angular.html',
            // Add more IDs and corresponding link URLs
        };
        
        // Check if the ID exists in the links object, otherwise return a default link
        return links[id] || '#';
    }

});
