const multer = require("multer")

const storage = multer.diskStorage({
  // Where the file will be saved
  destination: (req, file, callback) => {
    callback(null, "uploads/")
  },

  // Rename the file
  filename: (req, file, callback) => {
    callback(null, `${Date.now()}_${file.originalname}`)
  },
})

const upload = multer({
  storage: storage,
  limits: { fileSize: 2 * 1024 * 1024 },
})

module.exports = upload
