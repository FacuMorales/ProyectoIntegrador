let myFavorites = [];

function postFav (req, res) {
    myFavorites.push(req.body);
    res.json(myFavorites);
}

function deleteFav (req, res) {
    const {id} = req.params;
    let newFavs = myFavorites.filter((pj) => pj.id!==Number(id));
    myFavorites = newFavs;
    res.json(myFavorites);
}

module.exports = {postFav, deleteFav};