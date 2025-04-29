const express = require("express");
const { dbConnect } = require("./config/db");
const  userRoutes  = require("./routes/user.routes");
const  taskRoutes  = require("./routes/task.routes");
const cors = require("cors");
const app = express();
require("dotenv").config();

// Configure CORS
app.use(cors({
  origin: ["http://localhost:5173", "https://management-application-sigma.vercel.app/"],
  credentials: true
}));

app.use(express.json());

app.use("/api/user", userRoutes);
app.use("/api/task", taskRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  dbConnect();
  console.log(`Server is running on port ${PORT}`);
});
