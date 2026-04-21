import express from "express";

console.log("Starting ' server...");

const app = express();

app.get("/", (req, res) => {
    res.send("Hello World");
});

app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});

console.log("rtrtrt")[1].map((x) => x + 1);
