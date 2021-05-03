import express from "express";
import DataController from "./controllers/DataController";
import ProjectsController from "./controllers/ProjectsController";
import UsersController from "./controllers/UsersController";
import AuthController from "./controllers/AuthController";
import auth from "./middlewares/auth";

const usersController = new UsersController();
const projectsController = new ProjectsController();
const dataController = new DataController();
const authController = new AuthController();

const routes = express.Router();

routes.get("/", (request, response) => {
  response.send({ message: "Server online" });
});

routes.get("/listar", auth, dataController.listar);
routes.get("/exportData", auth, dataController.exportData);

routes.get("/projects/:id", auth, projectsController.show);
routes.get("/projects", auth, projectsController.list);

routes.get("/users", auth, usersController.index);

routes.post("/login", authController.signIn);

export default routes;
