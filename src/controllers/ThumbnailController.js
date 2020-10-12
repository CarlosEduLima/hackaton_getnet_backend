const Shop = require('../database/models/Shop');
const aws = require("aws-sdk");
const { store } = require('./PostController');
const s3 = new aws.S3();
module.exports={
    async update(req, res, next) {
        try{
            const { id } = req.params;
            const { key, location: url = "" } = req.file;
            if (!id) return res.status(406).send({ success: false, message: 'ID do estabelecimento não fornecido' });
    
            const shop = await Shop.findOne({ where: { id } });
    
            if (!shop)
                return res.status(404).send({ success: false, message: 'Estabelecimento não encontrado' });
    
            const params = {
                Bucket: 'pricebuddy/shopProfileImgs',
                Key: shop.profile_image_key
            };
    
            await s3.deleteObject(params, function (err, data) {
                if (err) console.log(err, err.stack);
                else console.log(data);
            });
            await shop.update({ thumbnail_key: key, thumbnail_url: url })
            return res.json({ success: true, message: 'Foto atualizada com sucesso' });
        }catch(e){
            return next(`Erro ao atualizar thumnail: ${e}`)
        }
    },
    async store(req, res, next) {
        try{
            const { id } = req.params;
            const { key, location: url = "" } = req.file;
            if (!id) return res.status(406).send({ success: false, message: 'ID do estabelecimento não fornecido' });
    
            const shop = await Shop.findOne({ where: { id } });
    
            if (!shop)
                return res.status(404).send({ success: false, message: 'Estabelecimento não encontrado' });
    
            await shop.update({ thumbnail_key: key, thumbnail_url: url })
                
            res.status(200).json({ success: true, message: 'Foto de perfil adicionada com sucesso' });
        }catch(e){
            return next(`Erro ao adicionar thumnail: ${e}`)
        }
        
    }
}