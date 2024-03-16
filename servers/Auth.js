const managerSchema = require('../schemas/Managers');

const authenticate = async (req, res, next) => {
    const {email, password} = req.query;

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