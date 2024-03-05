const {
  getRecipeList,
  getRecipeDetail,
} = require("../controllers/recipe.controller.js");

const express = require("express");
const router = express.Router();

router.get("/recipeList", getRecipeList);
router.get("/recipeList/recipe", getRecipeDetail);

module.exports = router;
