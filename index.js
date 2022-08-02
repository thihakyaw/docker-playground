const express = require("express");

const app = express();

app.get("/", (req, res) => {
    res.send("<h1>Hi there. It is me thihap.</h1>")
})

const port = process.env.PORT || 30000;

app.listen(port, () => console.log(`listening to port ${port}`));