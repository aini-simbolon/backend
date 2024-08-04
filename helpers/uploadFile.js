const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: "./uploads/",
  filename: function (req, file, cb) {
    const fileName = `${file.fieldname}-${Date.now()}-${file.originalname
      .replaceAll(" ", "-")
      .toLowerCase()}`;
    console.log("Generated filename:", fileName);
    cb(null, fileName);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 6000000 }, // 6MB file size limit
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
});

function checkFileType(file, cb) {
  const filetypes = /jpeg|jpg|png|gif/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb("Error: Images Only!");
  }
}

module.exports = { upload };
