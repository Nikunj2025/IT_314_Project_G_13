const searchButton = document.getElementById('searchButton');
        const searchInput = document.getElementById('searchInput');
        const filterButton = document.getElementById('filter-button');
        const filterForm = document.getElementById('filter-form');
        const contentContainer = document.querySelector('.footer');
        
        searchButton.addEventListener('click', () => {
            const searchTerm = searchInput.value;
            if (searchTerm.trim() !== '') {
                alert(`Searching for: ${searchTerm}`);
            }
        });
        
        var addIngredientButton = document.getElementById('add-ingredient');
        var ingredientList = document.getElementById('ingredient-list');
        var ingredientCount = 0;
        
        addIngredientButton.addEventListener('click', function () {
            ingredientCount++;
            var ingredientItem = document.createElement('div');
            ingredientItem.className = 'ingredient-item';
            ingredientItem.innerHTML = `
            <input type="checkbox" id="ingredient${ingredientCount}" name="ingredient" value="Ingredient">
                <input type="text" id="ingredientName${ingredientCount}" name="ingredientName" placeholder="Ingredient ${ingredientCount}">
                <button class="remove-ingredient-button" id="remove-ingredient${ingredientCount}">-</button>
                `;
            ingredientList.appendChild(ingredientItem);
            
            var removeIngredientButton = document.getElementById(`remove-ingredient${ingredientCount}`);
            removeIngredientButton.addEventListener('click', function () {
                ingredientList.removeChild(ingredientItem);
                ingredientCount--;
            });
        });

        // Add a submit event listener to the form
        document.getElementById('filterForm').addEventListener('submit', function (event) {
            // Check if the required fields (hours and minutes) are filled out
            var hoursInput = document.getElementById('hours');
            var minutesInput = document.getElementById('minutes');

            if (!hoursInput.value || !minutesInput.value) {
                // Prevent the form from submitting
                event.preventDefault();
                // Display the "Please fill out this form" message
                alert('Please fill out this form');
            }
        });

        filterButton.addEventListener('click', function () {
            console.log("filter-button is clicked");

            if (filterForm.classList.contains('active')) {
                filterForm.classList.remove('active');
                contentContainer.style.backdropFilter = 'none';
            } else {
                filterForm.classList.add('active');
                contentContainer.style.backdropFilter = blur('10px');

            }
        });