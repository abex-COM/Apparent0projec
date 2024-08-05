const express = require("express");
const {
  getUsers,
  signup,
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
  signin,
  // updateUsers,
} = require("../controllers/userControler");
const router = express.Router();

router.get("/users", getUsers);
router.get("/get", getAllUsers);
router.get("/get/:id", getUser);
router.put("/update/:id", updateUser);
router.delete("/delete/:id", deleteUser);
router.post("/signin", signin);

// router.put("/update", updateUsers);

router.post("/signup", signup);
router.get("/profile", (req, res) => res.send("profile works properly"));
// router.get("/id", (req, res) => res.send("id works properly"));

module.exports = router;
