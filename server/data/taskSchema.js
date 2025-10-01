// Schema for creating a new task
const TaskSchema = {
  type: "object",
  properties: {
    title: {
      type: "string",
      maxLength: 100
    },
    description: {
      type: "string",
      maxLength: 500
    },
    priority: {
      oneOf: [
        { type: "string", enum: ["low", "medium", "high"] },
        { type: "string", maxLength: 0 }
      ]
    },
    completed: {
      type: "boolean"
    }
  },
  required: [],
  additionalProperties: false
};

export default TaskSchema;