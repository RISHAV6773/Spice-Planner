// Shopping List Module
let shoppingList = {
    vegetables: [
        { name: 'Onions', quantity: '4 medium', checked: false },
        { name: 'Tomatoes', quantity: '6 medium', checked: false },
        { name: 'Potatoes', quantity: '1 kg', checked: true }
    ],
    fruits: [
        { name: 'Bananas', quantity: '6', checked: false }
    ],
    spices: [
        { name: 'Turmeric powder', quantity: '50g', checked: false },
        { name: 'Cumin seeds', quantity: '100g', checked: false },
        { name: 'Garam masala', quantity: '50g', checked: true }
    ],
    grains: [
        { name: 'Basmati rice', quantity: '2 kg', checked: false },
        { name: 'Toor dal', quantity: '500g', checked: false }
    ],
    dairy: [
        { name: 'Paneer', quantity: '200g', checked: false },
        { name: 'Fresh cream', quantity: '200ml', checked: false }
    ],
    other: [
        { name: 'Cooking oil', quantity: '1 liter', checked: true }
    ]
};

function initShoppingList() {
    // Render the initial shopping list
    renderShoppingList();
    
    // Generate from meal plan button
    document.getElementById('generate-from-meal-plan').addEventListener('click', function() {
        generateShoppingListFromMealPlan();
    });
    
    // Print button
    document.getElementById('print-shopping-list').addEventListener('click', function() {
        window.print();
    });
    
    // Share button
    document.getElementById('share-shopping-list').addEventListener('click', function() {
        // In a real app, this would use the Web Share API or similar
        alert('This would share the shopping list');
    });
    
    // Add custom item
    document.getElementById('add-custom-item').addEventListener('click', function() {
        const name = document.getElementById('new-item-name').value;
        const category = document.getElementById('new-item-category').value;
        const quantity = document.getElementById('new-item-quantity').value;
        
        if (!name) {
            alert('Please enter an item name');
            return;
        }
        
        if (!shoppingList[category]) {
            shoppingList[category] = [];
        }
        
        shoppingList[category].push({
            name,
            quantity: quantity || '',
            checked: false
        });
        
        // Clear the form
        document.getElementById('new-item-name').value = '';
        document.getElementById('new-item-quantity').value = '';
        
        // Refresh the list
        renderShoppingList();
    });
}

function renderShoppingList() {
    // Clear all categories
    document.querySelectorAll('.shopping-items').forEach(list => {
        list.innerHTML = '';
    });
    
    // Render items for each category
    for (const category in shoppingList) {
        const listElement = document.querySelector(`.category-section[data-category="${category}"] .shopping-items`);
        
        if (listElement) {
            shoppingList[category].forEach((item, index) => {
                const li = document.createElement('li');
                li.className = 'shopping-item';
                if (item.checked) {
                    li.classList.add('checked');
                }
                
                li.innerHTML = `
                    <input type="checkbox" id="${category}-${index}" ${item.checked ? 'checked' : ''}>
                    <label for="${category}-${index}" class="item-name">${item.name}</label>
                    <span class="item-quantity">${item.quantity}</span>
                    <div class="item-actions">
                        <button class="btn-icon"><i class="fas fa-edit"></i></button>
                        <button class="btn-icon"><i class="fas fa-trash"></i></button>
                    </div>
                `;
                
                // Add event listeners
                const checkbox = li.querySelector('input[type="checkbox"]');
                checkbox.addEventListener('change', function() {
                    shoppingList[category][index].checked = this.checked;
                    if (this.checked) {
                        li.classList.add('checked');
                    } else {
                        li.classList.remove('checked');
                    }
                });
                
                const editBtn = li.querySelector('.fa-edit').closest('button');
                editBtn.addEventListener('click', function() {
                    editShoppingItem(category, index);
                });
                
                const deleteBtn = li.querySelector('.fa-trash').closest('button');
                deleteBtn.addEventListener('click', function() {
                    deleteShoppingItem(category, index);
                });
                
                listElement.appendChild(li);
            });
        }
    }
}

function generateShoppingListFromMealPlan() {
    // In a real app, this would analyze the meal plan and generate a shopping list
    // For now, we'll just use a sample list
    console.log('Generating shopping list from meal plan');
    
    shoppingList = {
        vegetables: [
            { name: 'Onions', quantity: '6 medium', checked: false },
            { name: 'Tomatoes', quantity: '8 medium', checked: false },
            { name: 'Potatoes', quantity: '2 kg', checked: false }
        ],
        fruits: [],
        spices: [
            { name: 'Turmeric powder', quantity: '50g', checked: false },
            { name: 'Cumin seeds', quantity: '100g', checked: false },
            { name: 'Garam masala', quantity: '50g', checked: false },
            { name: 'Red chili powder', quantity: '50g', checked: false }
        ],
        grains: [
            { name: 'Basmati rice', quantity: '1 kg', checked: false },
            { name: 'Toor dal', quantity: '500g', checked: false },
            { name: 'Dosa rice', quantity: '1 kg', checked: false },
            { name: 'Urad dal', quantity: '500g', checked: false }
        ],
        dairy: [
            { name: 'Paneer', quantity: '400g', checked: false },
            { name: 'Fresh cream', quantity: '200ml', checked: false },
            { name: 'Yogurt', quantity: '500g', checked: false },
            { name: 'Ghee', quantity: '200g', checked: false }
        ],
        other: [
            { name: 'Cooking oil', quantity: '1 liter', checked: false }
        ]
    };
    
    renderShoppingList();
}

function editShoppingItem(category, index) {
    const item = shoppingList[category][index];
    const newName = prompt('Edit item name:', item.name);
    if (newName !== null) {
        const newQuantity = prompt('Edit quantity:', item.quantity);
        item.name = newName;
        item.quantity = newQuantity || '';
        renderShoppingList();
    }
}

function deleteShoppingItem(category, index) {
    if (confirm('Are you sure you want to delete this item?')) {
        shoppingList[category].splice(index, 1);
        renderShoppingList();
    }
}

// In a real app, we would have functions to:
// - Save shopping lists
// - Load shopping lists
// - Group items by store section
// - Sync with meal plans
// - Track purchased items

// export { initShoppingList, renderShoppingList };
