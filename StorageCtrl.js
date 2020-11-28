//Storage Controller
const StorageCtrl = (function() {
    //private data
    //public methods
    return {
        storeItem: function(item) {
            let items;
            if(localStorage.getItem('items') === null) {
                items = [];
                //insert item into items
                items.push(item);
                //inserting items into local storage
                localStorage.setItem('items', JSON.stringify(items));
            } else {
                //get items from local storage
                items = JSON.parse(localStorage.getItem('items'));
                //adding new item
                items.push(item);
                //inserting items into local storage
                localStorage.setItem('items', JSON.stringify(items));
            }
        },
        getItemsFromLS: function() {
            let items;
            if(localStorage.getItem('items') === null) {
                items = [];
            } else {
                items = JSON.parse(localStorage.getItem('items'));
            }
            return items;
        },
        updateItemInLS: function(updatedItem) {
            let items = JSON.parse(localStorage.getItem('items'));
            items.forEach( (item, index) => {
                if(item.id === updatedItem.id) {
                    items.splice(index, 1, updatedItem);
                }
            });
            localStorage.setItem('items', JSON.stringify(items));
        },
        deleteItemFromLS: function(itemToBeDelID) {
            let items = JSON.parse(localStorage.getItem('items'));
            items.forEach( (item, index) => {
                if(item.id === itemToBeDelID) {
                    items.splice(index, 1);
                }
            });
            localStorage.setItem('items', JSON.stringify(items));
        },
        clearLS: function() {
            localStorage.removeItem('items');
        }
    };
})();
