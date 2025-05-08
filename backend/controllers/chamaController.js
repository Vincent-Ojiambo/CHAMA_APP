// controllers/chamaController.js

const createChama = (req, res) => {
  res.send("Chama created");
};

const getChamas = (req, res) => {
  res.send("All chamas");
};

const getChamaDetails = (req, res) => {
  res.send(`Details for chama ID: ${req.params.id}`);
};

const updateChama = (req, res) => {
  res.send(`Chama ID ${req.params.id} updated`);
};

const deleteChama = (req, res) => {
  res.send(`Chama ID ${req.params.id} deleted`);
};

module.exports = {
  createChama,
  getChamas,
  getChamaDetails,
  updateChama,
  deleteChama,
};
