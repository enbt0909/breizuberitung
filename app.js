// Brei Recipe Manager - Optimized Version
class BreiManager {
    constructor() {
        this.rezepte = {};
        this.currentIngredients = [];
        this.filteredRezepte = {};
        this.searchTerm = '';
        
        this.initializeElements();
        this.initializeData();
        this.bindEvents();
        this.renderBreiGrid();
    }

    initializeElements() {
        // Get all DOM elements
        this.elements = {
            breiGrid: document.getElementById('breiGrid'),
            recipeDiv: document.getElementById('recipe'),
            recipeName: document.getElementById('recipeName'),
            recipeBody: document.getElementById('recipeBody'),
            portionsInput: document.getElementById('portions'),
            searchInput: document.getElementById('searchInput'),
            closeRecipeBtn: document.getElementById('closeRecipe'),
            newBreiNameInput: document.getElementById('newBreiName'),
            ingredientsContainer: document.getElementById('ingredientsContainer'),
            addIngredientBtn: document.getElementById('addIngredientBtn'),
            addBreiBtn: document.getElementById('addBreiBtn'),
            addBreiForm: document.getElementById('addBreiForm'),
            resetFormBtn: document.getElementById('resetForm')
        };
    }

    initializeData() {
        // Load from localStorage or initialize with default recipes
        try {
            const stored = localStorage.getItem('rezepte');
            if (stored) {
                this.rezepte = JSON.parse(stored);
            } else {
                this.initializeDefaultRecipes();
            }
        } catch (error) {
            console.error('Error loading recipes:', error);
            this.initializeDefaultRecipes();
        }
        this.filteredRezepte = { ...this.rezepte };
    }

    initializeDefaultRecipes() {
        this.rezepte = {
            "Haferbrei": [
                { name: "Wasser (ml)", menge: 200 },
                { name: "Haferflocken (g)", menge: 50 },
                { name: "Milch (ml)", menge: 100 },
                { name: "Banane (g)", menge: 50 },
                { name: "Zimt (g)", menge: 2 },
                { name: "Zucker (g)", menge: 5 },
                { name: "Salz (g)", menge: 1 }
            ],
            "Reisbrei": [
                { name: "Wasser (ml)", menge: 250 },
                { name: "Reis (g)", menge: 60 },
                { name: "Milch (ml)", menge: 80 },
                { name: "Apfel (g)", menge: 50 },
                { name: "Vanille (g)", menge: 2 },
                { name: "Zucker (g)", menge: 5 },
                { name: "Salz (g)", menge: 1 }
            ],
            "Grießbrei": [
                { name: "Milch (ml)", menge: 250 },
                { name: "Grieß (g)", menge: 40 },
                { name: "Zucker (g)", menge: 5 },
                { name: "Salz (g)", menge: 1 },
                { name: "Butter (g)", menge: 10 }
            ],
            "Maisbrei": [
                { name: "Wasser (ml)", menge: 200 },
                { name: "Maisgrieß (g)", menge: 50 },
                { name: "Milch (ml)", menge: 50 },
                { name: "Salz (g)", menge: 1 }
            ],
            "Hirsebrei": [
                { name: "Wasser (ml)", menge: 200 },
                { name: "Hirse (g)", menge: 50 },
                { name: "Milch (ml)", menge: 50 },
                { name: "Zucker (g)", menge: 5 },
                { name: "Salz (g)", menge: 1 }
            ],
            "Buchweizenbrei": [
                { name: "Wasser (ml)", menge: 200 },
                { name: "Buchweizen (g)", menge: 50 },
                { name: "Milch (ml)", menge: 50 },
                { name: "Zucker (g)", menge: 5 },
                { name: "Salz (g)", menge: 1 }
            ],
            "Dinkelbrei": [
                { name: "Wasser (ml)", menge: 200 },
                { name: "Dinkelgrieß (g)", menge: 50 },
                { name: "Milch (ml)", menge: 50 },
                { name: "Zucker (g)", menge: 5 },
                { name: "Zimt (g)", menge: 2 },
                { name: "Salz (g)", menge: 1 }
            ],
            "Quinoabrei": [
                { name: "Wasser (ml)", menge: 200 },
                { name: "Quinoa (g)", menge: 50 },
                { name: "Milch (ml)", menge: 50 },
                { name: "Zucker (g)", menge: 5 },
                { name: "Salz (g)", menge: 1 }
            ],
            "Kokosbrei": [
                { name: "Milch (ml)", menge: 200 },
                { name: "Kokosraspeln (g)", menge: 40 },
                { name: "Zucker (g)", menge: 5 },
                { name: "Salz (g)", menge: 1 }
            ],
            "Mandelbrei": [
                { name: "Milch (ml)", menge: 200 },
                { name: "Mandelmehl (g)", menge: 40 },
                { name: "Zucker (g)", menge: 5 },
                { name: "Salz (g)", menge: 1 }
            ]
        };
        this.saveRecipes();
    }

