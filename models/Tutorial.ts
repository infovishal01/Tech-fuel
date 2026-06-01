import mongoose from "mongoose";

const TutorialSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      default: "AI",
    },
    author: {
      type: String,
      default: "Tech Fuel",
    },
  },
  {
    timestamps: true,
  }
);

const Tutorial =
  mongoose.models.Tutorial ||
  mongoose.model("Tutorial", TutorialSchema);

export default Tutorial;
