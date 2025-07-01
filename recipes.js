// Recipe Database Module
let recipes = [];

function initRecipes() {
    // Add new recipe button
    document.getElementById('add-new-recipe-btn').addEventListener('click', function() {
        alert('This would open a form to add a new recipe');
    });
    
    // Recipe search
    document.getElementById('recipe-search-btn').addEventListener('click', function() {
        const query = document.getElementById('recipe-search').value;
        searchRecipes(query);
    });
    
    document.getElementById('recipe-search').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            const query = this.value;
            searchRecipes(query);
        }
    });
    
    // Filter tags
    const filterTags = document.querySelectorAll('.filter-tag');
    filterTags.forEach(tag => {
        tag.addEventListener('click', function() {
            filterTags.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            const filter = this.textContent.toLowerCase();
            filterRecipes(filter);
        });
    });
    
    // Category filters
    const categoryItems = document.querySelectorAll('.category-list li');
    categoryItems.forEach(item => {
        item.addEventListener('click', function() {
            categoryItems.forEach(i => i.classList.remove('active'));
            this.classList.add('active');
            
            const category = this.textContent;
            filterRecipesByCategory(category);
        });
    });
    
    // Dietary filters
    const dietaryItems = document.querySelectorAll('.dietary-list li');
    dietaryItems.forEach(item => {
        item.addEventListener('click', function() {
            dietaryItems.forEach(i => i.classList.remove('active'));
            this.classList.add('active');
            
            const dietary = this.textContent;
            filterRecipesByDietary(dietary);
        });
    });
}

function searchRecipes(query) {
    console.log('Searching recipes for:', query);
    // In a real app, this would be an API call
    // For now, we'll just filter the sample data
    const filtered = sampleRecipes.filter(recipe => 
        recipe.title.toLowerCase().includes(query.toLowerCase()) ||
        recipe.cuisine.toLowerCase().includes(query.toLowerCase()) ||
        recipe.ingredients.some(ing => ing.name.toLowerCase().includes(query.toLowerCase()))
    );
    
    displayRecipes(filtered);
}

function filterRecipes(filter) {
    console.log('Filtering recipes by:', filter);
    // In a real app, this would be more sophisticated
    if (filter === 'all') {
        displayRecipes(sampleRecipes);
    } else {
        const filtered = sampleRecipes.filter(recipe => 
            recipe.title.toLowerCase().includes(filter) ||
            recipe.cuisine.toLowerCase().includes(filter) ||
            recipe.dietary.toLowerCase().includes(filter) ||
            (filter === 'quick meals' && recipe.time <= 30)
        );
        displayRecipes(filtered);
    }
}

function filterRecipesByCategory(category) {
    console.log('Filtering recipes by category:', category);
    if (category === 'All Recipes') {
        displayRecipes(sampleRecipes);
    } else {
        const filtered = sampleRecipes.filter(recipe => {
            // In a real app, recipes would have category property
            // For now, we'll use some simple categorization
            if (category === 'Breakfast') {
                return recipe.title.includes('Dosa') || recipe.title.includes('Paratha');
            } else if (category === 'Lunch' || category === 'Dinner') {
                return recipe.title.includes('Biryani') || recipe.title.includes('Dal') || recipe.title.includes('Paneer');
            } else if (category === 'Snacks') {
                return false; // No snacks in our sample data
            } else if (category === 'Desserts') {
                return false; // No desserts in our sample data
            } else if (category === 'Drinks') {
                return false; // No drinks in our sample data
            }
            return false;
        });
        displayRecipes(filtered);
    }
}

function filterRecipesByDietary(dietary) {
    console.log('Filtering recipes by dietary:', dietary);
    const filtered = sampleRecipes.filter(recipe => 
        recipe.dietary.toLowerCase() === dietary.toLowerCase()
    );
    displayRecipes(filtered);
}

function displayRecipes(recipesToDisplay) {
    const recipeGrid = document.getElementById('recipe-grid');
    recipeGrid.innerHTML = '';
    
    recipesToDisplay.forEach(recipe => {
        const recipeCard = document.createElement('div');
        recipeCard.className = 'recipe-card-large';
        recipeCard.innerHTML = `
            <img src="${recipe.image}" alt="${recipe.title}">
            <div class="recipe-card-large-info">
                <h3>${recipe.title}</h3>
                <div class="recipe-card-large-meta">
                    <span class="cuisine-badge">${recipe.cuisine}</span>
                    <span><i class="far fa-clock"></i> ${recipe.time} mins</span>
                </div>
            </div>
        `;
        recipeCard.addEventListener('click', function() {
            openRecipeModal(recipe);
        });
        recipeGrid.appendChild(recipeCard);
    });
}

// In a real app, we would have functions to:
// - Fetch recipes from an API
// - Add new recipes
// - Update existing recipes
// - Delete recipes
// - Rate recipes
// - Save favorite recipes

// export { initRecipes, searchRecipes, filterRecipes }; 
