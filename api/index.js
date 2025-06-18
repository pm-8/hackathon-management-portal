const express = require('express');
const cors = require("cors");
const app = express();
require('dotenv').config();
const authRoutes = require('./routes/auth')
const teamRoutes = require('./routes/team')
const githubRoutes = require('./routes/githubRoutes');
app.use(express.json());
const allowedOrigins = ["http://localhost:5173","http://localhost:3000"];

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

app.use(session({
    secret: process.env.SECRET_KEY || 'secret',
    resave: false,
    saveUninitialized: true,
}));
app.use(passport.initialize());
app.use(passport.session());

app.use("/auth",authRoutes);
app.use("/team",teamRoutes);
app.use("/api",githubRoutes);
app.listen(process.env.PORT, () => {
    console.log(`http://localhost:${process.env.PORT}`);
    }
);