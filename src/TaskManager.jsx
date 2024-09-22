import { useState, useReducer } from "react";


const initialState = [];

const TaskReducer = (state, action) => {
  switch (action.type) {
    case 'addTask' :
      return [...state, { id: Date.now(), text: action.payload, completed: false }];
    case 'deleteTask' :
      return state.filter(task => task.id !== action.payload);
    case 'toggleTask' :
      return state.map(task =>
        task.id === action.payload ? { ...task, completed: !task.completed } : task
      );
    default:
      return state;
  }
};

const TaskManager = () => {
    const [tasks, dispatch] = useReducer(TaskReducer, initialState);
    const [taskText, setTaskText] = useState('');
  
    
    const addTask = () => {
      if (taskText.trim()) {
        dispatch({ type: 'addTask', payload: taskText });
        setTaskText(''); 
      }
    };
  

    const deleteTask = (id) => {
      dispatch({ type: 'deleteTask', payload: id });
    };
  
    
    const toggleTask = (id) => {
      dispatch({ type: 'toggleTask', payload: id });
    };
  
    return (
      <div>
        <h1>Task Management</h1>
        <input
          type="text"
          value={taskText}
          onChange={(e) => setTaskText(e.target.value)}
          placeholder="Enter a new task"
        />
        <button onClick={addTask}>Add Task</button>
  
        <ul>
          {tasks.map((task) => (
            <li key={task.id} style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
              {task.text}
              <button onClick={() => toggleTask(task.id)}>
                {task.completed ? 'Undo' : 'Complete'}
              </button>
              <button onClick={() => deleteTask(task.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    );
  };
  
  export default TaskManager;
  