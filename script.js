// Main Application Script
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all modules
    initAuth();
    initRecipes();
    initMealPlan();
    initShoppingList();
    initUI();
    
    // Load sample data for demonstration
    loadSampleData();
});

function initUI() {
    // Navigation between sections
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const sectionId = this.getAttribute('data-section') + '-section';
            
            // Update active nav link
            navLinks.forEach(nl => nl.classList.remove('active'));
            this.classList.add('active');
            
            // Show the selected section
            document.querySelectorAll('.content-section').forEach(section => {
                section.classList.remove('active');
            });
            document.getElementById(sectionId).classList.add('active');
        });
    });
    
    // Auth button
    const authBtn = document.getElementById('auth-btn');
    authBtn.addEventListener('click', function() {
        document.getElementById('auth-modal').classList.add('active');
        document.getElementById('login-form').classList.add('active');
        document.getElementById('signup-form').classList.remove('active');
    });
    
    // Switch between login and signup forms
    document.getElementById('show-signup').addEventListener('click', function(e) {
        e.preventDefault();
        document.getElementById('login-form').classList.remove('active');
        document.getElementById('signup-form').classList.add('active');
    });
    
    document.getElementById('show-login').addEventListener('click', function(e) {
        e.preventDefault();
        document.getElementById('signup-form').classList.remove('active');
        document.getElementById('login-form').classList.add('active');
    });
    
    // Close modals
    const closeButtons = document.querySelectorAll('.close-btn');
    closeButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            this.closest('.modal').classList.remove('active');
        });
    });
    
    // Close modals when clicking outside
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                this.classList.remove('active');
            }
        });
    });
    
    // Quick action buttons
    document.getElementById('quick-plan-btn').addEventListener('click', function() {
        document.querySelector('.nav-link[data-section="meal-plan"]').click();
    });
    
    document.getElementById('view-shopping-btn').addEventListener('click', function() {
        document.querySelector('.nav-link[data-section="shopping-list"]').click();
    });
    
    document.getElementById('browse-recipes-btn').addEventListener('click', function() {
        document.querySelector('.nav-link[data-section="recipes"]').click();
    });
    
    // Initialize Chart.js for nutrition chart
    const ctx = document.getElementById('nutrition-chart').getContext('2d');
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Protein', 'Carbs', 'Fat'],
            datasets: [{
                data: [30, 45, 25],
                backgroundColor: [
                    '#4ECDC4',
                    '#FF6B6B',
                    '#FFE66D'
                ],
                borderWidth: 0
            }]
        },
        options: {
            cutout: '70%',
            plugins: {
                legend: {
                    position: 'bottom'
                }
            }
        }
    });
}

