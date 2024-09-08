import mongoose from "mongoose";

//const baseUrl = process.env.MONGODB || "0.0.0.0:27017";
const uri = "mongodb+srv://ravi:4298@atlascluster.tlcgbgf.mongodb.net/socialMedia?retryWrites=true&w=majority";
export const connectToDb = async () => {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected using mongoose");
  } catch (err) {
    console.log(err);
  }
};
