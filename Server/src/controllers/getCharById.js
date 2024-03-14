const URL = `https://rickandmortyapi.com/api/character/`;
const axios = require("axios");

const getCharById = async (req, res) => {
    const {id} = req.params;
    try {
        const {data} = await axios(URL + `${id}`);
        const char = {
            id: data.id,
            name: data.name,
            gender: data.gender,
            species: data.species,
            origin: data.origin,
            image: data.image,
            status: data.status
        };
        if(data) return res.json(char);
        else return res.status(404).send("Not fount");
    } catch (error) {
        return res.status(500).json({error : error.message});
    }
}

module.exports = getCharById;