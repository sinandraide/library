let library = [];
const cardContainer = document.querySelector(".card-container");

function Book(title, author, pages, hasRead, genre) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.hasRead = hasRead;
  this.genre = genre;
  this.id = new Date().valueOf();
}

const renderBooks = (library) => {
  for (let book of library) {
    const card = document.createElement("div");
    card.className = "card";

    const title = document.createElement("p");
    title.innerText = book.title;
    title.className = "title";

    const author = document.createElement("p");
    author.innerText = "By: " + book.author;

    const pages = document.createElement("p");
    pages.innerText = "Pages: " + book.pages;

    const genre = document.createElement("p");
    genre.innerText = book.genre;

    const readBtn = document.createElement("button");
    readBtn.className = book.hasRead ? "btn read" : "btn read not";
    readBtn.innerText = book.hasRead ? "Read" : "Not Read";
    readBtn.onclick = _toggleRead;

    const deleteBtn = document.createElement("button");
    deleteBtn.className = "btn delete";
    deleteBtn.innerText = "Delete";
    deleteBtn.onclick = _deleteCard;

    const btnContainer = document.createElement("div");
    btnContainer.appendChild(readBtn);
    btnContainer.appendChild(deleteBtn);
    btnContainer.className = "btn-container";

    // append everyting to card
    card.appendChild(title);
    card.appendChild(author);
    card.appendChild(pages);
    card.appendChild(genre);
    card.appendChild(btnContainer);

    // append card to card container
    cardContainer.appendChild(card);
  }
};

const addBook = () => {
  cardContainer.innerHTML = "";
  renderBooks(library);
};

const _deleteCard = (e) => {
  const title = e.target.parentNode.parentNode.firstChild.innerText;
  library = library.filter((x) => x.title !== title);
  addBook(library);
};

const _toggleRead = (e) => {
  if (e.target.className === "btn read not") {
    e.target.className = "btn read";
    e.target.innerText = "Read";
  } else {
    e.target.className = "btn read not";
    e.target.innerText = "Not Read";
  }
};
const book1 = new Book("1984", "George Orwell", 84, true, "Dystopia");
const book2 = new Book(
  "Game of Thrones",
  "R. R. Martin",
  1023,
  false,
  "Fantasy"
);

library.push(book1, book2);
addBook(library);
