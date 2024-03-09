let library = [];
const cardContainer = document.querySelector(".card-container");
const masterContainer = document.querySelector(".master-container");
const btnAddBook = document.querySelector(".btn.add");

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

const createNewBook = () => {
  _spawnCard();
};

/**
 *
 * renders modal with form
 */
const _spawnCard = () => {
  const modal = document.createElement("div");
  modal.className = "modal";

  const container = document.createElement("div");
  container.className = "container";

  const form = document.createElement("form");
  const h1 = document.createElement("h1");
  h1.textContent = "Add Book";

  const formGrid = document.createElement("div");
  formGrid.className = "form-grid";

  const titleDiv = document.createElement("div");
  const authorDiv = document.createElement("div");
  const pageDiv = document.createElement("div");
  const genreDiv = document.createElement("div");

  const titleInput = document.createElement("input");
  const authorInput = document.createElement("input");
  const pageInput = document.createElement("input");
  pageInput.type = "number";
  const genreInput = document.createElement("input");

  titleInput.required = true;
  authorInput.required = true;
  pageInput.required = true;
  genreInput.required = true;

  // add name to json
  titleInput.name = "title";
  authorInput.name = "author";
  pageInput.name = "pages";
  genreInput.name = "genre";

  titleInput.id = "title";
  authorInput.id = "author";
  pageInput.id = "pages";
  genreInput.id = "genre";
  const titleLabel = document.createElement("label");
  const authorLabel = document.createElement("label");
  const pageLabel = document.createElement("label");
  const genreLabel = document.createElement("label");

  titleLabel.textContent = "Title";
  authorLabel.textContent = "Author";
  pageLabel.textContent = "Pages";
  genreLabel.textContent = "Genre";

  const btn = document.createElement("button");
  btn.className = "btn submit";
  btn.textContent = "Add";

  // trigger form submit button
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    console.log(formData);

    book = new Book(
      formData.get("title"),
      formData.get("author"),
      formData.get("pages"),
      false,
      formData.get("genre")
    );
    library.push(book);
    addBook();

    //remove modal
    document.body.removeChild(modal);
  });

  // add elements to divs for grid
  titleDiv.appendChild(titleLabel);
  titleDiv.appendChild(titleInput);
  authorDiv.appendChild(authorLabel);
  authorDiv.appendChild(authorInput);
  pageDiv.appendChild(pageLabel);
  pageDiv.appendChild(pageInput);
  genreDiv.appendChild(genreLabel);
  genreDiv.appendChild(genreInput);
  //add elements to form-grid
  formGrid.appendChild(titleDiv);
  formGrid.appendChild(authorDiv);
  formGrid.appendChild(pageDiv);
  formGrid.appendChild(genreDiv);

  form.appendChild(h1);
  form.appendChild(formGrid);
  form.appendChild(btn);

  container.appendChild(form);
  modal.appendChild(container);

  window.addEventListener("click", function (event) {
    if (event.target == modal) {
      document.body.removeChild(modal);
    }
  });
  document.body.insertBefore(modal, masterContainer);
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
btnAddBook.addEventListener("click", createNewBook);
addBook(library);
