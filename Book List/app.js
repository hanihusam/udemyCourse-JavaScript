// Book constructor
function Book(title, author, isbn) {
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}

// UI constructor
function UI() {}

// Add Book to List
UI.prototype.addBookToList = function(book) {
  const list = document.getElementById("book-list");

  const row = document.createElement("tr");
  row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href=# class="delete">X</a></td>
    `;
  list.appendChild(row);
};

// Show Alert
UI.prototype.showAlert = function(message, className) {
  // Create div
  const div = document.createElement("div");
  div.className = `alert ${className}`;
  div.appendChild(document.createTextNode(message));

  // Get container and book form
  const container = document.querySelector(".container");
  const form = document.querySelector("#book-form");

  // Add div element
  container.insertBefore(div, form);

  // setTimeout
  setTimeout(function() {
    document.querySelector(".alert").remove();
  }, 3000);
};

// Delete Book
UI.prototype.deleteBook = function(target) {
  if (target.className === "delete") {
    target.parentElement.parentElement.remove();
  }
};

// Clear Fields
UI.prototype.clearFields = function() {
  document.getElementById("title").value = "";
  document.getElementById("author").value = "";
  document.getElementById("isbn").value = "";
};

// Event Listener for add book
document.getElementById("book-form").addEventListener("submit", function(e) {
  e.preventDefault();

  // Get book value
  const title = document.getElementById("title").value,
    author = document.getElementById("author").value,
    isbn = document.getElementById("isbn").value;

  // Instatiate Book
  const book = new Book(title, author, isbn);

  // Instatiate UI
  const ui = new UI();

  // Validate
  if (title === "" || author === "" || isbn === "") {
    // Error alert
    ui.showAlert("Please fill the blank", "error");
  } else {
    // Add book to list
    ui.addBookToList(book);
    // Show alert
    ui.showAlert("Book added", "success");
    // Clear fields
    ui.clearFields();
  }
});

// Event listener for delete book
document.getElementById("book-list").addEventListener("click", function(e) {
  // Instatiate UI
  const ui = new UI();
  // Delete a book
  ui.deleteBook(e.target);
  // Show alert
  ui.showAlert("Book removed", "success");
});
