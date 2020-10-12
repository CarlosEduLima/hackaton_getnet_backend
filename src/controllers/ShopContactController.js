const Shop = require('../database/models/Shop')
const ShopContact = require('../database/models/ShopContact')
module.exports = {
    async index(req, res) {
        const { shop_id } = req.params;

        const contacts = await ShopContact.findAll({
            where: { shop_id: shop_id }
        });

        return res.status(200).json({ sucess: true, contacts })
    },
    async store(req, res, next) {
        try{
            const { shop_id } = req.params
            const { contact_name, value } = req.body
            if (!shop_id)
                return res.status(400).send({ error: 'Id não fornecido' })
            if (!await Shop.findOne({ where: { id: shop_id } }))
                return res.status(400).send({ error: 'Shop não encontrado' })
            await ShopContact.create({
                shop_id,
                contact_name,
                value
            })
            return res.json({ success: true, message: 'Contato adicionado' });
        }catch(e){
            return next(e)
        }
        
    }, 
    async delete(req, res, next) {
        try {
            const { contact_id } = req.params;

            if (!contact_id) return res.status(406).send({ success: false, message: 'ID não fornecido' });

            const contact = await ShopContact.findOne({ where: { id: contact_id } });

            if (!contact) return res.status(404).send({ success: false, message: 'contact não foi encontrado' });

            await contact.destroy();

            return res.json({ success: true, message: 'Contato deletado' });
        } catch (error) {
            return next(error)
        }

    },
    async update(req, res, next) {
        try {
            const { contact_id } = req.params;
            const { name, value } = req.body;
            if (!contact_id)
                return res.status(400).send({ success: false, message: "Nenhum ID fornecido" });

            const contact = await ShopContact.findOne({ where: { id: contact_id } });

            if (!contact)
                return res.status(404).send({ success: false, message: "contato inexistente" });

            await contact.update({ name, value })

            return res.json({ success: true, message: "Contact deleted"})
        } catch (error) {
            return next(error)
        }
    } 
}
