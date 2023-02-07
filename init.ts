import "dotenv/config";
import app from "./server";

const port = process.env.PORT || 4001;

const handleListening = () =>
  console.log(`Server Listening on port http://localhost:${port}`);

app.listen(port, handleListening);
