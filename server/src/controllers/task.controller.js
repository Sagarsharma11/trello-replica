import { Task } from "../models/task.model.js";
import { SuccessResponse, ErrorResponse } from "../utils/apiResponse.js";

/**
 * Retrieves all tasks for the authenticated user.
 * @async
 * @function getAllTasks
 * @param {Object} req - The request object containing user information.
 * @param {Object} res - The response object used to send back the desired HTTP response.
 * @returns {Promise<void>} Returns a response with a success message and the list of tasks or an error message.
 */
const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.user.id }).sort({ createdAt: -1 });
    return res.status(200).json(new SuccessResponse('Tasks fetched successfully', tasks, 200));
  } catch (error) {
    return res.status(500).json(new ErrorResponse('Server Error: Unable to fetch tasks.'));
  }
};

/**
 * Creates a new task for the authenticated user.
 * @async
 * @function createTask
 * @param {Object} req - The request object containing the task data.
 * @param {Object} res - The response object used to send back the desired HTTP response.
 * @returns {Promise<void>} Returns a response with a success message and the created task or an error message.
 */
const createTask = async (req, res) => {
  const { title, description, columnId } = req.body;
  if (!title || !columnId) {
    return res.status(400).json(new ErrorResponse('Task must have a title and a valid column.', 400));
  }
  try {
    const newTask = new Task({
      title,
      description,
      columnId,
      userId: req.user.id,
    });
    console.log("hell");
    const savedTask = await newTask.save();
    return res.status(201).json(new SuccessResponse('Task created successfully', savedTask));
  } catch (error) {
    console.log(error);
    return res.status(500).json(new ErrorResponse('Server Error: Could not create task.'));
  }
};

/**
 * Updates an existing task for the authenticated user.
 * @async
 * @function updateTask
 * @param {Object} req - The request object containing the task ID and updated data.
 * @param {Object} res - The response object used to send back the desired HTTP response.
 * @returns {Promise<void>} Returns a response with a success message and the updated task or an error message.
 */
const updateTask = async (req, res) => {
  const { taskId } = req.params;
  const { title, description, columnId } = req.body;

  try {
    let task = await Task.findOne({ _id: taskId, userId: req.user.id });
    if (!task) {
      return res.status(404).json(new ErrorResponse('Task not found.', 404));
    }
    task.title = title || task.title;
    task.description = description || task.description;
    task.columnId = columnId || task.columnId;
    const updatedTask = await task.save();
    return res.status(200).json(new SuccessResponse('Task updated successfully', updatedTask));
  } catch (error) {
    return res.status(500).json(new ErrorResponse('Server Error: Could not update task.'));
  }
};

/**
 * Deletes a task for the authenticated user.
 * @async
 * @function deleteTask
 * @param {Object} req - The request object containing the task ID to delete.
 * @param {Object} res - The response object used to send back the desired HTTP response.
 * @returns {Promise<void>} Returns a response with a success message or an error message.
 */
const deleteTask = async (req, res) => {
  const { taskId } = req.params;
  try {
    const task = await Task.findOneAndDelete({ _id: taskId, userId: req.user.id });
    if (!task) {
      return res.status(404).json(new ErrorResponse('Task not found.', 404));
    }
    return res.status(200).json(new SuccessResponse('Task deleted successfully.'));
  } catch (error) {
    console.log(error);
    return res.status(500).json(new ErrorResponse('Server Error: Could not delete task.'));
  }
};

export const taskController = { getAllTasks, createTask, updateTask, deleteTask };
