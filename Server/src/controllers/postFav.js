const {Favorite} = require("../DB_connection");

const postFav = async (req,res) => {
    const {name, origin, status, image, species, gender} = req.body;
    if (name && origin && status && image && species && gender){
        try {
            const [newFavorite, created] = await Favorite.findOrCreate({
                where: {name},
                defaults: {origin, status, image, species, gender}
            });
            // if (!created) {
            //     return res.status(400).send("El favorito ya existe");
            // }
            const favorites = await Favorite.findAll();
            return res.status(200).json(favorites);
        } catch (error) {
            return res.status(500).json({error: error.message});
        }
    }else return res.status(401).send("Faltan datos");
};

module.exports = postFav;