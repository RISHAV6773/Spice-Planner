// Meal Planning Module
let currentMealPlan = {};
let currentWeekStart = getStartOfWeek(new Date());

function initMealPlan() {
    // Initialize the meal plan calendar
    renderMealPlanCalendar();
    
    // Week navigation
    document.getElementById('prev-week').addEventListener('click', function() {
        currentWeekStart.setDate(currentWeekStart.getDate() - 7);
        renderMealPlanCalendar();
    });
    
    document.getElementById('next-week').addEventListener('click', function() {
        currentWeekStart.setDate(currentWeekStart.getDate() + 7);
        renderMealPlanCalendar();
    });
    
    // View options
    document.querySelectorAll('.view-option').forEach(option => {
        option.addEventListener('click', function() {
            document.querySelectorAll('.view-option').forEach(o => o.classList.remove('active'));
            this.classList.add('active');
            
            // In a real app, we would switch between week and month views
            console.log('Switched to', this.getAttribute('data-view'), 'view');
        });
    });
    
    // Apply filters
    document.getElementById('apply-filters-btn').addEventListener('click', function() {
        const cuisineFilter = Array.from(document.getElementById('cuisine-filter').selectedOptions)
            .map(opt => opt.value);
        const timeFilter = document.getElementById('time-filter').value;
        const dietFilter = document.getElementById('diet-filter').value;
        
        console.log('Applying filters:', {
            cuisine: cuisineFilter,
            time: timeFilter,
            diet: dietFilter
        });
        
        // In a real app, we would filter the recipes
        filterRecipesForMealPlan(cuisineFilter, timeFilter, dietFilter);
    });
    
    // Set up drag and drop
    setupDragAndDrop();
}

function renderMealPlanCalendar() {
    // Update the week range display
    const weekEnd = new Date(currentWeekStart);
    weekEnd.setDate(weekEnd.getDate() + 6);
    
    const options = { month: 'long', day: 'numeric' };
    const startStr = currentWeekStart.toLocaleDateString(undefined, options);
    const endStr = weekEnd.toLocaleDateString(undefined, options);
    const year = currentWeekStart.getFullYear();
    
    document.getElementById('current-week-range').textContent = 
        `${startStr} - ${endStr}, ${year}`;
    
    // In a real app, we would load the meal plan for this week
    console.log('Loading meal plan for week starting:', currentWeekStart);
    
    // Clear all meal slots
    document.querySelectorAll('.meal-content').forEach(slot => {
        slot.innerHTML = '';
    });
    
    // For demo purposes, add some sample meals
    if (Object.keys(currentMealPlan).length === 0) {
        addSampleMeals();
    } else {
        // Load meals from currentMealPlan
        loadMealsIntoCalendar();
    }
}

function addSampleMeals() {
    // This is just for demonstration
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    
    days.forEach((day, dayIndex) => {
        const dayColumn = document.querySelector(`.day-column[data-day="${dayIndex}"]`);
        
        // Add breakfast
        if (dayIndex === 0 || dayIndex === 3 || dayIndex === 6) {
            const breakfastSlot = dayColumn.querySelector('.meal-slot[data-meal="breakfast"] .meal-content');
            breakfastSlot.innerHTML = `
                <div class="planned-meal" data-recipe-id="5">
                    <h4>Aloo Paratha</h4>
                    <div class="meal-meta">
                        <span>30 mins</span>
                        <span>Vegetarian</span>
                    </div>
                </div>
            `;
        }
        
        // Add lunch
        if (dayIndex === 1 || dayIndex === 4) {
            const lunchSlot = dayColumn.querySelector('.meal-slot[data-meal="lunch"] .meal-content');
            lunchSlot.innerHTML = `
                <div class="planned-meal" data-recipe-id="1">
                    <h4>Paneer Butter Masala</h4>
                    <div class="meal-meta">
                        <span>45 mins</span>
                        <span>Vegetarian</span>
                    </div>
                </div>
            `;
        } else if (dayIndex === 2 || dayIndex === 5) {
            const lunchSlot = dayColumn.querySelector('.meal-slot[data-meal="lunch"] .meal-content');
            lunchSlot.innerHTML = `
                <div class="planned-meal" data-recipe-id="4">
                    <h4>Dal Tadka</h4>
                    <div class="meal-meta">
                        <span>30 mins</span>
                        <span>Vegan</span>
                    </div>
                </div>
            `;
        }
        
        // Add dinner
        if (dayIndex === 0 || dayIndex === 3) {
            const dinnerSlot = dayColumn.querySelector('.meal-slot[data-meal="dinner"] .meal-content');
            dinnerSlot.innerHTML = `
                <div class="planned-meal" data-recipe-id="2">
                    <h4>Masala Dosa</h4>
                    <div class="meal-meta">
                        <span>60 mins</span>
                        <span>Vegetarian</span>
                    </div>
                </div>
            `;
        } else if (dayIndex === 6) {
            const dinnerSlot = dayColumn.querySelector('.meal-slot[data-meal="dinner"] .meal-content');
            dinnerSlot.innerHTML = `
                <div class="planned-meal" data-recipe-id="3">
                    <h4>Chicken Biryani</h4>
                    <div class="meal-meta">
                        <span>90 mins</span>
                        <span>Non-Vegetarian</span>
                    </div>
                </div>
            `;
        }
    });
}

