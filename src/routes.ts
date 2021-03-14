import express from "express";
import DataController from "./controllers/DataController";

const dataController = new DataController();

const routes = express.Router();

routes.get("/", (request, response) => {
  response.send({ message: "Server online" });
});

routes.post("/salvarJira", dataController.SaveJira);
routes.post("/salvarTrello", dataController.SaveTrello);
routes.get("/listar/:page", dataController.listar);

export default routes;
