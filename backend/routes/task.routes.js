const { Router } = require("express");
const { protect } = require("../middlewares/protect");
const { taskController } = require("../controllers/task_controller");
const routes = Router();

routes.get("/get_tasks", protect, taskController.getAllTasks);
routes.get("/:taskId/get_task", protect, taskController.getTaskById);
routes.post("/create_task", protect, taskController.createTask);
routes.put("/:taskId/update_task", protect, taskController.updateTask);
routes.delete("/:taskId/delete_task", protect, taskController.deleteTask);

module.exports = routes;
