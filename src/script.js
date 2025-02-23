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

function clearBook(card) {
    card.remove(); // Remove the specific card element
}

// DOM Creation Functions
function createCard(item) {
    // Create card container with fixed size
    const card = document.createElement('div');
    card.className = 'card bg-base-100 shadow-xl w-72 h-96 flex flex-col';
    
    const figureCard = document.createElement('figure');
    const figureColour = document.createElement('div');
    figureColour.className = "w-full h-24 bg-gray-300";

    const cardBody = document.createElement('div');
    cardBody.className = 'card-body flex flex-col';

    // Title field with label
    const cardTitleContainer = document.createElement('div');
    cardTitleContainer.className = 'flex items-center gap-2';
    const titleLabel = document.createElement('span');
    titleLabel.className = 'font-bold';
    titleLabel.textContent = 'Title:';
    const cardTitle = document.createElement('h2');
    cardTitle.className = 'truncate'; // Prevent title wrapping
    cardTitle.textContent = item.bookTitle;
    cardTitleContainer.appendChild(titleLabel);
    cardTitleContainer.appendChild(cardTitle);

    // Genre field with label
    const cardGenreContainer = document.createElement('div');
    cardGenreContainer.className = 'flex items-center gap-2';
    const genreLabel = document.createElement('span');
    genreLabel.className = 'font-bold';
    genreLabel.textContent = 'Genre:';
    const cardGenre = document.createElement('h2');
    cardGenre.textContent = item.bookGenre;
    cardGenreContainer.appendChild(genreLabel);
    cardGenreContainer.appendChild(cardGenre);

    // Pages field with label
    const cardPagesContainer = document.createElement('div');
    cardPagesContainer.className = 'flex items-center gap-2';
    const pagesLabel = document.createElement('span');
    pagesLabel.className = 'font-bold';
    pagesLabel.textContent = 'Pages:';
    const cardPages = document.createElement('h2');
    cardPages.textContent = item.bookPages;
    cardPagesContainer.appendChild(pagesLabel);
    cardPagesContainer.appendChild(cardPages);

    // Read status container
    const readContainer = document.createElement('div');
    readContainer.className = 'flex gap-4';
    const readLabel = document.createElement('span');
    readLabel.className = 'font-bold';
    readLabel.textContent = 'Read?';
    const readToggle = document.createElement('input');
    readToggle.type = 'checkbox';
    readToggle.className = 'toggle';
    readToggle.checked = !!item.bookReadStatus;
    readToggle.onchange = function() {
        this.setAttribute('value', this.checked.toString());
        item.bookReadStatus = this.checked;
    };
    readContainer.appendChild(readLabel);
    readContainer.appendChild(readToggle);

    // Card actions (pushed to bottom)
    const cardActions = document.createElement('div');
    cardActions.className = 'card-actions justify-end mt-auto'; // Push to bottom

    const removeButton = document.createElement('button');
    removeButton.className = 'btn btn-primary';
    removeButton.textContent = 'Remove';
    removeButton.addEventListener('click', () => clearBook(card)); // Remove this card

    cardActions.appendChild(removeButton);
    cardBody.appendChild(cardTitleContainer);
    cardBody.appendChild(cardGenreContainer);
    cardBody.appendChild(cardPagesContainer);
    cardBody.appendChild(readContainer);
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
const inputPages = document.getElementById('formPages');
const inputTitle = document.getElementById('formTitle');
const inputGenre = document.getElementById('formGenre');
const inputReadStatus = document.getElementById('formReadStatus');
const modal = document.getElementById('my_modal_1');

// Form Validation Logic
function validateForm() {
    const isTitleFilled = inputTitle.value.trim() !== '';
    const isGenreFilled = inputGenre.value.trim() !== '';
    const isPagesFilled = inputPages.value.trim() !== '' && !isNaN(inputPages.value) && Number(inputPages.value) > 0;

    addBookBtn.disabled = !(isTitleFilled && isGenreFilled && isPagesFilled);
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    // Initial display
    displayBooks();

    // Form validation event listeners
    inputTitle.addEventListener('input', validateForm);
    inputGenre.addEventListener('input', validateForm);
    inputPages.addEventListener('input', validateForm);
    inputReadStatus.addEventListener('change', validateForm);

    // Reset form and button state when modal opens
    modal.addEventListener('show', () => {
        inputTitle.value = '';
        inputGenre.value = '';
        inputPages.value = '';
        inputReadStatus.checked = false;
        inputReadStatus.setAttribute('value', 'false');
        addBookBtn.disabled = true; // Disable button on modal open
    });

    // Add book submission
    addBookBtn.addEventListener('click', (e) => {
        e.preventDefault();
        if (!addBookBtn.disabled) { // Only proceed if button is enabled
            newbook = new book(inputTitle.value, inputGenre.value, inputPages.value, inputReadStatus.checked);
            addBookToLibrary();
            modal.close();
            addBooks();
        }
    });
});