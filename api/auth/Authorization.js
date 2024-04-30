const jwt = require('jsonwebtoken');
const secret = "mysecretsshhh";
const managerSchema = require('../../schemas/Managers');

const router = require('express').Router();

const verifyTokenManager = (req, res, next) => {
    const token = req.headers['authorization'];
    // console.log(req.headers['authorization']);
    // console.log(token);
    if (!token) {
        res.status(403).send({msg: 'A token is required for authentication'});
        return {statusCode: 403};
    }
    try {
        const decoded = jwt.verify(token, secret);
        // console.log(decoded);
        req.user = decoded.user;
        const time = new Date().getTime() / 1000;
        if (decoded.exp < time) {
            res.status(401).send({msg: 'Token has expired',statusCode: 401});
            return {statusCode: 401};
        }
        if (req.user.email === 'Guest') {
            res.status(401).send({msg: 'Unauthorized',statusCode: 401});
            return {statusCode: 401};
        }
        return {statusCode: 200,decoded};
    } catch (err) {
        console.error("Invalid token: " + err);
        res.status(401).send({msg: 'Invalid Token',statusCode: 401});
        return {statusCode: 401};
    }
}

const verifyToken = (req, res) => {
    const token = req.headers['authorization'];
    if (!token) {
        res.status(403).send({ msg: 'A token is required for authentication' });
        return { statusCode: 403 };
    }
    try {
        const decoded = jwt.verify(token, secret);
        req.user = decoded.user;
        const time = new Date().getTime() / 1000;
        if (decoded.exp < time) {
            res.status(401).send({ msg: 'Token has expired', statusCode: 401 });
            return { statusCode: 401 };
        }
        return { statusCode: 200, decoded };
    } catch (err) {
        console.error("Invalid token: " + err);
        res.status(401).send({ msg: 'Invalid Token', statusCode: 401 });
        return { statusCode: 401 };
    }
};

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
        const token = jwt.sign({user}, secret, {expiresIn: '1H'});
        return {token,statusCode: 200};
    } catch (err) {
        console.error("Auth Failed: " + err);
        return {msg: 'Auth Failed',statusCode: 401};
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

router.get('/verify', async (req, res) => {
    const token = verifyToken(req, res);
    if (token.statusCode == 200) {
        res.status(200).send({msg: 'Token is valid',user: token.decoded.user});
    }
});


module.exports = {router, verifyToken, verifyTokenManager};