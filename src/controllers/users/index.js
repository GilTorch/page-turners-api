const Users = require('../../models/Users');


const getUsers = async (req, res) => {

    const users = await Users.query().fromRaw('select * from users');

    res.json(users);
}

module.exports = {
    getUsers,
}