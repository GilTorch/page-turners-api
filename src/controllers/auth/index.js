const jwt = require('jsonwebtoken');
const { generateAccessToken } = require('../../utils/auth');

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

const login = (req, res) => {
    
    const username = req.body.username
    const user = { name: username }

    const accessToken = generateAccessToken(user)
    const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
    //TODO: Insert refresh token in database
    res.json({ accessToken: accessToken, refreshToken: refreshToken })

}

module.exports = {
    refreshToken,
    deleteRefreshToken,
    login
}