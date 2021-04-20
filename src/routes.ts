import express from "express";
import DataController from "./controllers/DataController";
import ProjectsController from "./controllers/ProjectsController";
import UsersController from "./controllers/UsersController";
import AuthController from "./controllers/AuthController";
import ProjectDataController from "./controllers/ProjectDataController";
import TasksController from "./controllers/TasksController";

const usersController = new UsersController();
const projectsController = new ProjectsController();
const dataController = new DataController();
const authController = new AuthController();
const projectDataController = new ProjectDataController();
const tasksController = new TasksController();

const routes = express.Router();

routes.get("/", (request, response) => {
  response.send({ message: "Server online" });
});

routes.get("/listar/:page", dataController.listar);
routes.get("/exportData", dataController.exportData);

routes.get("/projects/:id", projectsController.show);

routes.get("/users", usersController.index);

routes.post("/login", authController.signIn);

routes.post("/store/projects", projectDataController.storeProject);
routes.post("/store/users", projectDataController.storeUsers);
routes.post("/store/task", tasksController.storeTasks);

export default routes;
