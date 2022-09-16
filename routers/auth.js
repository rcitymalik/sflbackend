const bcrypt = require("bcrypt");
const { Router } = require("express");
const {toJWT} = require("../auth/jwt");
const authMiddleware = require("../auth/middleware")
const User = require("../models").user;
const {SALT_ROUNDS} = require("../config/constants");

const router = new Router();

router.post("/login", async (req, res, next) => {
    try {
        console.log("step one working")
        const { email, password } = req.body;

        if (!email || !password) {
            return res
                .status(400)
                .send({ message: "Please provide both email and password" });
        }

        const user = await User.findOne({ where: { email } });

        if (!user || !bcrypt.compareSync(password, user.password)) {
            return res.status(400).send({
                message: "User with that email not found or password incorrect",
            });
        }

        delete user.dataValues["password"]; // don't send back the password hash
        const token = toJWT({ userId: user.id });
        return res.status(200).send({ token, user: user.dataValues });
    } catch (error) {
        console.log(error);
        return res.status(400).send({ message: "Something went wrong, sorry" });
    }
});

router.post("/signup", async (req, res) => {
    const { email, password, name } = req.body;


    if (!email || !password || !name) {
        return res.status(400).send("Please provide an email, password and a name");
    }

    const user = {email,
        password: bcrypt.hashSync(password, SALT_ROUNDS),
        name,}

    console.log(user)
    try {
        const newUser = await User.create(user);

        delete newUser.dataValues["password"]; // don't send back the password hash

        const token = toJWT({ userId: newUser.id });

        res.status(201).json({ token, user: newUser.dataValues });
    } catch (error) {
        if (error.name === "SequelizeUniqueConstraintError") {
            return res
                .status(400)
                .send({ message: "There is an existing account with this email" });
        }

        return res.status(400).send({ message: "Something went wrong, sorry" });
    }
});

router.patch("editusercity",authMiddleware, async (req, res, next)=>{
    try {
        const {id,city} = req.params;
        const findUser = User.findByPk(id);

        if (!findUser || !city || !about){
            return res.status(400).send("could not edit")
        }

        const update = await findUser.update({city})
        res.send(update)
    }
    catch (e) {

    }
})

router.get("/me", authMiddleware, async (req, res) => {
    // don't send back the password hash
    delete req.user.dataValues["password"];
    res.status(200).send({ ...req.user.dataValues });
});

module.exports = router;