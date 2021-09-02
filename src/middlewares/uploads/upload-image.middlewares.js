const multer = require("multer");

const uploadImageSingle = () => {
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "./public/images/movies");
    }, //đường dẫn thư mục để lưu file
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}_${file.originalname}`);
    },
  });
  const upload = multer({ storage });
  return upload.single("imgMovies");
};

module.exports = {
  uploadImageSingle,
};

