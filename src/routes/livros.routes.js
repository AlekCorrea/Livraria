const express = require("express");
const router = express.Router();
const LivrosController = require("../controllers/livros.controller");
const livrosController = new LivrosController();

// Rotas sem middlewares
router.get("/", livrosController.listarLivros.bind(livrosController));
router.get("/:id", livrosController.buscarLivroPorId.bind(livrosController));
router.post("/", livrosController.criarLivro.bind(livrosController));
router.put("/:id", livrosController.atualizarLivro.bind(livrosController));
router.delete("/:id", livrosController.removerLivro.bind(livrosController));

module.exports = router;
