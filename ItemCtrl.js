//Item Controller
const ItemCtrl = (function() {
    //Private Data
    //Item Constructor
    const Item = function(id, name, calories) {
        this.id = id;
        this.name = name;
        this.calories = calories;
    }
    //Data Structure / State
    const data = {
        /*items: [
            // {id: 0, name: 'Steak dinner', calories: 5699},
            // {id: 1, name: 'Cookies', calories: 1200},
            // {id: 2, name: 'Eggs', calories: 300}
        ],*/
        items: StorageCtrl.getItemsFromLS(),
        currentItem: null,
        totalCalories: 0
    }
    //Public methods
    return {
        getData: function() {
            return data.items;
        },
        setCurrentItem: function(item) {
            data.currentItem = item;
        },
        getCurrentItem: function() {
            return data.currentItem;
        },
        addItem: function(itemName, itemCalories) {
            let ID = null;
            if( data.items.length > 0) {
                ID = data.items[data.items.length - 1].id + 1;
            } else {
                ID = 0;
            }
            let calories = parseInt(itemCalories);
            const newItem = new Item(ID, itemName, calories);
            data.items.push(newItem);
            return newItem;
        },
        deleteItem: function(id) {
            //get ids
            const ids = data.items.map( (item) => {
                return item.id;
            });
            // getting indexOf Item-ID to be deleted fro ids
            const index = ids.indexOf(id);
            // deleting item from data-structure
            data.items.splice(index, 1);
        },
        updateExistingItem: function(updatedName, updatedCalories) {
            let updatedItem = null;
            data.items.forEach( (item) => {
                if(item.id === data.currentItem.id) {
                    item.name = updatedName;
                    item.calories = updatedCalories;
                    updatedItem = item; 
                }
            });
            return updatedItem;
        },
        logData: function() {
            return data;
        },
        getTotalCalories: function() {
            let total = 0;
            //Loop through items to calculate totalCalories
            data.items.forEach((item) => {
                total += item.calories;
            });
            //Setting value of total calories 
            data.totalCalories = total;
            //return calculated totalCalories
            return data.totalCalories;
        },
        getItemFromID: function(itemID) {
            let itemToBeEdited = null;
            data.items.forEach((item) => {
                if(item.id === itemID ) {
                    itemToBeEdited = item;
                }
            });
            return itemToBeEdited;
        },
        clearAllItems: function() {
            data.items = [];
        } 
    }
})();
