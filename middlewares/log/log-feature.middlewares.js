const logFeature = (message) => (req, res, next) => {
    console.log(message);
    next(); // chạy các middleware và controller tiếp theo
  };
  
  module.exports = {
    logFeature,
  };