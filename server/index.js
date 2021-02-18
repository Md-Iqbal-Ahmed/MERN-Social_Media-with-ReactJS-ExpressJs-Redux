import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";

import postRouter from "./routes/post.js";
import userRouter from "./routes/user.js";

const app = express();

app.use(cors());

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

app.use("/posts", postRouter);
app.use("/users", userRouter);

app.get("/", function (req, res) {
  res.send("Welcome to the I Network");
});

const CONNECTION_URL =
  "mongodb+srv://iiqbalahmed:Iqbal1211@cluster0.6epha.mongodb.net/<dbname>?retryWrites=true&w=majority";

const PORT = process.env.PORT || 5000;

mongoose
  .connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, console.log(`Server runs on port: ${PORT}`)))
  .catch((err) => console.log(err));

mongoose.set("useFindAndModify", false);
