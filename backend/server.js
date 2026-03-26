const mongoose = require("mongoose");
const passport = require("passport");
const cors = require("cors");
const morgan = require("morgan");
const express = require("express");
const app = express();
require("dotenv").config();

const usersRouter = require("./routes/users.routes");
const transactionRouter = require("./routes/transaction.routes");

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

const normalizeOrigin = (origin) => origin.replace(/\/+$/, "");

const originMatchesPattern = (origin, pattern) => {
  if (pattern.includes("*")) {
    const escaped = pattern.replace(/[.+?^${}()|[\]\\]/g, "\\$&");
    const wildcardRegex = new RegExp(`^${escaped.replace(/\*/g, ".*")}$`);
    return wildcardRegex.test(origin);
  }

  return origin === pattern;
};

app.use(morgan(formatsLogger));

// Allow local dev and explicitly configured frontend domains (e.g. Vercel).
const allowedOrigins = [
  "http://localhost:3000",
  "http://127.0.0.1:3000",
  ...(process.env.FRONTEND_URL || "")
    .split(",")
    .map((origin) => origin.trim())
    .map((origin) => normalizeOrigin(origin))
    .filter(Boolean),
];

app.use(
  cors({
    origin(origin, callback) {
      // Requests without origin (curl/postman/server-to-server) should pass.
      if (!origin) {
        return callback(null, true);
      }

      const normalizedOrigin = normalizeOrigin(origin);
      const isAllowed = allowedOrigins.some((allowedOrigin) =>
        originMatchesPattern(normalizedOrigin, allowedOrigin),
      );

      if (isAllowed) {
        return callback(null, true);
      }

      return callback(new Error(`CORS blocked for origin: ${origin}`));
    },
    credentials: true,
  }),
);
app.use(express.json());
app.use(passport.initialize());

app.get("/health", (_, res) => {
  res.status(200).json({
    status: "ok",
    message: "Finance Planner API is running",
  });
});

app.use("/auth", usersRouter);
app.use("/transaction", transactionRouter);

app.use((_, res, __) => {
  res.status(404).json({
    status: "error",
    code: 404,
    message: "The given endpoint does not exist",
    data: "Not found",
  });
});

app.use((error, _, res, __) => {
  console.log(error.stack);
  res.status(500).json({
    status: "fail",
    code: 500,
    message: error.message,
    data: "Internal server error",
  });
});

const PORT = process.env.PORT || 8000;
const mongoUrl =
  process.env.DATABASE_URL || "mongodb://127.0.0.1:27017/finance_planner";
const connection = mongoose.connect(mongoUrl);

connection
  .then(() => {
    console.log("Database connection successful");
    app.listen(PORT, () => {
      console.log(`App listens on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error(`Error while establishing connection: [${err}]`);
    process.exit(1);
  });
