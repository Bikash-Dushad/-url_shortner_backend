const express = require("express");
const dotenv = require("dotenv");
const app = express();
const connectDB = require("./config/db");
const PORT = process.env.PORT || 8000;
dotenv.config();
const routes = require("./routes");

app.get("/health", async (req, res) => {
  res.send("Ok");
});

app.use(express.json());

routes.forEach(({ path, router }) => {
  app.use(`/${path}`, router);
});

connectDB()
  .then(() => {
    console.log("Connected to mongodb");
    app.listen(PORT, () => {
      console.log(`server is running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.log("failed to connect to mongodb", error);
  });
