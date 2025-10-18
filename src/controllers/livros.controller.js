// src/controllers/livros.controller.js
const LivrosRepository = require("../repositories/livros.repository");
const Livro = require("../models/livro.model");

class LivrosController {
    constructor() {
        this.livrosRepo = new LivrosRepository();
    }

    async listarLivros(req, res) {
        try {
            const livros = await this.livrosRepo.findAll();
            res.json(livros.map(l => l.toJSON()));
        } catch (error) {
            res.status(error.statusCode || 500).json({ erro: error.message });
        }
    }

    async buscarLivroPorId(req, res) {
        try {
            const id = parseInt(req.params.id, 10);
            const livro = await this.livrosRepo.findById(id);
            if (!livro) {
                return res.status(404).json({ erro: "Livro não encontrado" });
            }
            res.json(livro.toJSON());
        } catch (error) {
            res.status(error.statusCode || 500).json({ erro: error.message });
        }
    }

    async criarLivro(req, res) {
        try {
            const novoLivro = await this.livrosRepo.create(req.body);
            res.status(201).json(novoLivro.toJSON());
        } catch (error) {
            res.status(error.statusCode || 500).json({ erro: error.message, detalhes: error.details || null });
        }
    }

    async atualizarLivro(req, res) {
        try {
            const id = parseInt(req.params.id, 10);
            const livroAtualizado = await this.livrosRepo.update(id, req.body);
            res.json(livroAtualizado.toJSON());
        } catch (error) {
            res.status(error.statusCode || 500).json({ erro: error.message, detalhes: error.details || null });
        }
    }

    async removerLivro(req, res) {
        try {
            const id = parseInt(req.params.id, 10);
            const livroRemovido = await this.livrosRepo.delete(id);
            res.json({ mensagem: "Livro removido com sucesso", livro: livroRemovido.toJSON() });
        } catch (error) {
            res.status(error.statusCode || 500).json({ erro: error.message });
        }
    }
}

module.exports = LivrosController;
