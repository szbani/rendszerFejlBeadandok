const managerSchema = require('../schemas/Managers');

//todo rewrite to websocket
const authenticate = async (req, res, next) => {
    const auth = req.headers['auth'];
    if (!auth) {
        // console.log("No authentication data provided");
        res.status(401).json({message: 'No authentication data provided'}).send();
        return;
    }
    const {email, password} = JSON.parse(auth);

    try {
        const manager = await managerSchema.findOne({email: email, password: password});
        if (manager) {
            req.user = manager;
            next();
        } else {
            res.status(401).json({message: 'Invalid email or password'}).send();
        }
    } catch (error) {
        console.log("Error authenticating: ", error);
        res.status(500).send();
    }
};

module.exports = authenticate;