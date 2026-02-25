import { Elysia } from "elysia";
import { auth as authApp } from "./modules/auth";
import { app as apiApp } from "./modules/apikeys";
import { app as paymentsApp } from "./modules/payments";
import { app as modelsApp } from "./modules/models";

export const app = new Elysia()
    .use(authApp)
    .use(apiApp)
    .use(paymentsApp)
    .use(modelsApp);

export type App = typeof app;