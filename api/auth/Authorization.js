const jwt = require('jsonwebtoken');
const secret = "mysecretsshhh";
const managerSchema = require('../../schemas/Managers');

const router = require('express').Router();

const verifyTokenManager = (req, res, next) => {
    const token = req.headers['authorization'];
    console.log(req.headers['authorization']);
    // console.log(token);
    if (!token) {
        return res.status(403).send({msg: 'A token is required for authentication'});
    }
    try {
        const decoded = jwt.verify(token, secret);
        console.log(decoded);
        req.user = decoded.user;
        const time = new Date().getTime() / 1000;
        if (decoded.exp < time) {
            return res.status(401).send({msg: 'Token has expired'});
        }
        if (req.user.email === 'Guest') {
            return res.status(401).send({msg: 'Unauthorized'});
        }
        return res.status(200).send({msg: 'Token is valid'});
    } catch (err) {
        console.error("Invalid token: " + err);
        return res.status(401).send({msg: 'Invalid Token'});
    }


}

const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];
    console.log(token);
    if (!token) {
        return res.status(403).send({msg: 'A token is required for authentication'});
    }
    try {
        const decoded = jwt.verify(token, secret);
        req.user = decoded.user;
        const time = new Date().getTime() / 1000;
        if (decoded.exp < time) {
            return res.status(401).send({msg: 'Token has expired'});
        }
        return res.status(200).send({msg: 'Token is valid',statusCode: 200});
    } catch (err) {
        console.error("Invalid token: " + err);
        return res.status(401).send({msg: 'Invalid Token'});
    }

}

const createToken = async (req) => {
    try {
        let user = {};
        if (req.body.username != undefined && req.body.password != undefined) {
            console.log(req.body.username, req.body.password);
            user = await managerSchema.findOne({email: req.body.username, password: req.body.password});
            if (!user) {
                throw new Error('User not found or password is incorrect!');
            }
            console.log('Manager');
        } else {
            console.log('Guest');
            user.email = 'Guest';
        }
        const token = jwt.sign({user}, secret, {expiresIn: '1h'});
        return token;
    } catch (err) {
        let user = {};
        user.email = 'Guest';
        const token = jwt.sign({user}, secret, {expiresIn: '1h'});
        console.error("Auth Failed: " + err);
        return {token, msg: 'Auth Failed'};
    }
}

router.post('/login', async (req, res) => {
        try {
            const token = await createToken(req);
            res.status(200).send({token});
        } catch (err) {
            res.status(401).send({msg: 'Auth Failed'});
        }
    }
);

router.get('/verify', verifyToken, (req, res) => {
});


module.exports = {router, verifyToken, verifyTokenManager};