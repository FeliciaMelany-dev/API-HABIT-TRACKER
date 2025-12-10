import express from 'express';
import auth from "./authRouter.js";
import usuario from "./usuarioRouter.js";
import habito from "./habitoRouter.js";

export default function registerRoutes(app) {
  app.use(express.json());  
  app.use('/api/auth', auth);
  app.use('/api/usuario', usuario);
  app.use('/api', habito);
}