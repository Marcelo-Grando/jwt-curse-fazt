import User from "../models/User.js";
import jwt from "jsonwebtoken";

import config from "../config.js";
import Role from "../models/Role.js";

export const signup = async (req, res) => {
    const {username, email, password, roles} = req.body

    //const userFound = User.find({email})

    const newUser = new User({
        username,
        email,
        password: await User.encryptPassword(password)
    })

    if(roles) {
        const foundRole = await Role.find({name: {$in: roles}})
        newUser.roles = foundRole.map(role => role._id)
    } else {
        const role = await Role.findOne({name: 'user'})
        newUser.roles = [role._id]
    }

    const saveUser = await newUser.save()
    console.log(saveUser)

    const token = jwt.sign({id: saveUser._id}, config.SECRET, {
        expiresIn: 60*60*24
    })


    res.json({token})
}

export const signin = async (req, res) => {
    const {email, password} = req.body
    const userFound = await User.findOne({email}).populate("roles")

    if(!userFound) {
        return res.status(400).json({message: "User not Found"})
    }

    const matchPassword = await User.comparePassword(password, userFound.password)

    if(!matchPassword) return res.status(401).json({token: null, message: "Invalid Password"})

    const token = jwt.sign({id: userFound._id}, config.SECRET, {
        expiresIn: 60*60*24
    })

    res.json({token})
}
