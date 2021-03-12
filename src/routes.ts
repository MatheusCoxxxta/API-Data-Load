import express from "express";
import DataController from "./controllers/DataController";

const dataController = new DataController();

const routes = express.Router();

routes.get("/", (request, response) => {
  response.send({ message: "Server online" });
});

routes.get("/salvarJira", dataController.SaveJira);
routes.get("/salvarTrello", dataController.SaveTrello);
routes.get("/listar", dataController.listar);

export default routes;
