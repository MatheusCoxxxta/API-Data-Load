import express from "express";
import UserController from "./controllers/UserController";
import DataController from "./controllers/DataController";

const userController = new UserController();

const dataController = new DataController();

const routes = express.Router();

routes.get("/", (request, response) => {
  response.send({ message: "Server online" });
});

routes.get("/user", userController.index);
routes.get("/user/:id", userController.show);
routes.post("/user", userController.store);
routes.put("/user/:id", userController.update);
routes.delete("/user/:id", userController.delete);

routes.get("/salvarJira", dataController.SaveJira);
routes.get("/salvarTrello", dataController.SaveTrello);
routes.get("/listar", dataController.listar);

export default routes;
