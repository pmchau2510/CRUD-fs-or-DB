const express = require("express");
// const connectDB = require("./config/db");
const { PORT } = require("./config");
const userRouters = require("./routers/userRouters");
const catchError = require("./middlewares/error");
const app = express();

app.use(express.json());
// connectDB();

//router
app.use("/user", userRouters);

app.use(catchError);


app.listen(PORT, () => {
    console.log(`Server is runnig on port ${PORT}`);
});
module.exports = app;



