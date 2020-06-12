const express = require("express");

const connectDB = require("./config/connectDB");

const usersRoute = require("./routes/user");
const contactsRoute = require("./routes/contacts");
const authRoute = require("./routes/auth");

const app = express();

connectDB();

app.use(express.json({ extended: false }));

app.use("/api/users", usersRoute);
app.use("/api/contacts", contactsRoute);
app.use("/api/auth", authRoute);

// Serve static assets in production
if (process.env.NODE_ENV === "production") {
  // Set static folder path
  app.use(express.static("client/build"));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "client", "build", index.html))
  );
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on ${PORT}`));
