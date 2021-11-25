const express = require("express");

const book = require("./book.json");

const app = express();

app.use(express.json())


const logger = (req, res, next) => {
    req.name = 'Moneer Ashraf'
    next();
}

app.use(logger);

app.get("/", (req, res) => {
    res.send({"api_requested_by":req.name,book});
})

app.post("/books/", (req, res) => {
    const newbook = [...book, req.body]
    res.send(newbook)
})

app.get("/books/:id", (req, res) => {
    const books = book.filter((books) => books.id === Number(req.params.id))

    res.send({"api_requested_by":req.name,books});

})


app.patch("/books/:id", (req, res) => {
    const newbook = book.map((user) => {
        if (req.params.id == user.id) {

            if (req?.body?.Book_name) {
                user.Book_name = req.body.Book_name
            };
            if (req?.body?.Author) {
                user.Author = req.body.Author
            };
            if (req?.body?.id) {
                user.id = Number(req.body.id)
            };
            if (req?.body?.Year) {
                user.Year = Number(req.body.Year)
            };
            if (req?.body?.Pages) {
                user.Pages = req.body.Pages
            };
        }
        return user
    })
    res.send(newbook)
})


app.delete("/books/:id", (req, res) => {
    const newbook = book.filter((user) => user.id !== Number(req.params.id))
    res.send(newbook)
})


app.listen(2345, function () {
    console.log("listening on port 2345")
})