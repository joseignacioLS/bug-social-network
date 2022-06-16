import express from "express"
import { User } from "../models/user.model.mjs"
import jwt from "jsonwebtoken"

const router = express.Router()

router.post("/login", async (req, res, next) => {
  try {
    const { username, password } = req.body
    const user = await User.findOne({ username })

    const isValidPassword = password === user?.password

    if (!user || !isValidPassword) {
      return res.status(400).json({
        status: 400,
        message: "Login error",
      })
    }
    const token = jwt.sign(
      {
        id: user._id,
        username: user.username,
      },
      req.app.get("secretKey")
    )

    return res.status(200).json({
      status:200,
      message: "Login successful",
      data: {
        id: user._id,
        username: user.username,
        token: token
      }
    })

  } catch (err) {
    res.status(500).next()}
})

router.post("/register", async (req, res, next) => {
  try{
    const { username, password } = req.body
    const previousUser = await User.findOne({ username })

    if (previousUser) {
      return res.status(400).json({
        status:400,
        message: "Username not available",
        data: {}
      })
    }

    const newUser = await new User({
      username,
      password
    })

    const savedUser = await newUser.save()

    return res.status(200).json({
      status:200,
      message: "Register successful",
      data:{}
    })

  }
  catch (err) {
    res.status(500).next()
  }
})

export { router }
