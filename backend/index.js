const express = require("express");
const cors = require("cors");
const app = express();
// our enviroment variable in the dot emv file
const dotenv = require("dotenv").config();
//create our express server .the port that theserver will be on
const port = process.env.PORT;

app.use(cors({ credentials: true, origin: "http://localhost:5173" }));
app.use(express.json({ limit: "30mb", extended: true }));
const connectDB = require("./config/db");
connectDB();
const userRoutes = require("./router/userRout.js");
const taskRoutes = require("./router/taskRoute");

app.use("/api/users", userRoutes);
app.use("/api/task", taskRoutes);

//start server function
app.listen(port, () => {
  console.log(`Application running on port ${port}`);
});
