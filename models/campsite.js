const mongoose = require("mongoose");
const Schema = mongoose.Schema; // just so we can refer to it as schema, not re uired

require("mongoose-currency").loadType(mongoose);
const Currency = mongoose.Types.Currency;

// subdocument
const commentSchema = new Schema(
  {
    rating: {
      type: Number,
      min: 1,
      max: 5,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

//creating a schema object; first argument is required, second is optional for configs
const campsiteSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    elevation: { type: Number, required: true },
    cost: { type: Currency, required: true, min: 0 },
    featured: {
      type: Boolean,
      default: false,
    },
    comments: [commentSchema],
  },
  { timestamps: true }
);

//creating a model named Campsite using the schema, 1st argument is capitalized and singuler of the name of the collection (lowercase and plural) we want to use for this model; second arugment is which schema we want to use
const Campsite = mongoose.model("Campsite", campsiteSchema);
module.exports = Campsite;
