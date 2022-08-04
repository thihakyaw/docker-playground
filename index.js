const express = require("express");
const mongoose = require("mongoose");
const app = express();
const { MONGO_USERNAME, MONGO_PASSWORD, MONGO_IP, MONGO_PORT } = require("./config/config");
const postRouter = require("./routes/post-routes");
const authRouter = require("./routes/auth-routes");

const mongoURL=`mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`
mongoose
    .connect(mongoURL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log("success"))
    .catch((e) => console.log(e));

app.use(express.json());

app.get("/", (req, res) => {
    res.send("<h1>Hi there. It is me thihap.</h1>")
})

app.use("/api/v1/posts", postRouter);
app.use("/api/v1/auth", authRouter);

const port = process.env.PORT || 30000;

app.listen(port, () => console.log(`listening to port ${port}`));