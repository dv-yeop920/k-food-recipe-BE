const {
  getRecipeList,
  getRecipeDetail,
} = require("../services/recipe.services.js");

const express = require("express");
const router = express.Router();

router.get("/recipeList", getRecipeList);
router.get("/recipeList/recipe", getRecipeDetail);

module.exports = router;
