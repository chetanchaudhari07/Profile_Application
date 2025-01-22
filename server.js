const express = require("express");
const morgan = require("morgan");
const dotenv = require("dotenv");
const MySqlPool = require("./config/db");
const UserRoute = require('./routes/user');

dotenv.config();

const app = express();

app.use(morgan("dev"));
app.use(express.json());

const PORT = process.env.PORT;

app.get('/', async (req, res) => {
    res.status(200).send('ok');
});

app.use("/api", UserRoute);

MySqlPool.query('SELECT 1').then(() => {

    console.log("Mysql DataBase is Connected")

    app.listen(PORT, () => {
        console.log(`srver is running on ${PORT}`)
    });

}).catch((error) => {
    console.log(error);
});



