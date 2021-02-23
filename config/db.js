const mongoose = require("mongoose");
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      "mongodb+srv://AkashPatel98:Sky4me98@cluster0.idgaa.mongodb.net/myFitnessTrackerDB?retryWrites=true&w=majority",
      {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
      }
    );

    console.log(`Mongodb Connected `);
  } catch (error) {
    console.log(error);
  }
};
module.exports = connectDB;