    bindEvents() {
        // Search functionality
        this.elements.searchInput.addEventListener('input', (e) => {
            this.searchTerm = e.target.value.toLowerCase();
            this.filterRecipes();
        });

        // Recipe display
        this.elements.portionsInput.addEventListener('input', () => this.updateTotals());
        this.elements.closeRecipeBtn.addEventListener('click', () => this.hideRecipe());

        // Form handling
        this.elements.addBreiForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.addNewRecipe();
        });

        this.elements.addIngredientBtn.addEventListener('click', () => this.addIngredientRow());
        this.elements.resetFormBtn.addEventListener('click', () => this.resetForm());

        // Dynamic ingredient removal
        this.elements.ingredientsContainer.addEventListener('click', (e) => {
            if (e.target.classList.contains('removeIngredient')) {
                this.removeIngredientRow(e.target.parentElement);
            }
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.hideRecipe();
            }
        });

        // Input validation for recipe ingredients
        document.addEventListener('input', (e) => {
            if (e.target.classList.contains('perPortion')) {
                this.updateTotals();
            }
        });
    }

    filterRecipes() {
        if (!this.searchTerm) {
            this.filteredRezepte = { ...this.rezepte };
        } else {
            this.filteredRezepte = {};
            Object.keys(this.rezepte).forEach(name => {
                if (name.toLowerCase().includes(this.searchTerm)) {
                    this.filteredRezepte[name] = this.rezepte[name];
                }
            });
        }
        this.renderBreiGrid();
    }

    renderBreiGrid() {
        this.elements.breiGrid.innerHTML = '';
        
        const recipeNames = Object.keys(this.filteredRezepte).sort();
        
        if (recipeNames.length === 0) {
            const noResults = document.createElement('div');
            noResults.textContent = 'Keine Rezepte gefunden';
            noResults.style.textAlign = 'center';
            noResults.style.padding = '2rem';
            noResults.style.color = 'var(--text-secondary)';
            this.elements.breiGrid.appendChild(noResults);
            return;
        }

        recipeNames.forEach(name => {
            const div = document.createElement('div');
            div.classList.add('breiItem', 'fade-in');
            div.textContent = name;
            div.setAttribute('tabindex', '0');
            div.setAttribute('role', 'button');
            div.setAttribute('aria-label', `Rezept ${name} anzeigen`);
            
            // Click and keyboard events
            const showRecipe = () => this.showRecipe(name);
            div.addEventListener('click', showRecipe);
            div.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    showRecipe();
                }
            });
            
            this.elements.breiGrid.appendChild(div);
        });
    }

    showRecipe(breiName) {
        if (!this.rezepte[breiName]) return;

        this.elements.recipeDiv.setAttribute('aria-hidden', 'false');
        this.elements.recipeName.textContent = breiName;
        this.elements.recipeBody.innerHTML = '';
        this.currentIngredients = [];

        this.rezepte[breiName].forEach(ingredient => {
            const tr = document.createElement('tr');

            const tdName = document.createElement('td');
            tdName.textContent = ingredient.name;

            const tdPerPortion = document.createElement('td');
            const input = document.createElement('input');
            input.type = "number";
            input.value = ingredient.menge;
            input.min = "0";
            input.step = "0.1";
            input.classList.add('perPortion');
            input.setAttribute('aria-label', `Menge pro Portion für ${ingredient.name}`);
            tdPerPortion.appendChild(input);

            const tdTotal = document.createElement('td');
            tdTotal.textContent = ingredient.menge;
            tdTotal.classList.add('total');
            tdTotal.setAttribute('aria-label', `Gesamtmenge für ${ingredient.name}`);

            tr.appendChild(tdName);
            tr.appendChild(tdPerPortion);
            tr.appendChild(tdTotal);

            this.elements.recipeBody.appendChild(tr);
            this.currentIngredients.push({ 
                input: input, 
                totalCell: tdTotal, 
                name: ingredient.name 
            });
        });

        this.updateTotals();
        this.elements.recipeDiv.scrollIntoView({ behavior: 'smooth' });
    }

    hideRecipe() {
        this.elements.recipeDiv.setAttribute('aria-hidden', 'true');
        this.elements.recipeName.textContent = '';
        this.currentIngredients = [];
    }

    updateTotals() {
        const portions = parseFloat(this.elements.portionsInput.value) || 1;
        
        this.currentIngredients.forEach(item => {
            const perPortion = parseFloat(item.input.value) || 0;
            const total = (perPortion * portions).toFixed(1);
            item.totalCell.textContent = total;
        });

        // Save changes to localStorage
        if (this.elements.recipeName.textContent) {
            const name = this.elements.recipeName.textContent;
            this.rezepte[name] = this.currentIngredients.map(item => ({
                name: item.name,
                menge: parseFloat(item.input.value) || 0
            }));
            this.saveRecipes();
        }
    }

    addIngredientRow() {
        const row = document.createElement('div');
        row.classList.add('ingredient-row');
        row.innerHTML = `
            <input type="text" placeholder="Zutat" required aria-label="Zutat">
            <input type="number" placeholder="Menge" min="0" step="0.1" required aria-label="Menge pro Portion">
            <button type="button" class="removeIngredient" aria-label="Zutat entfernen">-</button>
        `;
        this.elements.ingredientsContainer.appendChild(row);
        
        // Focus on the first input of the new row
        row.querySelector('input[type="text"]').focus();
    }

    removeIngredientRow(row) {
        if (this.elements.ingredientsContainer.children.length > 1) {
            row.remove();
        } else {
            this.showNotification('Mindestens eine Zutat ist erforderlich', 'warning');
        }
    }

    addNewRecipe() {
        const name = this.elements.newBreiNameInput.value.trim();
        
        if (!name) {
            this.showNotification('Bitte gib einen Namen für den Brei ein', 'error');
            this.elements.newBreiNameInput.focus();
            return;
        }

        if (this.rezepte[name]) {
            this.showNotification('Ein Rezept mit diesem Namen existiert bereits', 'error');
            this.elements.newBreiNameInput.focus();
            return;
        }

        const ingredients = this.collectIngredients();
        if (ingredients.length === 0) {
            this.showNotification('Bitte füge mindestens eine Zutat hinzu', 'error');
            return;
        }

        this.rezepte[name] = ingredients;
        this.saveRecipes();
        this.renderBreiGrid();
        this.resetForm();
        this.showNotification(`Rezept "${name}" wurde erfolgreich hinzugefügt`, 'success');
    }

    collectIngredients() {
        const ingredients = [];
        const rows = this.elements.ingredientsContainer.querySelectorAll('.ingredient-row');
        
        rows.forEach(row => {
            const inputs = row.querySelectorAll('input');
            const name = inputs[0].value.trim();
            const menge = parseFloat(inputs[1].value);
            
            if (name && !isNaN(menge) && menge > 0) {
                ingredients.push({ name, menge });
            }
        });
        
        return ingredients;
    }

    resetForm() {
        this.elements.addBreiForm.reset();
        this.elements.ingredientsContainer.innerHTML = `
            <div class="ingredient-row">
                <input type="text" placeholder="Zutat" required aria-label="Zutat">
                <input type="number" placeholder="Menge" min="0" step="0.1" required aria-label="Menge pro Portion">
                <button type="button" class="removeIngredient" aria-label="Zutat entfernen">-</button>
            </div>
        `;
    }

    saveRecipes() {
        try {
            localStorage.setItem('rezepte', JSON.stringify(this.rezepte));
        } catch (error) {
            console.error('Error saving recipes:', error);
            this.showNotification('Fehler beim Speichern der Rezepte', 'error');
        }
    }

    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 1rem 1.5rem;
            border-radius: var(--border-radius);
            color: white;
            font-weight: 500;
            z-index: 1000;
            animation: slideIn 0.3s ease-out;
            max-width: 300px;
        `;

        // Set background color based on type
        const colors = {
            success: 'var(--success-color)',
            error: 'var(--error-color)',
            warning: 'var(--warning-color)',
            info: 'var(--primary-color)'
        };
        notification.style.backgroundColor = colors[type] || colors.info;

        document.body.appendChild(notification);

        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease-in';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }
}

// Add CSS for notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(style);

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new BreiManager();
});