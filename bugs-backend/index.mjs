import express from "express"
import cors from "cors"

import "dotenv/config"

import { router as bugsRoutes } from "./routes/bug.routes.mjs"
import { router as userRoutes } from "./routes/user.routes.mjs"

import { connect } from "./db/db.mjs"

const server = express()
const router = express.Router()

server.use(cors())

server.use(express.json())
server.use(express.urlencoded({ extended: true }))

const PORT = process.env.PORT

//JWT SECRET KEY
server.set("secretKey", "theMostUnbreakableSecretKeyEverCreated3")

server.use("/bugs", bugsRoutes)
server.use("/user", userRoutes)

router.get("/", async (req, res, next) => {
  try {
    res.status(200).json({
      status: 200,
      message: "",
      data: [],
    })
  } catch (err) {
    res.status(500).json(err)
  }
})

server.use(router)

server.get("*", async (req, res, next) => {
  res.status(404).send("Route not found")
})

server.listen(PORT, () => {
  console.log("server up")
})
