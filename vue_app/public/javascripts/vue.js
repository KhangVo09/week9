const app = new Vue({
    el: "#vue_app",
    data: {
        userInput: '',
        categoryInput: '',
        list: [],
        errorMessage: ''
    },
    mounted: function () {
        this.$nextTick(function () {
            this.fetchList();
        })
    },
    methods: {
        async fetchList() {
            const response = await fetch("http://localhost:3000/todo/read_all_items");
            var response_json = await response.json();
            this.list = response_json['data'];
        },
        save_new_item(newItem) {
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newItem)
            };
            fetch('http://localhost:3000/todo/create_new', requestOptions)
                .then(async response => {
                    const data = await response.json();
                    if (!response.ok) {
                        const error = (data && data.message) || response.status;
                        return Promise.reject(error);
                    }
                    this.postId = data.id;
                })
                .catch(error => {
                    this.errorMessage = error;
                    console.error('There was an error!', error);
                });
        },
        save_edited_item(index, editedItem) {
            const requestOptions = {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(editedItem)
            };
            fetch('http://localhost:3000/todo/update_me', requestOptions) // Ensure this URL matches your route
                .then(async response => {
                    const data = await response.json();
                    if (!response.ok) {
                        const error = (data && data.message) || response.status;
                        return Promise.reject(error);
                    }
                    this.postId = data.id;
                })
                .catch(error => {
                    this.errorMessage = error;
                    console.error('There was an error!', error);
                });
        },
        
        addItem() {
            if (this.userInput.trim() !== '' && this.categoryInput.trim() !== '') {
                const existingItem = this.list.find(item => 
                    item.title.toLowerCase() === this.userInput.trim().toLowerCase() &&
                    item.category.toLowerCase() === this.categoryInput.trim().toLowerCase()
                );
                
                if (existingItem) {
                    this.errorMessage = "This item already exists in the category";
                } else {
                    const newItem = {
                        id: generate_random_uuid(),
                        title: this.userInput.trim(),
                        category: this.categoryInput.trim()
                    };
                    this.list.push(newItem);
                    this.save_new_item(newItem);
                    this.userInput = '';
                    this.categoryInput = '';
                    this.errorMessage = '';
                }
            } else {
                this.errorMessage = "Please enter both item and category";
            }
        },
        
        
        deleteItem(index) {
            const deletedItem = this.list[index];
            deletedItem.is_active = false;
            this.save_edited_item(index, deletedItem);
            this.list.splice(index, 1);
        },
        editItem(index) {
            const editedTitle = prompt('Edit the todo:', this.list[index].title);
            const editedCategory = prompt('Edit the category:', this.list[index].category);
            if (editedTitle !== null && editedTitle.trim() !== '' &&
                editedCategory !== null && editedCategory.trim() !== '') {
                this.list[index].title = editedTitle.trim();
                this.list[index].category = editedCategory.trim();
                this.save_edited_item(index, { 
                    _id: this.list[index].id, 
                    title: editedTitle.trim(),
                    category: editedCategory.trim()
                });
            }
        },
        async fetchList() {
            try {
                const response = await fetch("http://localhost:3000/todo/read_list");
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                this.list = data['data'];
            } catch (error) {
                console.error("There was a problem with the fetch operation:", error.message);
                // Handle the error appropriately in your UI
            }
        },
    }
});
