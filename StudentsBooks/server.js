const express = require("express");
const books = require("./studentsBooks.js"); // Importing the JSON file
const app = express();
const port = 4000;

app.use(express.json()); // Middleware to parse JSON

app.get("/", (req, res) => {
  res.send("Hello, Welcome to the Students Books API!");
});

app.get("/books", (req, res) => {
  res.json({
    message: "List of books",
    data: books,
  });
});

app.get("/books/:id", (req, res) => {
  const bookId = req.params.id;
  const book = books.find((b) => b.id == bookId);
  if (book) {
    res.json({
      message: "book found",
      data: book,
    });
  } else {
    res.status(404).send("Book not found");
  }
});

app.post("/books",(req,res)=>{
    const newBook = req.body
    books.push(newBook);
    res.json({
        message: "Book added successfully",
        data: books,
    })
})


app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
