const express = require('express');
const cors = require("cors");
const app = express();
require('dotenv').config();
const authRoutes = require('./routes/auth')
const teamRoutes = require('./routes/team')
app.use(express.json());
const allowedOrigins = ["http://localhost:5173", "http://localhost:3000"];

app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true,
}));


app.use("/auth",authRoutes);
app.use("/team",teamRoutes);
app.listen(process.env.PORT, () => {
    console.log(`http://localhost:${process.env.PORT}`);
    }
);