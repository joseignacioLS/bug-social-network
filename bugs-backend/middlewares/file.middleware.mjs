import multer from "multer"
import path from "path"

const storage = multer.diskStorage({
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`)
  },
  destination: (req, file, cb) => {
    cb(null, path.join(path.resolve(), ""))
  },
})

const VALID_FILE_TYPES = ["image/png", "image/jpg", "image/jpeg"]

const fileFilter = (req, file, cb) => {
  if (!VALID_FILE_TYPES.includes(file.mimetype)) {
    const error = new Error("Invalid file type")
    cb(error)
  } else {
    cb(null, true)
  }
}

const upload = multer({
  storage,
  fileFilter,
})

export { upload }
