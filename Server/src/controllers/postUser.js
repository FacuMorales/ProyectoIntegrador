const {User} = require("../DB_connection");

const postUser = async (req, res) => {
    const {email, password} = req.body;
    if (email && password){
        try {
            const [newUser, created] = await User.findOrCreate({
                where: {email},
                defaults: {password}
            });
            // if (!created) {
            //     return res.status(400).send("El usuario ya existe");
            // }
            return res.status(200).json(newUser);
        } catch (error) {
            return res.status(500).json({error: error.message});
        }
    }else return res.status(400).send("Faltan datos");
};

module.exports = postUser;