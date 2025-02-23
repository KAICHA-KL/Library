const mylibrary = [];
let newbook ={};

//book constructor//
function book(title,genre,pages,readStatus){
 this.bookTitle = title;
 this.bookGenre = genre;
 this.bookPages = pages;
 this.bookReadStatus = readStatus
}

function addBookToLibrary() { 
mylibrary.push(newbook);
}

function createCard(item) {

    //Create card container 

  const card = document.createElement('div');
  card.className = 'card bg-base-100 shadow-xl min-w-fit';

  const cardBody = document.createElement('div');
  cardBody.className = 'card-body';

  const cardTitle = document.createElement('h2');
  cardTitle.className = 'card-title';
  cardTitle.textContent = item.bookTitle;

  cardBody.append(cardTitle);
  card.append(cardBody);

  return card;

}

function addBooks() {

    const container = document.getElementById('card-container');
    const len = mylibrary.length;
    container.appendChild(createCard(mylibrary[len -1]));
    }

function displayBooks() {

const container = document.getElementById('card-container');
const fragment = document.createDocumentFragment();

mylibrary.forEach(item =>{
    fragment.appendChild(createCard(item));
});

container.appendChild(fragment);
}

function clearBooks(){
    const container = document.getElementById('toDelete');
    container.remove();
}


const addBookBtn = document.querySelector('.submitBtn');
const removeBookBtn = document.querySelector('.removeBtn')
const inputPages = document.getElementById('formPages');
const inputTitle = document.getElementById('formTitle');
const inputGenre = document.getElementById('formGenre');
const inputReadStatus = document.getElementById('formReadStatus');
const modal = document.getElementById('my_modal_1');

addBookBtn.addEventListener('click',(e)=>{

    e.preventDefault();
    newbook = new book(inputTitle.value,inputGenre.value,inputPages.value,inputReadStatus.checked);
    addBookToLibrary();
    modal.close();
    //clearBooks();
    addBooks();

});

removeBookBtn.addEventListener('click',(e)=>{
    
})


displayBooks();