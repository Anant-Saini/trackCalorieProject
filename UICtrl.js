//UI Controller
const UICtrl = (function() {
    const UISelectors = {
        itemList: '#item-list',
        listItems: '#item-list li',
        addBtn: '.add-btn',
        updateBtn: '.update-btn',
        deleteBtn: '.delete-btn',
        backBtn: '.back-btn',
        itemName: '#item-name',
        itemCalories: '#item-calories',
        totalCalories: '.total-calories',
        clearAllBtn: '.clear-btn'
    }
    //public methods
    return {
        populateItemsList: function(items) {
            let html = '';
            items.forEach((item) => {
                html += `<li class="collection-item" id="item-${item.id}">
                            <strong>${item.name}: </strong><em>${item.calories} Calories</em>
                            <a href="#" class="secondary-content">
                                <i class="edit-item fa fa-pencil"></i>
                            </a>
                        </li>`
            });
            document.querySelector(UISelectors.itemList).innerHTML = html;
        },
        getUISelectors: function() {
            return UISelectors;
        },
        getInputValues: function() {
            return { name: document.querySelector(UISelectors.itemName).value,
                     calories: document.querySelector(UISelectors.itemCalories).value 
                    };
        },
        insertNewItem: function(item) {
            document.querySelector(UISelectors.itemList).style.display = 'block';
            let liItem = document.createElement('li');
            liItem.className = 'collection-item';
            liItem.id = `item-${item.id}`;
            //Add innerHTML to li
            liItem.innerHTML = `<strong>${item.name}: </strong>
                            <em>${item.calories} Calories</em>
                            <a href="#" class="secondary-content">
                            <i class="edit-item fa fa-pencil"></i>
                            </a>`;
            //Add newly created li to list
            document.querySelector(UISelectors.itemList).insertAdjacentElement('beforeend',
            liItem);
        },
        deleteSelectedItem: function(delItemID) {
            document.querySelector(`#item-${delItemID}`).remove();
        },
        clearInputs: function() {
            document.querySelector(UISelectors.itemName).value = '';
            document.querySelector(UISelectors.itemCalories).value = '';
        },
        hideList: function() {
            document.querySelector(UISelectors.itemList).style.display = 'none'; 
        },
        setInitialState: function() {
            this.clearInputs();
            document.querySelector(UISelectors.addBtn).style.display = 'inline';
            document.querySelector(UISelectors.updateBtn).style.display = 'none';
            document.querySelector(UISelectors.deleteBtn).style.display = 'none';
            document.querySelector(UISelectors.backBtn).style.display = 'none';
        },
        updatingInputFields: function() {
            document.querySelector(UISelectors.itemName).value = 
            ItemCtrl.getCurrentItem().name;
            document.querySelector(UISelectors.itemCalories).value = 
            ItemCtrl.getCurrentItem().calories;
            this.drawEditSettings();
        },
        drawEditSettings: function() {
            document.querySelector(UISelectors.addBtn).style.display = 'none';
            document.querySelector(UISelectors.updateBtn).style.display = 'inline';
            document.querySelector(UISelectors.deleteBtn).style.display = 'inline';
            document.querySelector(UISelectors.backBtn).style.display = 'inline';
        },
        drawTotalCalories: function(totalCalories) {
            document.querySelector(UISelectors.totalCalories).textContent =
            totalCalories;
        },
        showUpdatedItemList: function(updatedItem) {
            const itemList = document.querySelectorAll(UISelectors.listItems);
            let itemListArr = Array.from(itemList); 
            itemListArr.forEach( (item) => {
                if(item.id === `item-${updatedItem.id}`) {
                    const itemLi = document.querySelector(`#${item.id}`);
                    itemLi.innerHTML = `<strong>${updatedItem.name}: </strong>
                    <em>${updatedItem.calories} Calories</em>
                    <a href="#" class="secondary-content">
                    <i class="edit-item fa fa-pencil"></i>
                    </a>`;
                }
            });
        },
        removeAllItems: function() {
            let itemList = document.querySelectorAll(UISelectors.listItems);
            let itemListArr = Array.from(itemList);
            itemListArr.forEach( (liItem) => {
                liItem.remove();
            });
        }
    };
})();
