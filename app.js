const express = require("express");

const users = require("./users.json");

const app = express();

app.use(express.json())






app.get("/", (req, res) => {
    res.send(users);
})

app.post("/books/", (req, res) => {
    const newUsers = [...users, req.body]
    res.send(newUsers)
})

app.get("/books/:id", (req, res) => {
    const user = users.filter((user) => user.id === Number(req.params.id))

    res.send(user);
})


app.patch("/books/:id", (req, res) => {
    const newUsers = users.map((user) => {
        if (req.params.id == user.id) {

            // optional chaining , null safety
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
    res.send(newUsers)
})


app.delete("/books/:id", (req, res) => {
    const newUsers = users.filter((user) => user.id !== Number(req.params.id))
    res.send(newUsers)
})




app.listen(2345, function () {
    console.log("listening on port 2345")
})