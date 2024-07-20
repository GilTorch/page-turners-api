const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const { generateAccessToken } = require('../../utils/auth');
const { getObjectionJSON } = require('../../utils')
const { Users, RefreshTokens } = require('../../models');
const { MESSAGE } = require('../../utils/constants');
const sendEmail = require('../../utils/sendMail');


const refreshToken = async (req, res) => {
    try {
        const refreshToken = req.body.token

        if (refreshToken == null) return res.sendStatus(401);        
        const storedRefreshToken = await RefreshTokens.query().findOne({ refresh_token: refreshToken});

        if (!storedRefreshToken) return res.sendStatus(403);

        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
            if (err) return res.sendStatus(403);
            const accessToken = generateAccessToken(user);
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
        const socialFieldName = req.body.social_account_field_name;
        const socialAccountFieldName = req.body.social_account_field_name ?  `${socialFieldName.toLowerCase()}AccountId` : undefined
        const socialAccountId = socialAccountFieldName ?  req.body[socialAccountFieldName] : undefined;

        // set the user's social account Id




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
            gender, 
            [socialAccountFieldName]: socialAccountId
        }

        await Users.query().insert({
            ...payload
        })

        const user = await Users.query().findOne({
            email, 
        })  

        const parsedUser = getObjectionJSON(user);

        if(user) {
            res.status(200).json({message: 'User created successfully', access_token: generateAccessToken(parsedUser)})
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


const sendOtp = async (req, res) => {

    try {
        // generate OTP
        const email = req.body.email;
        const otpCode = crypto.randomBytes(2).toString('hex');
        // update the otp field in the user table
        // update the otp_expiration_date with a date (10mns later)

        const user = await Users.query().findOne({ email: email})
        await Users.query().findOne({ email: email}).patch({otp: otpCode, otp_expires_at: new Date(Date.now() + 10*60*1000)})

        const parsedUser = getObjectionJSON(user);

        const message = `Hi, ${parsedUser.first_name}. Here's your OTP Code: ${otpCode}`;

        await sendEmail({ to: user.email, text: message });

        return res.status(200).json({ message: `OTP code sent to ${email} `})
    } catch(e) {
        return res.status(500).json({ message: new Error(e).message })
    }

}

const verifyOtp = async (req, res) => {

    try { 

        const otp = req.body.otp;
        const email = req.body.email;
        const password = req.body.password;
    
        const user = await Users.query().findOne({ email: email });
    
        const parsedUser = getObjectionJSON(user);
    
        if(otp !== parsedUser.otp) {
            return res.status(400).json({ message: "OTP Code is incorrect"})
        }else {
            const currentDate = new Date();
            if(currentDate < new Date(parsedUser.otp_expires_at)) {
                const encryptedPassword = await bcrypt.hash(password, 10);
                await Users.query().findOne({ email: email }).patch({ password: encryptedPassword, otp: null, otp_expires_at: null, status: 'ACTIVE' })
                return res.status(200).json({ message: "Password modified successfully"});
            }else {
                return res.status(400).json({ message: "OTP Code has expired. Please, try getting another one."})
            }
        }

    }catch(e){

        res.status(500).json({ message: new Error(e).message })

    }



}

module.exports = {
    refreshToken,
    deleteRefreshToken,
    login,
    signup,
    sendOtp, 
    verifyOtp
}