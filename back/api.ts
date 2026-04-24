import express, { json } from "express";
import { Article, NewArticle } from "./types/article";
import { randomUUID } from "crypto";

export const api = express.Router();

let articles: Article[] = [
    { id: "a1", name: "Tournevis", price: 10.99, qty: 456 },
    { id: "a2", name: "Pelle", price: 4.99, qty: 12 },
    { id: "a3", name: "Marteau", price: 8.99, qty: 23 },
];

api.get("/articles", (req, res) => {
    res.json(articles);
});

api.post("/articles", json(), (req, res) => {
    const newArticle: NewArticle = req.body;
    if (newArticle.name === "Crotte") {
        res.status(400).end();
        return;
    }
    articles.push({ id: randomUUID(), ...newArticle });
    res.status(201).end();
});

api.delete("/articles", json(), (req, res) => {
    const ids: string[] = req.body;
    articles = articles.filter((a) => !ids.includes(a.id));
    res.status(204).end();
});
