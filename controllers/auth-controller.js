const User = require("../models/user-model");
const bcrypt = require("bcryptjs");

exports.signUp = async (req, res) => {
    const { username, password } = req.body;
    
    try {
        const hashpassword = await bcrypt.hash(password, 12);
        const user = await User.create({
            username,
            password: hashpassword
        });
        req.session.user = user;
        res.status(201).json({
            status: 'success',
            data: {
                user: user
            }
        });
    } catch (e) {
        res.status(400).json({
            status: 'fail',
            message: e
        });
    }
}

exports.login = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({
                status: 'fail',
                message: 'User not found'
            });
        }

        const isCorrect = bcrypt.compare(password, user.password);

        if (isCorrect) {
            req.session.user = user;
            res.status(200).json({
                status: 'success',
            });
        } else {
                res.status(200).json({
                    status: 'fail',
                    message: 'incorrect username and password'
                });
        }

    } catch (e) {
        res.status(400).json({
            status: 'fail',
            message: e
        });
    }
}