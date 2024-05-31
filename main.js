const storageKey = 'Bookshelf_Apps'
const submitData = document.getElementById('inputBook')
// const RENDER_EVENT = 'render-book';
// const book = [];

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
// document.dispatchEvent(new Event(RENDER_EVENT))

submitData.addEventListener('submit', function (event) {
    event.preventDefault();
    const generatedId = generateId();
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
    // book.push(userData)
    // renderBookList();
    makeBookList();
})
function makeBookList(bookParameter) {
    const countainer = document.getElementById('incompleteBookshelfList')
    const article = document.createElement('article');
    article.classList.add('book_item');
    countainer.appendChild(article)
}






// localStorage.setItem('name', 'Robin');
// console.log(localStorage.getItem('name'));
// localStorage.removeItem('name')