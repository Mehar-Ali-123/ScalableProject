
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix =
      new Date().toISOString().replace(/:/g, "-") +
      "-" +
      Math.round(Math.random() * 1e9);
    const filename = file.originalname.split("-")[0];
    cb(null, filename + "-" + uniqueSuffix + ".png");
  }, 
});  

exports.upload = multer({ storage: storage });



