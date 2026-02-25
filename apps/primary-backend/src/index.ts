import { composeGeneralHandler } from "elysia/dist/compose";
import { app } from "./app";
import { cors } from "@elysiajs/cors";
import axios from "axios";

app
  .use(
    cors({
      // Use host without protocol to avoid known header bug
      origin: "localhost:3001",
      credentials: true,
    }),
  )
  .listen(3000);