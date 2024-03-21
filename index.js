const express = require("express");
const connectDB = require("./database/connection");
const cors = require("cors");
const bodyParser = require("body-parser");
const apiRoutes = require("./routes/api");
const authRoutes = require("./routes/authRoute");

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

connectDB();

app.use("/api", apiRoutes);
app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
