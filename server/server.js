require("dotenv").config();
const express = require("express");
const dbConnect = require("./config/dbConnect");
const cors = require("cors");
const deviceRoutes = require("./routes/deviceRoutes");

// express app
const app = express();

// connect to db
dbConnect();

app.use(express.json());
app.use(cors());

// routes
app.use("/api/devices", deviceRoutes);

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}...`));
