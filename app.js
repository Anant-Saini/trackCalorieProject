//App Controller
const App = (function(itemCtrl, storageCtrl, uiCtrl) {
    //loadEventListeners
    const loadEventListeners = function() {
        const UISelectors = uiCtrl.getUISelectors();
        //Add Item Event Listener
        document.querySelector(UISelectors.addBtn).addEventListener('click',
        addItemIntoList);
        //Disable Enter Functionality
        document.addEventListener('keypress', function(e) {
            if(e.key === 'Enter') {
                e.preventDefault();
                return false;
            }
        });
        //Add Edit Click Listener
        document.querySelector(UISelectors.itemList).addEventListener('click',
        itemEditClick);
        //Add update submit Event Listener
        document.querySelector(UISelectors.updateBtn).addEventListener('click',
        updateSubmitClick);
        //Add Back click Event Listener
        document.querySelector(UISelectors.backBtn).addEventListener('click',
        (e) => {
            uiCtrl.setInitialState();
            e.preventDefault();
        });
        //Add delete click Event Listener
        document.querySelector(UISelectors.deleteBtn).addEventListener('click',
        deleteItemClick);
        //Add ClearAll click Event Listener
        document.querySelector(UISelectors.clearAllBtn).addEventListener('click',
        clearAllClick);
    }
    //addItemIntoList
    const addItemIntoList = function(e) {
        const item = uiCtrl.getInputValues();
        if( item.name !== '' && item.calories !== '') {
           //insert item into data 
           const newItem = itemCtrl.addItem(item.name, item.calories);
           //insert item into local storage
           storageCtrl.storeItem(newItem);
           //Add Item to UI
           uiCtrl.insertNewItem(newItem);
           //getting totalCalories from ItemCtrl
           const totalCalories = itemCtrl.getTotalCalories();
           //inserting total calories in UI
           uiCtrl.drawTotalCalories(totalCalories);
           //Clear Input Fields
           uiCtrl.clearInputs();
        }
        e.preventDefault();
    }
    //Click Edit Item 
    const itemEditClick = function(e) {
        if(e.target.className.includes('edit-item')) {
            //Get Id of selected item
            const itemID = e.target.parentNode.parentNode.id;
            // Breaking itemID to get pure ID number
            const IDArr = itemID.split('-');
            // getting the item to be edited from data structure
            const itemToBeEdited = itemCtrl.getItemFromID(parseInt(IDArr[1]));
            // set currentItem in data structure to itemToBeEdited
            itemCtrl.setCurrentItem(itemToBeEdited); 
            /* updating input fields and creating UI for update delete and 
            back functionalities*/
            uiCtrl.updatingInputFields();
        }
        e.preventDefault();
    }
    //Update Submit Click
    const updateSubmitClick = function(e) {
        // getting updated values from fields
        let updatedItem = uiCtrl.getInputValues();
        // setting new values in data structure
        updatedItem = itemCtrl.updateExistingItem(updatedItem.name, parseInt(updatedItem.calories));
        // update item in loacal storage
        storageCtrl.updateItemInLS(updatedItem);
        // changing UI to show updatedItem in list
        uiCtrl.showUpdatedItemList(updatedItem);
        //getting totalCalories from ItemCtrl
        const totalCalories = itemCtrl.getTotalCalories();
        //inserting total calories in UI
        uiCtrl.drawTotalCalories(totalCalories);
        //setting initial state
        uiCtrl.setInitialState();
        e.preventDefault();
    }
    //delete item click
    const deleteItemClick = function(e) {
        const currentItem = itemCtrl.getCurrentItem();
        // deleting current item from data structure
        itemCtrl.deleteItem(currentItem.id);
        // delete selected item from Local Storage
        storageCtrl.deleteItemFromLS(currentItem.id);
        // deleting selected item from UI
        uiCtrl.deleteSelectedItem(currentItem.id);
        //getting totalCalories from ItemCtrl
        const totalCalories = itemCtrl.getTotalCalories();
        //inserting total calories in UI
        uiCtrl.drawTotalCalories(totalCalories);
        //setting initial state
        uiCtrl.setInitialState();
        e.preventDefault();
    }
    //clearAllClick
    const clearAllClick = function(e) {
        //empty the data structure
        itemCtrl.clearAllItems();
        //Empty the local storage
        storageCtrl.clearLS();
        //getting totalCalories from ItemCtrl
        const totalCalories = itemCtrl.getTotalCalories();
        //inserting total calories in UI
        uiCtrl.drawTotalCalories(totalCalories);
        //empty the UI List
        uiCtrl.removeAllItems();
        //Hide Line of List
        uiCtrl.hideList();
        //setting initial state
        uiCtrl.setInitialState();
    }
    //public methods
    return {
        init: function() {
            //set initial state
            uiCtrl.setInitialState();
            //get item from data structure
            const items = itemCtrl.getData();
            //Hide List if it's empty
            if( items.length === 0) {
                uiCtrl.hideList();
            } else {
                //draw Items inside list from data structure
                uiCtrl.populateItemsList(items);
            }
            //getting totalCalories from ItemCtrl
            const totalCalories = itemCtrl.getTotalCalories();
            //inserting total calories in UI
            uiCtrl.drawTotalCalories(totalCalories);
            //Load Event Listeners
            loadEventListeners();
        }
    }
})(ItemCtrl, StorageCtrl, UICtrl);
//Init App
App.init();