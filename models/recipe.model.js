const mongoose = require("mongoose");

const RecipeSchema = mongoose.Schema({
  RCP_PARTS_DTLS: {
    type: String,
  },
  RCP_WAY2: {
    type: String,
  },
  RCP_SEQ: {
    type: String,
  },
  INFO_NA: {
    type: String,
  },
  INFO_PRO: {
    type: String,
  },
  INFO_FAT: {
    type: String,
  },
  HASH_TAG: {
    type: String,
  },
  MANUAL01: {
    type: String,
  },
  MANUAL_IMG01: {
    type: String,
  },
  MANUAL02: {
    type: String,
  },
  MANUAL_IMG02: {
    type: String,
  },
  MANUAL03: {
    type: String,
  },
  MANUAL_IMG03: {
    type: String,
  },
  MANUAL04: {
    type: String,
  },
  MANUAL_IMG04: {
    type: String,
  },
  MANUAL05: {
    type: String,
  },
  MANUAL_IMG05: {
    type: String,
  },
  MANUAL06: {
    type: String,
  },
  MANUAL_IMG06: {
    type: String,
  },
  MANUAL07: {
    type: String,
  },
  MANUAL_IMG07: {
    type: String,
  },
  MANUAL08: {
    type: String,
  },
  MANUAL_IMG08: {
    type: String,
  },
  MANUAL09: {
    type: String,
  },
  MANUAL_IMG09: {
    type: String,
  },
  MANUAL10: {
    type: String,
  },
  MANUAL_IMG10: {
    type: String,
  },
  RCP_PAT2: {
    type: String,
  },
  ATT_FILE_NO_MK: {
    type: String,
  },
  ATT_FILE_NO_MAIN: {
    type: String,
  },
  INFO_CAR: {
    type: String,
  },
  RCP_NA_TIP: {
    type: String,
  },
  INFO_ENG: {
    type: String,
  },
  RCP_NM: {
    type: String,
    required: true,
  },
  INFO_WGT: {
    type: String,
  },
});

const Recipe = mongoose.model("Recipe", RecipeSchema);

module.exports = { Recipe };
