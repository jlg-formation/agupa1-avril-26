import express from "express";
import { Article } from "./types/article";

export const api = express.Router();

const articles: Article[] = [
    { id: "a1", name: "Tournevis", price: 10.99, qty: 456 },
    { id: "a2", name: "Pelle", price: 4.99, qty: 12 },
    { id: "a3", name: "Marteau", price: 8.99, qty: 23 },
];

api.get("/articles", (req, res) => {
    res.json(articles);
});
