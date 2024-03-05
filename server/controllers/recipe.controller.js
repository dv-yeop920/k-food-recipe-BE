const { Recipe } = require("../models/recipe.model");

exports.getRecipeList = async (req, res) => {
  const { cursor = 1, search, tab } = req.query;
  const limit = 24; // 한 페이지에 표시할 아이템 수
  const skip = (cursor - 1) * limit; // 건너뛸 아이템 수

  let recipeList;
  let query = {};

  const TAB_VALUE = tab.trim();

  const regexTabValue = new RegExp(`.*${tab}.*`);

  const regexSearchValue = new RegExp(
    `.*${search.trim()}.*`
  );

  try {
    if (TAB_VALUE === "전체" || TAB_VALUE === "null") {
      if (search.trim() !== "null") {
        query.$or = [{ RCP_NM: regexSearchValue }];
      }
    } else {
      if (search.trim() !== "null") {
        query.$or = [
          {
            $and: [
              { RCP_NM: regexTabValue },
              { RCP_NM: regexSearchValue },
            ],
          },
          {
            $and: [
              { HASH_TAG: regexTabValue },
              { RCP_NM: regexSearchValue },
            ],
          },
          {
            $and: [
              { RCP_WAY2: regexTabValue },
              { RCP_NM: regexSearchValue },
            ],
          },
          {
            $and: [
              { RCP_PAT2: regexTabValue },
              { RCP_NM: regexSearchValue },
            ],
          },
        ];
      } else {
        query.$or = [
          { RCP_NM: regexTabValue },
          { HASH_TAG: regexTabValue },
          { RCP_WAY2: regexTabValue },
          { RCP_PAT2: regexTabValue },
        ];
      }
    }

    recipeList = await Recipe.find(query)
      .skip(skip)
      .limit(limit);

    res.json({
      recipeList: recipeList,
      cursor: cursor + 1,
    });
  } catch (error) {
    res.json({
      messsage: "레시피를 불러오지 못했습니다",
    });
  }
};

exports.getRecipeDetail = async (req, res) => {
  const recipeId = req.query.id;

  try {
    if (recipeId) {
      const recipe = await Recipe.findOne({
        _id: recipeId,
      });

      res.json({
        recipe: recipe,
      });
    }
  } catch (error) {
    res.json({
      messsage: "레시피를 불러오지 못했습니다",
    });
  }
};
