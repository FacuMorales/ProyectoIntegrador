const {User} = require("../DB_connection");

const login = async (req, res) => {
    const {email, password} = req.query;
    if (email && password){
        try {
            const user = await User.findOne({where: {email}});
            if(!user) return res.status(404).send("Usuario no encontrado");
            if(password !== user.password) return res.status(403).send("Contraseña incorrecta");
            return res.status(200).json({access: true});
        } catch (error) {
            return res.status(500).json({error: error.message});
        }
    }else return res.status(400).send("Faltan datos");
};

module.exports = login;