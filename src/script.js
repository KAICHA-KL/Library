const mylibrary = [];

function book(title,genre,pages,readStatus){
 this.bookTitle = title;
 this.bookGenre = genre;
 this.bookPages = pages;
 this.bookReadStatus = readStatus
}

// src/script.js
console.log("Script loaded successfully!"); 

function addBookToLibrary() { 

}

const addBookBtn = document.querySelector('.submitBtn');
const inputPages = document.getElementById('formPages');
const inputTitle = document.getElementById('formTitle');
const inputGenre = document.getElementById('formGenre');
const inputReadStatus = document.getElementById('formReadStatus');
const modal = document.getElementById('my_modal_1');

addBookBtn.addEventListener('click',(e)=>{

    e.preventDefault();
    let newbook = new book(inputTitle.value,inputGenre.value,inputPages.value,inputReadStatus.checked);
    alert(newbook.bookReadStatus);

    modal.close();
});