function loadMealsIntoCalendar() {
    // In a real app, this would load meals from currentMealPlan
    // For now, we'll just use the sample meals
    addSampleMeals();
}

function filterRecipesForMealPlan(cuisineFilter, timeFilter, dietFilter) {
    // In a real app, this would filter the recipes based on the selected filters
    console.log('Filtering recipes for meal plan:', {
        cuisineFilter,
        timeFilter,
        dietFilter
    });
    
    // For now, we'll just log the filters
    const filteredRecipesList = document.getElementById('filtered-recipes-list');
    filteredRecipesList.innerHTML = '';
    
    sampleRecipes.forEach(recipe => {
        // Simple filter logic for demo
        const matchesCuisine = cuisineFilter.length === 0 || 
            cuisineFilter.some(cf => recipe.cuisine.toLowerCase().includes(cf));
        const matchesTime = timeFilter === 'any' || recipe.time <= parseInt(timeFilter);
        const matchesDiet = dietFilter === 'any' || 
            recipe.dietary.toLowerCase() === dietFilter.toLowerCase();
        
        if (matchesCuisine && matchesTime && matchesDiet) {
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
        }
    });
}

function setupDragAndDrop() {
    const recipeItems = document.querySelectorAll('.recipe-list-item');
    const mealSlots = document.querySelectorAll('.droppable');
    
    // Make recipe items draggable
    recipeItems.forEach(item => {
        item.addEventListener('dragstart', function(e) {
            e.dataTransfer.setData('text/plain', this.textContent);
            this.classList.add('dragging');
        });
        
        item.addEventListener('dragend', function() {
            this.classList.remove('dragging');
        });
    });
    
    // Make meal slots droppable
    mealSlots.forEach(slot => {
        slot.addEventListener('dragover', function(e) {
            e.preventDefault();
            this.classList.add('drag-over');
        });
        
        slot.addEventListener('dragleave', function() {
            this.classList.remove('drag-over');
        });
        
        slot.addEventListener('drop', function(e) {
            e.preventDefault();
            this.classList.remove('drag-over');
            
            const recipeName = e.dataTransfer.getData('text/plain');
            const recipe = sampleRecipes.find(r => r.title === recipeName);
            
            if (recipe) {
                this.innerHTML = `
                    <div class="planned-meal" data-recipe-id="${recipe.id}">
                        <h4>${recipe.title}</h4>
                        <div class="meal-meta">
                            <span>${recipe.time} mins</span>
                            <span>${recipe.dietary}</span>
                        </div>
                    </div>
                `;
                
                // In a real app, we would save this to the meal plan
                const day = this.closest('.day-column').getAttribute('data-day');
                const meal = this.closest('.meal-slot').getAttribute('data-meal');
                
                if (!currentMealPlan[day]) {
                    currentMealPlan[day] = {};
                }
                
                currentMealPlan[day][meal] = recipe.id;
                console.log('Updated meal plan:', currentMealPlan);
            }
        });
    });
}

function getStartOfWeek(date) {
    const d = new Date(date);
    const day = d.getDay();
    const diff = d.getDate() - day + (day === 0 ? -6 : 1); // adjust when day is Sunday
    return new Date(d.setDate(diff));
}

// In a real app, we would have functions to:
// - Save meal plans
// - Load meal plans
// - Generate shopping lists from meal plans
// - Share meal plans
// - Create custom meal plans

// export { initMealPlan, renderMealPlanCalendar };
