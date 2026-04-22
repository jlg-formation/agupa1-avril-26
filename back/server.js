import express from "express";

console.log("Starting ' server...");

const a = 12;

const app = express();

app.get("/", (req, res) => {
    if (req === res) {
        throw new Error("oups");
    }
    res.send("Hello World");
});

app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});
