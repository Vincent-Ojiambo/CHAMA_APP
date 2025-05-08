// const express = require("express");
// const router = express.Router();
// const { protect } = require("../middleware/authMiddleware");
// const {
//   createChama,
//   getChamas,
//   getChamaDetails,
// } = require("../controllers/chamaController");

// router.route("/").post(protect, createChama).get(protect, getChamas);

// router.route("/:id").get(protect, getChamaDetails);

// module.exports = router;

const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const {
  createChama,
  getChamas,
  getChamaDetails,
  updateChama,
  deleteChama,
} = require("../controllers/chamaController");

// Route: /api/chamas/
router
  .route("/")
  .post(protect, createChama) // Create a new chama
  .get(protect, getChamas); // Get all chamas for the logged-in user

// Route: /api/chamas/:id
router
  .route("/:id")
  .get(protect, getChamaDetails) // Get specific chama details
  .put(protect, updateChama) // (Optional) Update a chama
  .delete(protect, deleteChama); // (Optional) Delete a chama

module.exports = router;
