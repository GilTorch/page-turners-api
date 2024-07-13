const jwt = require('jsonwebtoken');
const { generateAccessToken } = require('../../utils/auth');
const { getObjectionJSON } = require('../../utils')
const { Users, RefreshTokens } = require('../../models');

const refreshToken = (req, res) => {
    const refreshToken = req.body.token
    if (refreshToken == null) return res.sendStatus(401);
    // TODO: Checkout that refresh tokens exists in `refresh_tokens` table
    if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403);
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        const accessToken = generateAccessToken({ name: user.name });
        res.json({ accessToken: accessToken })
    })
}

const deleteRefreshToken = (req,res) => {

    // delete token in database

    return res.sendStatus(204);

}

const signup = async (req, res) => {
    // get values
    try {

        const email = req.body.email;
        const firstName = req.body.firstName;
        const lastName = req.body.lastName;
        const username = req.body.username;
        const password = req.body.password;
        const address = req.body.address;
        const birthday = req.body.birthday;
        const gender = req.body.gender;
        
        const payload = {
            email, 
            password, 
            username, 
            address,
            firstName,
            lastName,
            birthday, 
            gender,
        }

        const user = Users.query().insert({
            ...payload
        })

        if(user) {
            res.status(200).json({message: 'User created successfully'})
        } else{
            res.status(500).json({ message: 'Something unexpected happened while creating user'});
        }

    } catch(e){
        throw new Error(e);
    }
    

}

const login = async (req, res) => {
    try {

        const email = req.body.email;
        const password = req.body.password;
        
        const user = await Users.query().findOne({ email: email, password: password });

        
        if(!user) return res.status(404).json({ message: 'User not found'});

        if(user.length <= 0) return res.sendStatus(401);
        console.log('3', email, password);
        const parsedUser = getObjectionJSON(user);

        console.log('SUER')
        const accessToken = generateAccessToken(parsedUser)
        console.log('access token',accessToken);
        const refreshToken = jwt.sign(parsedUser, process.env.REFRESH_TOKEN_SECRET);
        //TODO: Insert refresh token in database
        await RefreshTokens.query().insert({
            refresh_token: refreshToken
        })
        
        console.log('5', email, password);
        req.user = user;
        res.json({ accessToken: accessToken, refreshToken: refreshToken })

    }catch(e){
        console.log('Error', e);
        res.sendStatus(401);
    }
    


}

module.exports = {
    refreshToken,
    deleteRefreshToken,
    login,
    signup
}