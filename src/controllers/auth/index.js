const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { generateAccessToken } = require('../../utils/auth');
const { getObjectionJSON } = require('../../utils')
const { Users, RefreshTokens } = require('../../models');
const { MESSAGE } = require('../../utils/constants');


const refreshToken = async (req, res) => {
    try {
        const refreshToken = req.body.token

        if (refreshToken == null) return res.sendStatus(401);        
        const storedRefreshToken = await RefreshTokens.query().findOne({ refresh_token: refreshToken});

        if (!storedRefreshToken) return res.sendStatus(403);

        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
            if (err) return res.sendStatus(403);
            const accessToken = generateAccessToken({ name: user.name });
            res.json({ accessToken: accessToken })
        })
    }catch(e) {
        console.log('Error', e);
        return res.status(500).json({ message: new Error(e).message});
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
        return res.status(500).json({ message: new Error(e).message });
    }

}

const signup = async (req, res) => {
    // get values
    try {

        const email = req.body.email;
        const first_name = req.body.first_name;
        const last_name = req.body.last_name;
        const username = req.body.username;
        const password = req.body.password;
        const address = req.body.address;
        const birthday = req.body.birthday;
        const gender = req.body.gender;

        const saltRounds = 10;
        let hashedPassword = await bcrypt.hash(password, saltRounds);

        
        const payload = {
            email, 
            password: hashedPassword, 
            username, 
            address,
            first_name,
            last_name,
            birthday, 
            gender
        }

        const user = await Users.query().insert({
            ...payload
        })


        if(user) {
            res.status(200).json({message: 'User created successfully'})
        } else{
            res.status(500).json({ message: MESSAGE.UNEXPECTED});
        }

    } catch(e){
        return res.status(500).json({ message: new Error(e).message });
    }
    

}

const login = async (req, res) => {
    try {

        const email = req.body.email;
        const password = req.body.password;

        const user = await Users.query().findOne({ email: email });
        const parsedUser = getObjectionJSON(user);

        const isPasswordCorrect = await bcrypt.compare(password, parsedUser.password);

        if(!isPasswordCorrect) {
            return res.status(400).json({ message: 'Password is incorrect'});
        }

        
        if(!user) return res.status(404).json({ message: 'User not found'});

        if(user.length <= 0) return res.sendStatus(401);

        const accessToken = generateAccessToken(parsedUser)
        const refreshToken = jwt.sign(parsedUser, process.env.REFRESH_TOKEN_SECRET);
        await RefreshTokens.query().insert({
            refresh_token: refreshToken
        })
        req.user = user;
        res.json({ accessToken: accessToken, refreshToken: refreshToken })

    }catch(e){
        res.status(500).json({ message: new Error(e).message } );
    }
    


}

module.exports = {
    refreshToken,
    deleteRefreshToken,
    login,
    signup
}