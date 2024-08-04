const express = require("express");
const { upload } = require("../../../helpers/uploadFile");
const { uploadFile } = require("../../controllers/upload");

const router = express.Router();

router.post("/", upload.single('image'), uploadFile);

module.exports = router;
