const express = require("express");
const dotenv = require("dotenv");
const authRoutes = require("./routes/auth.route");
const messageRoutes = require("./routes/message.route");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require("path");

const connectDB = require("./lib/db");

const { app, server, io } = require("./lib/socket");

dotenv.config();

const port = process.env.PORT;
const __dirname = path.resolve();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../../frontend/dist", "index.html"));
  });
}

server.listen(port, () => {
  console.log(`server is running in port ${port}`);
  connectDB();
});
