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
    makeBookList(userData);
})
function makeBookList(bookParameter) {
    const containerIncompleteBook = document.getElementById('incompleteBookshelfList')
    const containerCompletedBook = document.getElementById('completeBookshelfList')
    const article = document.createElement('article');
    article.classList.add('book_item');
    
    const bookTitle = document.createElement('h3');
    bookTitle.innerText = bookParameter.title;

    const penulis = document.createElement('p');
    penulis.innerText = bookParameter.author;

    const tahun = document.createElement('p');
    tahun.innerText = bookParameter.year;

    const actionButton = document.createElement('div');
    actionButton.classList.add('action')

    const green = document.createElement('button');
    green.classList.add('green');

    const red = document.createElement('button');
    red.classList.add('red');

    if (bookParameter.isComplete) {
        containerCompletedBook.appendChild(article);
        green.innerText = 'Belum selesai di Baca';
        red.innerText = 'Hapus buku';
    } else {
        containerIncompleteBook.appendChild(article);
        green.innerText = 'Selesai dibaca';
        red.innerText = 'Hapus buku';
    }    

    article.appendChild(bookTitle); 
    article.appendChild(penulis); 
    article.appendChild(tahun); 
    article.appendChild(actionButton);
    actionButton.appendChild(green);
    actionButton.appendChild(red);

}






// localStorage.setItem('name', 'Robin');
// console.log(localStorage.getItem('name'));
// localStorage.removeItem('name')