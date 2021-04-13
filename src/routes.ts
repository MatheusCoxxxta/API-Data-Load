import express from "express";
import DataController from "./controllers/DataController";
import ProjectsController from "./controllers/ProjectsController";
import UsersController from "./controllers/UsersController";
import AuthController from "./controllers/AuthController";

const usersController = new UsersController();
const projectsController = new ProjectsController();
const dataController = new DataController();
const authController = new AuthController();

const routes = express.Router();

routes.get("/", (request, response) => {
  response.send({ message: "Server online" });
});

routes.post("/joinData", dataController.joinData);
routes.get("/listar/:page", dataController.listar);
routes.get("/exportData", dataController.exportData);

routes.get("/projects/:id", projectsController.show);

routes.get("/users", usersController.index);

routes.post("/login", authController.signIn);

export default routes;
