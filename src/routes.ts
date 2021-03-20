import express from "express";
import DataController from "./controllers/DataController";
import ProjectsController from "./controllers/ProjectsController";

const projectsController = new ProjectsController();
const dataController = new DataController();

const routes = express.Router();

routes.get("/", (request, response) => {
  response.send({ message: "Server online" });
});

routes.post("/joinData", dataController.joinData);
routes.get("/listar/:page", dataController.listar);

routes.get("/projects/:id", projectsController.show);

export default routes;