function loadSampleData() {
    // This would be replaced with actual API calls in a real application
    console.log('Loading sample data...');
    
    // Load sample recipes
    const recipeGrid = document.getElementById('recipe-grid');
    recipeGrid.innerHTML = '';
    
    sampleRecipes.forEach(recipe => {
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
    
    // Load recent recipes carousel
    const recentRecipesCarousel = document.getElementById('recent-recipes-carousel');
    recentRecipesCarousel.innerHTML = '';
    
    sampleRecipes.slice(0, 5).forEach(recipe => {
        const recipeCard = document.createElement('div');
        recipeCard.className = 'recipe-card';
        recipeCard.innerHTML = `
            <img src="${recipe.image}" alt="${recipe.title}">
            <div class="recipe-card-info">
                <h4>${recipe.title}</h4>
                <div class="recipe-card-meta">
                    <span>${recipe.cuisine}</span>
                    <span>${recipe.time} mins</span>
                </div>
            </div>
        `;
        recipeCard.addEventListener('click', function() {
            openRecipeModal(recipe);
        });
        recentRecipesCarousel.appendChild(recipeCard);
    });
    
    // Load filtered recipes for meal planner
    const filteredRecipesList = document.getElementById('filtered-recipes-list');
    filteredRecipesList.innerHTML = '';
    
    sampleRecipes.forEach(recipe => {
        const recipeItem = document.createElement('div');
        recipeItem.className = 'recipe-list-item';
        recipeItem.setAttribute('draggable', 'true');
        recipeItem.innerHTML = `
            <h4>${recipe.title}</h4>
            <div class="recipe-meta">
                <span class="time-badge"><i class="far fa-clock"></i> ${recipe.time} mins</span>
            </div>
        `;
        filteredRecipesList.appendChild(recipeItem);
    });
}

function openRecipeModal(recipe) {
    const modal = document.getElementById('recipe-modal');
    modal.classList.add('active');
    
    // Set recipe data in modal
    document.getElementById('modal-recipe-title').textContent = recipe.title;
    document.getElementById('modal-recipe-image').src = recipe.image;
    document.getElementById('modal-recipe-cuisine').textContent = recipe.cuisine;
    document.getElementById('modal-recipe-dietary').textContent = recipe.dietary;
    document.getElementById('modal-recipe-time').textContent = `${recipe.time} mins`;
    document.getElementById('modal-recipe-difficulty').textContent = recipe.difficulty;
    
    // Set ingredients
    const ingredientsList = document.getElementById('modal-ingredients-list');
    ingredientsList.innerHTML = '';
    recipe.ingredients.forEach(ing => {
        const li = document.createElement('li');
        li.innerHTML = `<span class="ingredient-amount">${ing.amount}</span> <span class="ingredient-name">${ing.name}</span>`;
        ingredientsList.appendChild(li);
    });
    
    // Set instructions
    const instructionsList = document.getElementById('modal-instructions-list');
    instructionsList.innerHTML = '';
    recipe.instructions.forEach((inst, i) => {
        const li = document.createElement('li');
        li.textContent = inst;
        instructionsList.appendChild(li);
    });
    
    // Set notes
    document.getElementById('modal-recipe-notes').textContent = recipe.notes;
    
    // Set nutrition
    document.getElementById('calories').textContent = recipe.nutrition.calories;
    document.getElementById('protein').textContent = `${recipe.nutrition.protein}g`;
    document.getElementById('carbs').textContent = `${recipe.nutrition.carbs}g`;
    document.getElementById('fat').textContent = `${recipe.nutrition.fat}g`;
    document.getElementById('saturated-fat').textContent = `${recipe.nutrition.saturatedFat}g`;
    document.getElementById('fiber').textContent = `${recipe.nutrition.fiber}g`;
    document.getElementById('sugar').textContent = `${recipe.nutrition.sugar}g`;
    document.getElementById('sodium').textContent = `${recipe.nutrition.sodium}mg`;
    
    // Recipe tabs
    const recipeTabs = document.querySelectorAll('.recipe-tab');
    recipeTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            
            // Update active tab
            recipeTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            // Show the selected tab content
            document.querySelectorAll('.recipe-tab-content').forEach(content => {
                content.classList.remove('active');
            });
            document.querySelector(`.recipe-tab-content[data-tab="${tabId}"]`).classList.add('active');
        });
    });
    
    // Servings controls
    document.getElementById('increase-servings').addEventListener('click', function() {
        const servings = document.getElementById('servings-count');
        servings.textContent = parseInt(servings.textContent) + 1;
        // In a real app, we'd update ingredient amounts here
    });
    
    document.getElementById('decrease-servings').addEventListener('click', function() {
        const servings = document.getElementById('servings-count');
        if (parseInt(servings.textContent) > 1) {
            servings.textContent = parseInt(servings.textContent) - 1;
            // In a real app, we'd update ingredient amounts here
        }
    });
    
    // Add to meal plan button
    document.getElementById('add-to-meal-plan-btn').addEventListener('click', function() {
        alert('This would open the meal planner to add the recipe');
    });
}

