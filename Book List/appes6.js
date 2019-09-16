class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

class UI {
  addBookToList(book) {
    const list = document.getElementById("book-list");

    const row = document.createElement("tr");
    row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href=# class="delete">X</a></td>
    `;
    list.appendChild(row);
  }

  showAlert(message, className) {
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
  }
  deleteBook(target) {
    if (target.className === "delete") {
      target.parentElement.parentElement.remove();
    }
  }
  clearFields() {
    document.getElementById("title").value = "";
    document.getElementById("author").value = "";
    document.getElementById("isbn").value = "";
  }
}

class Store {
  static getBook() {
    let books;
    if (localStorage.getItem("books") === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem("books"));
    }
    return books;
  }
  static displayBook() {
    const books = Store.getBook();

    books.forEach(function(book) {
      const ui = new UI();
      ui.addBookToList(book);
    });
  }
  static saveBook(book) {
    const books = Store.getBook();
    books.push(book);
    localStorage.setItem("books", JSON.stringify(books));
  }
  static removeBook(isbn) {
    const books = Store.getBook();

    books.forEach(function(book, index) {
      if (book.isbn === isbn) {
        books.splice(index, 1);
      }
    });
    localStorage.setItem("books", JSON.stringify(books));
  }
}

// Event Listener DOMLoader
document.addEventListener("DOMContentLoaded", Store.displayBook);

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
    // Add to Local Storage
    Store.saveBook(book);
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
  Store.removeBook(e.target.parentElement.previousElementSibling.textContent);
  // Show alert
  ui.showAlert("Book removed", "success");

  e.preventDefault();
});
