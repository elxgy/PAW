const express = require('express');
const router = express.Router();
const Message = require('../models/Mensagem');

function messageRouter() {
    router.post('/', async (req, res) => {
        try {
            const message = new Message(req.body);
            await message.save();
            res.status(201).json(message);
        } catch (error) {
            res.status(400).json({ error: 'Erro ao criar mensagem' });
        }
    });

    router.get('/', async (req, res) => {
        try {
            const messages = await Message.find();
            res.json(messages);
        } catch (error) {
            res.status(500).json({ error: 'Erro ao buscar mensagens' });
        }
    });

    router.get('/:id', async (req, res) => {
        try {
            const message = await Message.findById(req.params.id);
            res.json(message);
        } catch (error) {
            res.status(404).json({ error: 'Mensagem não encontrada' });
        }
    });

    router.put('/:id', async (req, res) => {
        try {
            const message = await Message.findByIdAndUpdate(req.params.id, req.body, { new: true });
            res.json(message);
        } catch (error) {
            res.status(404).json({ error: 'Mensagem não encontrada' });
        }
    });

    router.delete('/:id', async (req, res) => {
        try {
            await Message.findByIdAndDelete(req.params.id); 
            res.status(204).json({ message: 'Mensagem deletada com sucesso' });
        } catch (error) {
            res.status(404).json({ error: 'Mensagem não encontrada' });
        }
    });

    return router;
}

module.exports = messageRouter;