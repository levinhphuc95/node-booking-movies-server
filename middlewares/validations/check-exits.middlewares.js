const checkExist = (Model) => async (req, res, next) => {
    const { id } = req.params;
    try {
      const detail = await Model.findOne({ where: { id } });
      if (detail) {
        next();
      } else {
        res.status(404).send(`Không tìm thấy Id ${id}`);
      }
    } catch (error) {
      res.status(500).send(error);
    }
  };
  
  module.exports = {
    checkExist,
  };