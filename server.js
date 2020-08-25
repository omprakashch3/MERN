const express = require("express");
const app = express();
const connectDB = require("./config/db");

//connect database
connectDB();

const port = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send(`API running`);
});

//define routes
app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/post", require("./routes/api/posts"));
app.use("/api/profile", require("./routes/api/profile"));

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
