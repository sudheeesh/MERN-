import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({

    name: {
      type: String,
      required: [true, "Please enter category name"],
      trim: true,
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
    },
    description: {
      type: String,
      default: "",
    },
    image: {
      public_id: String,
      url: String,
    },
    images: [
      {
        public_id: String,
        url: String,
      }
    ],
  },
 { timestamps: true });


categorySchema.pre("save",function(next) {
    if(!this.isModified("name")) return next();
    this.slug=this.name.toLowerCase().replace(/\s+/g, "-")
    next()
})
export default mongoose.model("Category", categorySchema)