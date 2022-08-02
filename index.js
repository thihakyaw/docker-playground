const express = require("express");

const app = express();

app.get("/", (req, res) => {
    res.send("<h1>Hi there. It is me thiha 12345.</h1>")
})

const port = process.env.PORT || 30000;

app.listen(port, () => console.log(`listening to port ${port}`));