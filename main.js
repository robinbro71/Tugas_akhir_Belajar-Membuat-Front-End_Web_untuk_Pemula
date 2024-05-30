const storageKey = 'STORAGE_KEY'
const submitData = document.getElementById('inputBook')

function checkStorage() {
    if ( typeof (Storage) !== 'undefined') {
        return true
    } else {
        alert('browserkamu tidak mendukung local storage')
        return false
    }
    
}

function putBooklist(data) {
    if (checkStorage()) {
        let bookData = [];
        if(localStorage.getItem(storageKey) !== null) {
            bookData = JSON.parse(localStorage.getItem(storageKey))
        }
        bookData.unshift(data);
        localStorage.setItem(storageKey, JSON.stringify(bookData))
        //inconstruction
    }
}


function generateId() {
    return +new Date();
}

submitData.addEventListener('submit', function (event) {
    event.preventDefault();
    const generatedId = generateId()
    const inputJudul = document.getElementById('inputBookTitle').value;
    const inputPenulis = document.getElementById('inputBookAuthor').value;
    const inputTahun = document.getElementById('inputBookYear').value;
    const inputIsComplete = document.getElementById('inputBookIsComplete').checked;

    const userData = {
        id: generatedId,
        title: inputJudul,
        author: inputPenulis,
        year: inputTahun,
        isComplete: inputIsComplete
    }
    putBooklist(userData)
    // renderBookList();
})






// localStorage.setItem('name', 'Robin');
// console.log(localStorage.getItem('name'));
// localStorage.removeItem('name')