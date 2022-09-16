const express = require("express");
const cors = require("cors");
const authRouter = require("./routers/auth");
const teamRouter = require("./routers/teams")

const {PORT} = require("./config/constants");

const app = express();
app.use(cors());

app.use(express.json());
app.use("/auth",authRouter);
app.use(teamRouter);

app.listen(PORT,()=>{
    console.log(`Listening tp ${PORT}`)
})