// Sample data for demonstration
const sampleRecipes = [
    {
        id: 1,
        title: 'Paneer Butter Masala',
        image: 'assets/images/paneer-butter-masala.jpg',
        cuisine: 'North Indian',
        dietary: 'Vegetarian',
        time: 45,
        difficulty: 'Medium',
        ingredients: [
            { amount: '200g', name: 'Paneer, cubed' },
            { amount: '2 tbsp', name: 'Butter' },
            { amount: '1', name: 'Onion, chopped' },
            { amount: '2', name: 'Tomatoes, pureed' },
            { amount: '1 tsp', name: 'Ginger-garlic paste' },
            { amount: '1/2 tsp', name: 'Turmeric powder' },
            { amount: '1 tsp', name: 'Garam masala' },
            { amount: '1/2 cup', name: 'Fresh cream' },
            { amount: 'to taste', name: 'Salt' }
        ],
        instructions: [
            'Heat butter in a pan and sauté onions until golden brown.',
            'Add ginger-garlic paste and cook for a minute.',
            'Add tomato puree and cook until oil separates.',
            'Add spices and cook for another minute.',
            'Add paneer cubes and mix gently.',
            'Add fresh cream and simmer for 5 minutes.',
            'Garnish with coriander leaves and serve hot.'
        ],
        notes: 'For a richer flavor, you can add kasuri methi (dried fenugreek leaves) at the end.',
        nutrition: {
            calories: 350,
            protein: 12,
            carbs: 15,
            fat: 25,
            saturatedFat: 8,
            fiber: 3,
            sugar: 6,
            sodium: 500
        }
    },
    {
        id: 2,
        title: 'Masala Dosa',
        image: 'assets/images/masala-dosa.jpg',
        cuisine: 'South Indian',
        dietary: 'Vegetarian',
        time: 60,
        difficulty: 'Hard',
        ingredients: [
            { amount: '2 cups', name: 'Dosa rice' },
            { amount: '1/2 cup', name: 'Urad dal' },
            { amount: '1/4 tsp', name: 'Fenugreek seeds' },
            { amount: 'to taste', name: 'Salt' },
            { amount: '2', name: 'Potatoes, boiled' },
            { amount: '1', name: 'Onion, sliced' },
            { amount: '1/2 tsp', name: 'Mustard seeds' },
            { amount: '1/2 tsp', name: 'Turmeric powder' },
            { amount: '2 tbsp', name: 'Oil' }
        ],
        instructions: [
            'Soak rice, dal and fenugreek seeds for 6 hours.',
            'Grind to a smooth batter and ferment overnight.',
            'For potato filling, heat oil and add mustard seeds.',
            'Add onions and sauté until translucent.',
            'Add spices and mashed potatoes, mix well.',
            'Heat a dosa tawa and spread the batter thinly.',
            'Cook until crisp, add potato filling and fold.',
            'Serve with sambar and coconut chutney.'
        ],
        notes: 'The batter needs proper fermentation for crispy dosas. In cold climates, keep the batter in a warm place.',
        nutrition: {
            calories: 280,
            protein: 8,
            carbs: 45,
            fat: 7,
            saturatedFat: 1,
            fiber: 5,
            sugar: 2,
            sodium: 300
        }
    },
    {
        id: 3,
        title: 'Chicken Biryani',
        image: 'assets/images/chicken-biryani.jpg',
        cuisine: 'Mughlai',
        dietary: 'Non-Vegetarian',
        time: 90,
        difficulty: 'Hard',
        ingredients: [
            { amount: '500g', name: 'Chicken, cut into pieces' },
            { amount: '2 cups', name: 'Basmati rice' },
            { amount: '2', name: 'Onions, sliced' },
            { amount: '1/2 cup', name: 'Yogurt' },
            { amount: '2 tbsp', name: 'Biryani masala' },
            { amount: '1 tsp', name: 'Ginger-garlic paste' },
            { amount: '1/4 cup', name: 'Mint leaves' },
            { amount: '1/4 cup', name: 'Coriander leaves' },
            { amount: 'a pinch', name: 'Saffron' },
            { amount: '2 tbsp', name: 'Ghee' }
        ],
        instructions: [
            'Marinate chicken with yogurt, spices and herbs for 2 hours.',
            'Soak rice for 30 minutes and parboil with whole spices.',
            'In a heavy bottomed pan, layer half the rice, then chicken, then remaining rice.',
            'Top with fried onions, saffron milk and ghee.',
            'Seal with dough or tight lid and cook on dum (low heat) for 30 minutes.',
            'Let it rest for 10 minutes before serving.',
            'Serve with raita and salad.'
        ],
        notes: 'For best results, use aged basmati rice and fresh chicken. The dum cooking is essential for authentic flavor.',
        nutrition: {
            calories: 450,
            protein: 30,
            carbs: 50,
            fat: 15,
            saturatedFat: 5,
            fiber: 4,
            sugar: 3,
            sodium: 600
        }
    },
    {
        id: 4,
        title: 'Dal Tadka',
        image: 'assets/images/dal-tadka.jpg',
        cuisine: 'North Indian',
        dietary: 'Vegan',
        time: 30,
        difficulty: 'Easy',
        ingredients: [
            { amount: '1 cup', name: 'Yellow lentils (toor dal)' },
            { amount: '1', name: 'Tomato, chopped' },
            { amount: '1/2 tsp', name: 'Turmeric powder' },
            { amount: '1 tsp', name: 'Cumin seeds' },
            { amount: '2', name: 'Dry red chilies' },
            { amount: '2 tbsp', name: 'Oil' },
            { amount: '1/2 tsp', name: 'Asafoetida' },
            { amount: 'to taste', name: 'Salt' },
            { amount: '1 tbsp', name: 'Coriander leaves' }
        ],
        instructions: [
            'Pressure cook dal with turmeric until soft.',
            'Heat oil in a pan and add cumin seeds, red chilies and asafoetida.',
            'Once seeds crackle, add tomatoes and cook until soft.',
            'Add cooked dal and simmer for 5 minutes.',
            'Adjust consistency with water if needed.',
            'Garnish with coriander leaves and serve hot.'
        ],
        notes: 'For extra flavor, you can add a dollop of ghee at the end. This dal goes well with rice or roti.',
        nutrition: {
            calories: 200,
            protein: 10,
            carbs: 25,
            fat: 7,
            saturatedFat: 1,
            fiber: 8,
            sugar: 2,
            sodium: 400
        }
    },
    {
        id: 5,
        title: 'Aloo Paratha',
        image: 'assets/images/aloo-paratha.jpg',
        cuisine: 'Punjabi',
        dietary: 'Vegetarian',
        time: 40,
        difficulty: 'Medium',
        ingredients: [
            { amount: '2 cups', name: 'Whole wheat flour' },
            { amount: '3', name: 'Potatoes, boiled' },
            { amount: '1/2 tsp', name: 'Cumin seeds' },
            { amount: '1/2 tsp', name: 'Red chili powder' },
            { amount: '1/2 tsp', name: 'Garam masala' },
            { amount: '2 tbsp', name: 'Ghee' },
            { amount: 'to taste', name: 'Salt' }
        ],
        instructions: [
            'Knead a soft dough with flour and water, rest for 15 minutes.',
            'Mash potatoes and mix with spices to make filling.',
            'Take a ball of dough, roll slightly, add filling and seal.',
            'Roll out carefully into a paratha.',
            'Cook on hot tawa with ghee until golden brown on both sides.',
            'Serve hot with yogurt, pickle or butter.'
        ],
        notes: 'Make sure the potato filling is not too wet or it will be difficult to roll the parathas.',
        nutrition: {
            calories: 300,
            protein: 8,
            carbs: 50,
            fat: 8,
            saturatedFat: 3,
            fiber: 6,
            sugar: 1,
            sodium: 350
        }
    }
];
