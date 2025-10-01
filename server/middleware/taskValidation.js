import Ajv from "ajv";
import addFormats from "ajv-formats";
import TaskSchema from "../data/taskSchema.js";
const ajv = new Ajv();

addFormats(ajv);
const validateTask = ajv.compile(TaskSchema);

function taskValidation(req, res, next) {
    const valid = validateTask(req.body);
  
    if (valid) {
      next();
    } else {
      const error = new Error("Task validation error")
      error.status = 400;
      error.message = validateTask.errors[0].message;
      next(error);
    }
  }
  
  export default taskValidation;