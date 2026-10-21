export default class OrdemController {

    async createOrdem(req, res) {
        const { name, description, status, user, product, price } = req.body;
        try {
            const ordem = await Ordem.create({ name, description, status, user, product, price });
            res.status(201).json(ordem);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async getOrdens(req, res) {
        try {
            const ordens = await Ordem.find();
            res.status(200).json(ordens);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async getOrdemById(req, res) {
        const { id } = req.params;
        try {
            const ordem = await Ordem.findById(id);
            res.status(200).json(ordem);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async updateOrdem(req, res) {
        const { id } = req.params;
        const { name, description, status, user, product, price } = req.body;
        try {
            const ordem = await Ordem.findByIdAndUpdate(id, { name, description, status, user, product, price }, { new: true });
            res.status(200).json(ordem);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async deleteOrdem(req, res) {
        const { id } = req.params;
        try {
            await Ordem.findByIdAndDelete(id);
            res.status(200).json({ message: "Ordem deleted successfully" });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async getOrdenByStatus(req, res) {
        const { status } = req.params;
        try {
            const ordens = await Ordem.find({ status });
            res.status(200).json(ordens);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

}