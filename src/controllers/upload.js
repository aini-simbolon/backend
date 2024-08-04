const { BASE_URL } = require("../../config");

const generateFileUrl = (file) => {
  return `${BASE_URL}${file.destination.replace(".", "")}${file.filename}`;
};

exports.uploadFile = async (req, res) => {
  try {
    if (req.file == undefined) {
      return res.status(400).send({ message: "No file selected!" });
    }

    const fileUrl = generateFileUrl(req.file);

    res.send({
      filename: req.file.filename,
      url: fileUrl,
    });
  } catch (error) {
    console.error("Error uploading file:", error);
    res.status(500).json({ message: "Failed to upload file", error });
  }
};
