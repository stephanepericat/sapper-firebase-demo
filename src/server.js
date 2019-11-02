import sirv from 'sirv';
import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from 'compression';
import * as sapper from '@sapper/server';
import admin from "firebase-admin";

import csrfToken from "./middleware/csrf";
import authMiddleware from "./middleware/auth";
import loginRoute from "./pages/login";
import logoutRoute from "./pages/logout";
import sessionLogin from "./session";

const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === 'development';

const app = express();

// Initialize Admin SDK.
admin.initializeApp({
  credential: admin.credential.cert('./src/serviceAccountKeys.json')
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use(compression({threshold: 0}));
app.use(sirv('static', { dev }));
app.use(csrfToken("/login"));

app.get("/login", loginRoute);
app.get("/logout", logoutRoute);
app.post("/sessionLogin", sessionLogin);

app.use(authMiddleware, sapper.middleware());

app.listen(PORT, () => console.log(`server started on port ${PORT}`));
