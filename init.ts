import "dotenv/config";
import connectDB from "./db/connect";
import app from "./server";

const port = process.env.PORT || 4001;

const handleListening = () =>
  console.log(`Server Listening on port http://localhost:${port}`);

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI as string);
    app.listen(port, handleListening);
  } catch (error) {
    console.log(error);
  }
};

start();
