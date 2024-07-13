const jwt = require('jsonwebtoken');
const { generateAccessToken } = require('../../utils/auth');
const { getObjectionJSON } = require('../../utils')
const { Users, RefreshTokens } = require('../../models');

const refreshToken = async (req, res) => {
    try {
        const refreshToken = req.body.token

        if (refreshToken == null) return res.sendStatus(401);
        // TODO: Checkout that refresh tokens exists in `refresh_tokens` table
        
        const storedRefreshToken = await RefreshTokens.query().findOne({ refresh_token: refreshToken});

        if (!storedRefreshToken) return res.sendStatus(403);

        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
            if (err) return res.sendStatus(403);
            const accessToken = generateAccessToken({ name: user.name });
            res.json({ accessToken: accessToken })
        })
    }catch(e) {
        console.log('Error', e);
        return res.status(500).json({ message: "Something unexpected happened"});
    }
   
}

const deleteRefreshToken = async (req,res) => {

    
    try {
        // delete token in database

        const result = await RefreshTokens.query().findOne({ refresh_token: req.body.token }).delete();

        if(result === 1){
            return res.status(200).json({ message: "Successfully deleted refresh token "});
        } else {
            return res.status(200).json({ message: "Token not in database"})
        }


    }catch(e){
        return res.status(500).json({ message: "Something unexpected happened" });
    }

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
        const parsedUser = getObjectionJSON(user);
        const accessToken = generateAccessToken(parsedUser)
        const refreshToken = jwt.sign(parsedUser, process.env.REFRESH_TOKEN_SECRET);
        //TODO: Insert refresh token in database
        await RefreshTokens.query().insert({
            refresh_token: refreshToken
        })
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