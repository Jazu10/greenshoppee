import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
   {
      name: {
         type: String,
         required: true,
      },
      email: {
         type: String,
         required: true,
         unique: true,
      },
      password: {
         type: String,
         required: true,
      },
      role: {
         type: String,
         default: "user",
      },
      root: {
         type: Boolean,
         required: false,
      },
      avatar: {
         type: String,
         default:
            "https://freepikpsd.com/media/2019/10/avatar-images-png-2-Images-PNG-Transparent.png",
      },
   },
   {
      timestamps: true,
   },
);

let Dataset = mongoose.models.user || mongoose.model("user", userSchema);
export default Dataset;
