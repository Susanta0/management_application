const { taskModel } = require("../models/task.models");

const taskController={
    getAllTasks: async (req, res) => {
        // const {title,description,status,priority,creataionDate,userId}=req.body
        
        try {
            const tasks= await taskModel.find().populate("userId").sort({createdAt:-1})
            if(tasks.length===0){
                return res.status(404).json({message:"No tasks found"})
            }
            return res.status(200).json({message:"All tasks", tasks, userId: req.userId})
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
            
        }
    },
    getTaskById: async (req, res) => {
        const { taskId } = req.params;
        const userId = req.userId; // Get userId from the request object set by protect middleware
        try {
            const task = await taskModel.findById(taskId).populate("userId");
            if (!task) {
                return res.status(404).json({ message: "Task not found" });
            }
            return res.status(200).json({ message: "Task found", task, userId });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Internal server error" });
        }
    },
    createTask: async (req, res) => {
        const { title,description,status,priority,creataionDate } = req.body;
        const userId = req.userId; // Get userId from the request object set by protect middleware
        try {
            const newTask = await taskModel.create({
                title,
                description,
                status,
                priority,
                creataionDate,
                userId,
            });
            return res.status(201).json({ message: "Task created", task: newTask, userId });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Internal server error" });
        }
    },
    updateTask: async (req, res) => {
        const { taskId } = req.params;
        const { title, description, status, priority, creataionDate } = req.body;
        const userId = req.userId; // Get userId from the request object set by protect middleware
        try {
            const updatedTask = await taskModel.findByIdAndUpdate(
                taskId,
                { title, description, status, priority, creataionDate },
                { new: true }
            ).populate("userId");
            if (!updatedTask) {
                return res.status(404).json({ message: "Task not found" });
            }
            return res.status(200).json({ message: "Task updated", task: updatedTask, userId });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Internal server error" });
        }
    },
    deleteTask: async (req, res) => {
        const { taskId } = req.params;
        const userId = req.userId; // Get userId from the request object set by protect middleware
        try {
            const deletedTask = await taskModel.findByIdAndDelete(taskId);
            if (!deletedTask) {
                return res.status(404).json({ message: "Task not found" });
            }
            return res.status(200).json({ message: "Task deleted", task: deletedTask, userId });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Internal server error" });
        }
    },
}

module.exports={taskController}