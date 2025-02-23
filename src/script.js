// Data Structure
const mylibrary = [];
let newbook = {};

// Core Book Constructor
function book(title, genre, pages, readStatus) {
    this.bookTitle = title;
    this.bookGenre = genre;
    this.bookPages = pages;
    this.bookReadStatus = readStatus;
}

// Library Management Functions
function addBookToLibrary() { 
    mylibrary.push(newbook);
}

function clearBook() {
    const container = document.getElementById('toDelete');
    container.remove();
}

// DOM Creation Functions
function createCard(item) {
    // Create card container 
    const card = document.createElement('div');
    card.className = 'card bg-base-100 shadow-xl min-w-fit';
    
    const figureCard = document.createElement('figure');

    const figureColour = document.createElement('div');
    figureColour.className = "w-full h-24 bg-gray-300";

    const cardBody = document.createElement('div');
    cardBody.className = 'card-body';

    const cardTitle = document.createElement('h2');
    cardTitle.className = 'card-title';
    cardTitle.textContent = item.bookTitle;

    const cardGenre = document.createElement('h2');
    cardGenre.className = 'card-genre';
    cardGenre.textContent = item.bookGenre;

    const cardPages = document.createElement('h2');
    cardPages.className = 'card-title';
    cardPages.textContent = item.bookPages;

    // Create read status container
    const readContainer = document.createElement('div');
    readContainer.className = 'flex gap-4';

    const readLabel = document.createElement('span');
    readLabel.textContent = 'Read?';

    const readToggle = document.createElement('input');
    readToggle.type = 'checkbox';
    readToggle.className = 'toggle';
    readToggle.checked = !!item.bookReadStatus; // Set initial state based on bookReadStatus
    readToggle.onchange = function() {
        this.setAttribute('value', this.checked.toString());
        item.bookReadStatus = this.checked;
    };

    readContainer.appendChild(readLabel);
    readContainer.appendChild(readToggle);

    const cardActions = document.createElement('div');
    cardActions.className = 'card-actions justify-end';

    const removeButton = document.createElement('button');
    removeButton.className = 'btn btn-primary';
    removeButton.textContent = 'Remove';

    cardActions.appendChild(removeButton);
    cardBody.appendChild(cardTitle);
    cardBody.appendChild(cardGenre);
    cardBody.appendChild(cardPages);
    cardBody.appendChild(readContainer);  // Add read container
    cardBody.appendChild(cardActions);
    figureCard.appendChild(figureColour);
    card.appendChild(figureCard);
    card.appendChild(cardBody);

    return card;
}

// Display Functions
function displayBooks() {
    const container = document.getElementById('card-container');
    const fragment = document.createDocumentFragment();
    
    mylibrary.forEach(item => {
        fragment.appendChild(createCard(item));
    });
    
    container.appendChild(fragment);
}

function addBooks() {
    const container = document.getElementById('card-container');
    const len = mylibrary.length;
    container.appendChild(createCard(mylibrary[len - 1]));
}

// DOM Elements
const addBookBtn = document.querySelector('.submitBtn');
const removeBookBtn = document.querySelector('.removeBtn');
const inputPages = document.getElementById('formPages');
const inputTitle = document.getElementById('formTitle');
const inputGenre = document.getElementById('formGenre');
const inputReadStatus = document.getElementById('formReadStatus');
const modal = document.getElementById('my_modal_1');

// Event Listeners
addBookBtn.addEventListener('click', (e) => {
    e.preventDefault();
    newbook = new book(inputTitle.value, inputGenre.value, inputPages.value, inputReadStatus.checked);
    addBookToLibrary();
    modal.close();
    //clearBooks();
    addBooks();
});

removeBookBtn.addEventListener('click', (e) => {
    clearBook();
});

// Initial Display
displayBooks();