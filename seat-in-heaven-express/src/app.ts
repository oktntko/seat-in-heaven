import express from "express";
import session from "express-session";
import helmet from "helmet";
import "reflect-metadata";
import { Action, useExpressServer } from "routing-controllers";
import { SessionStore } from "~/arch/SessionStore";
import * as controllers from "~/controllers";
import { AfterLogHandler, BeforeLogHandler, ErrorHandler, NotFoundHandler } from "~/middlewares";
import log from "~/middlewares/log";
import { SessionsService } from "~/services/sessions.service";

const app = express();

// Helmet helps you secure your Express apps by setting various HTTP headers. It's not a silver bullet, but it can help!
app.use(helmet());

app.use(
  session({
    secret: "6V3mteKhd232paRt",
    name: `riww5UfgrGUtygck${import.meta.env.MODE.at(0)}`,
    store: new SessionStore(),
    cookie: {
      maxAge: 24 * 60 * 60 * 1000 /*ms*/,
      httpOnly: true,
      path: import.meta.env.PATH || "/",
      domain: import.meta.env.DOMAIN || undefined,
      secure: import.meta.env.PROD,
    },
    resave: false,
    saveUninitialized: false,
  })
);

// Express configuration
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

useExpressServer(app, {
  defaultErrorHandler: false,
  controllers: [
    controllers.AuthController,
    controllers.FloorsController,
    controllers.UsersController,
    controllers.OpenapiController,
  ],
  middlewares: [BeforeLogHandler, NotFoundHandler, ErrorHandler, AfterLogHandler],
  defaults: {
    paramOptions: {
      required: true, // with this option, argument will be required by default
    },
  },
  currentUserChecker: async (action: Action) => {
    return SessionsService.getSession(action.request.sessionID);
  },
});

if (import.meta.env.PROD) {
  app.listen(8080, () => {
    log.info(`App is running at http://localhost:8080 in ${import.meta.env.MODE} mode`);
  });
}

export const viteNodeApp = app;
