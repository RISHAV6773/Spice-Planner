// Authentication Module
function initAuth() {
    // Login form submission
    document.getElementById('login').addEventListener('submit', function(e) {
        e.preventDefault();
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;
        
        // In a real app, this would be an API call
        console.log('Login attempt with:', email, password);
        
        // Simulate successful login
        simulateLogin(email);
    });
    
    // Signup form submission
    document.getElementById('signup').addEventListener('submit', function(e) {
        e.preventDefault();
        const name = document.getElementById('signup-name').value;
        const email = document.getElementById('signup-email').value;
        const password = document.getElementById('signup-password').value;
        const confirmPassword = document.getElementById('signup-confirm-password').value;
        const dietaryPreference = document.getElementById('dietary-preference').value;
        
        const allergenCheckboxes = document.querySelectorAll('input[name="allergens"]:checked');
        const allergens = Array.from(allergenCheckboxes).map(cb => cb.value);
        
        // Validate passwords match
        if (password !== confirmPassword) {
            alert('Passwords do not match!');
            return;
        }
        
        // In a real app, this would be an API call
        console.log('Signup with:', {
            name,
            email,
            password,
            dietaryPreference,
            allergens
        });
        
        // Simulate successful signup and login
        simulateLogin(email, name);
    });
    
    // Social login buttons
    document.querySelector('.google-btn').addEventListener('click', function() {
        // In a real app, this would use Firebase or another auth provider
        console.log('Google login clicked');
        simulateLogin('user@gmail.com', 'Google User');
    });
    
    document.querySelector('.facebook-btn').addEventListener('click', function() {
        // In a real app, this would use Firebase or another auth provider
        console.log('Facebook login clicked');
        simulateLogin('user@facebook.com', 'Facebook User');
    });
}

function simulateLogin(email, name = 'User') {
    // Hide auth modal
    document.getElementById('auth-modal').classList.remove('active');
    
    // Update UI for logged in user
    document.getElementById('auth-btn').classList.add('hidden');
    
    const userProfile = document.getElementById('user-profile');
    userProfile.classList.remove('hidden');
    userProfile.querySelector('.user-name').textContent = name || email.split('@')[0];
    
    // In a real app, we would store the auth token and user data
    console.log('User logged in:', email);
    
    // Enable features that require authentication
    document.getElementById('add-new-recipe-btn').disabled = false;
    document.getElementById('submit-recipe-btn').disabled = false;
}

function logout() {
    // In a real app, this would clear the auth token
    document.getElementById('auth-btn').classList.remove('hidden');
    document.getElementById('user-profile').classList.add('hidden');
    
    // Disable features that require authentication
    document.getElementById('add-new-recipe-btn').disabled = true;
    document.getElementById('submit-recipe-btn').disabled = true;
    
    console.log('User logged out');
}

// Export functions if using modules
// export { initAuth, logout }; 
