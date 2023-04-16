import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js';
import { getDatabase, ref, push, onValue, remove } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js';


const appSettings = {
    databaseURL: "https://mygrocerylist-aryadeepit-default-rtdb.asia-southeast1.firebasedatabase.app/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const shoppingListInDB = ref(database, 'shoppingList')


const inputField = document.getElementById('input-field');
const addButton = document.getElementById('add-button');
const shoppingList = document.getElementById('shopping-list');

addButton.addEventListener('click', function() {
    let inputValue = inputField.value
    push(shoppingListInDB, inputValue)
    clearInputField()
})

onValue(shoppingListInDB, function(snapshot) {
    if(snapshot.exists()) {
        let itemsArray = Object.entries(snapshot.val())
    clearShoppingList()

    for(let i=0; i<itemsArray.length; i++) {
        let currentItem = itemsArray[i]
        let currentItemID = currentItem[0]
        let currentItemValue = currentItem[1]

        appendItemToShoppingList(currentItem)

    }

    } else {
        shoppingList.innerHTML = 'No items in the list'
    }
    

})



function clearInputField() {
    inputField.value = ''
}

function appendItemToShoppingList(item) {
    let itemID = item[0]
    let itemValue = item[1]

    let newElement = document.createElement('li')
    newElement.textContent = itemValue

    newElement.addEventListener('dblclick', function() {
        let exactLocationOfItemInDB = ref(database, `shoppingList/${itemID}`)
        remove(exactLocationOfItemInDB)
    })
    shoppingList.append(newElement)

}

function clearShoppingList() {
    shoppingList.innerHTML = ''
}



// for keyboard 'Enter' key press event
var input = document.getElementById('input-field');
input.addEventListener('keyup', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        document.getElementById('add-button').click();
    }
});