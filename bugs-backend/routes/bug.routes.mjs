import express from "express"

import { Bug } from "../models/bug.model.mjs"

import { upload } from "../middlewares/file.middleware.mjs"

import { default as uri } from "image-to-uri"

import fs from "fs"

import {isAuth} from "../jwt/jwt.mjs"

const router = express.Router()

const ITEMS_PER_PAGE = 6

router.get("/",[isAuth], async (req, res, next) => {
  const { filter, page, user } = req.query
  try {
    const bugs = await Bug.find({})

    const pageInt = parseInt(page)

    const filteredBugs = bugs.reverse().filter((bug) => {
      return (
        (bug.name.toLowerCase().includes(filter.toLowerCase()) ||
          bug.tags.toLowerCase().includes(filter.toLowerCase())) &&
        (!user || user === bug.user)
      )
    })

    const pagedBugs = filteredBugs.slice(
      pageInt * ITEMS_PER_PAGE,
      (pageInt + 1) * ITEMS_PER_PAGE
    )

    const isLast =
      filteredBugs.slice(
        (pageInt + 1) * ITEMS_PER_PAGE,
        (pageInt + 2) * ITEMS_PER_PAGE
      ).length === 0

    res.status(200).json({
      data: pagedBugs,
      isLast,
    })
  } catch (err) {
    res.status(500).json(err)
  }
})
router.get("/:id",[isAuth], async (req, res, next) => {
  const { id } = req.params
  try {
    const bug = await Bug.findById(id)
    if (!bug) {
      res.status(404).json({
        status: 404,
        message: "bug not found",
        data: [],
      })
      return
    }
    res.status(200).json(bug)
  } catch (err) {
    res.status(500).json(err)
  }
})

router.post("/",[isAuth], [upload.single("image")], async (req, res, next) => {
  try {
    const imageUired = req.file ? uri(req.file.path) : ""

    if (req.file)
      fs.unlink(req.file.path, () => {
        console.log("deleted")
      })

    const newBug = await new Bug({ ...req.body, image: imageUired })

    const savedBug = await newBug.save()

    res.status(200).json(savedBug)
  } catch (err) {
    res.status(500).json(err)
  }
})
router.put("/:id",[isAuth], async (req, res, next) => {
  const { id } = req.params
  try {
    const modBug = await Bug.findByIdAndUpdate(id, { $set: req.body })

    res.status(200).json(modBug)
  } catch (err) {
    res.status(500).json(err)
  }
})
router.delete("/:id",[isAuth], async (req, res, next) => {
  const { id } = req.params
  try {
    const deletedBug = await Bug.findByIdAndDelete(id)

    res.status(200).json(deletedBug)
  } catch (err) {
    res.status(500).json(err)
  }
})

export { router }
