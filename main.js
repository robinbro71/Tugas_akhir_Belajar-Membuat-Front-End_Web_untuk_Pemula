// ctreate constanta start
const storageKey = 'Bookshelf_Apps'
const submitData = document.getElementById('inputBook')
const RENDER_EVENT = 'render-book';
const book = [];
const searchBook = document.getElementById('searchBook')
const searchInput = document.getElementById('searchBookTitle')
// create constanta end

// create function start
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
    }
}


function generateId() {
    return +new Date();
}

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
    green.innerText = bookParameter.isComplete? 'Belum selesai di baca': 'selesai dibaca';
    green.addEventListener('click', function() {
        changeIsComplete(bookParameter.id)

    })

    const red = document.createElement('button');
    red.classList.add('red');
    red.innerText = 'Hapus buku'
    red.addEventListener('click', function() {
        removeBook(bookParameter.id);
    })

    if (bookParameter.isComplete) {
        containerCompletedBook.appendChild(article);
    } else {
        containerIncompleteBook.appendChild(article);
    }    
    
    actionButton.appendChild(green);
    actionButton.appendChild(red);
    article.appendChild(bookTitle); 
    article.appendChild(penulis); 
    article.appendChild(tahun); 
    article.appendChild(actionButton);

}

function renderBookList(booksToRender = null) {
    const storedBooks = booksToRender || JSON.parse(localStorage.getItem(storageKey)) || [];
    const containerIncompleteBook = document.getElementById('incompleteBookshelfList')
    const containerCompletedBook = document.getElementById('completeBookshelfList')
    containerIncompleteBook.innerHTML = '';
    containerCompletedBook.innerHTML = '';

    storedBooks.forEach(book => {
        makeBookList(book);
    })
}

function findBookIndex(bookId) {
    return books.findIndex( book => book.id === bookId )
}
function changeIsComplete(bookId) {
    const storedBooks = JSON.parse(localStorage.getItem(storageKey)) || [];
    const bookIndex = storedBooks.findIndex(book => book.id === bookId)
    if(bookIndex === -1) return;

    storedBooks[bookIndex].isComplete = !storedBooks[bookIndex].isComplete
    localStorage.setItem(storageKey, JSON.stringify(storedBooks));
    renderBookList();
}

function removeBook(bookId) {
    const storedBooks = JSON.parse(localStorage.getItem(storageKey)) || [];
    const bookIndex = storedBooks.findIndex(book => book.id === bookId)
    if(bookIndex === -1) return;

    storedBooks.splice(bookIndex, 1)
    localStorage.setItem(storageKey, JSON.stringify(storedBooks));
    renderBookList();
}

function searchBooks(keyword) {
    const storedBooks = JSON.parse(localStorage.getItem(storageKey)) || [];
    const filteredBooks = storedBooks.filter(book => 
        book.title.toLowerCase().includes(keyword.toLowerCase())
    );
    renderBookList(filteredBooks);
}
// create function end

// create event handler start
document.addEventListener('DOMContentLoaded', function() {
    if(checkStorage()) {
        renderBookList();
    }
})

submitData.addEventListener('submit', function (event) {
    event.preventDefault();
    const generatedId = generateId();
    const inputJudul = document.getElementById('inputBookTitle').value;
    const inputPenulis = document.getElementById('inputBookAuthor').value;
    const inputTahun = Number(document.getElementById('inputBookYear').value); // Convert to integer
    const inputIsComplete = document.getElementById('inputBookIsComplete').checked;

    const userData = {
        id: generatedId,
        title: inputJudul,
        author: inputPenulis,
        year: inputTahun, // Stored as an integer
        isComplete: inputIsComplete
    }
    putBooklist(userData)
    book.push(userData)
    renderBookList();
})


function userData (id, title, author, year, isComplete) {
    return {
        id,
        title,
        author,
        year: parseInt(year),
        isComplete
    }
}

searchBook.addEventListener('submit', function (event) {
    event.preventDefault();
    const searchKeyword = searchInput.value;
    searchBooks(searchKeyword);
})
// create event handler end