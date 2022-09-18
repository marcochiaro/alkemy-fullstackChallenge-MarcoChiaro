import * as express from "express";
import { AppDataSource } from "./data-source";
import * as cors from "cors";
import helmet from "helmet";
import routes from "./routes";

const PORT = process.env.PORT || 3001;
// create express app
const app = express();
//middleware
app.use(cors());
app.use(helmet());
app.use(express.json());
//routes
app.use("/", routes);
// start express server
app.listen(PORT, () =>
  console.log(
    `> Express server has started on port ${PORT}. Open http://localhost:3001/operations to see results`
  )
);

AppDataSource.initialize()
  .then(async () => console.log("> Database initialized."))
  .catch((error) => console.log("> Database error: ", error));
