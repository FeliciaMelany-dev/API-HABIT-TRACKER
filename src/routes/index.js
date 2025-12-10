import express from 'express';
import auths from "./authRouter.js";
import usuarios from "./usuarioRouter.js";
import habitos from "./habitoRouter.js";

export default function registerRoutes(app) {
  app.use(express.json());  
  app.use('/', auths);
  app.use('/', usuarios);
  app.use('/', habitos);
}