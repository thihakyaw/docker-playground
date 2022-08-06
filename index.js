const express = require("express");
const mongoose = require("mongoose");
const app = express();
const { MONGO_USERNAME, MONGO_PASSWORD, MONGO_IP, MONGO_PORT, REDIS_URL, REDIS_PORT, SESSION_SECRET } = require("./config/config");
const postRouter = require("./routes/post-routes");
const authRouter = require("./routes/auth-routes");
const session = require("express-session")
const { createClient } = require("redis");
const cors = require("cors");

let RedisStore = require("connect-redis")(session)

let redisClient = createClient({
    host: REDIS_URL,
    port: REDIS_PORT,
});

app.enable("trust proxy");
app.use(cors({}));
app.use(session({
    store: new RedisStore({ client: redisClient }),
    secret: SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    cookie: {
        secure: false,
        resave: true,
        httpOnly: true,
        maxAge: 30000,
    }
})
);

const mongoURL=`mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`
mongoose
    .connect(mongoURL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log("success"))
    .catch((e) => console.log(e));
app.use(express.json());

app.get("/api/v1", (req, res) => {
    res.send("<h1>Hi there. It is me. It is alpha 134.</h1>");
    console.log("Yes it ran");
})

app.use("/api/v1/posts", postRouter);
app.use("/api/v1/auth", authRouter);

const port = process.env.PORT || 30000;

app.listen(port, () => console.log(`listening to port ${port}`));