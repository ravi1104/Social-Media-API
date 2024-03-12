import mongoose from "mongoose";

const baseUrl = "mongodb+srv://ravi:4298@atlascluster.tlcgbgf.mongodb.net/socialMedia?retryWrites=true&w=majority";

export const connectToDb = async () => {
  try {
    await mongoose.connect(baseUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected using mongoose");
  } catch (err) {
    console.log(err);
  }
};
