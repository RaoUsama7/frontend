import React, { useState } from "react";
import axios from "axios";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Alert } from "react-bootstrap";
import { AlertTitle, AlertDescription } from "./ui/alert";
import { Button } from "./ui/button";

interface TaskBarProps {
  onAddTask: (task: string) => void;
}

const TaskBar: React.FC<TaskBarProps> = ({ onAddTask }) => {
  const [task, setTask] = useState('');
  const [showForm, setShowForm] = useState(false); // Change initialization to true
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('pending');
  const [alert, setAlert] = useState({ show: false, variant: 'success', message: '' });
  const [inputValue, setInputValue] = React.useState("");

  const handleAddTask = async () => {
    if (title.trim() && description.trim()) {
      try {
        const response = await axios.post('http://localhost:4000/tasks/', {
          title: title.trim(),
          description: description.trim(),
          status,
        });

        if (response.status === 201) {
          onAddTask(title.trim());
          setTask('');
          setShowForm(false);
          setAlert({ show: true, variant: 'success', message: 'Task created successfully' });
        } else {
          console.error('Unexpected response status:', response.status);
          setAlert({ show: true, variant: 'danger', message: 'Task not created. An unexpected error occurred.' });
        }
      } catch (error) {
        console.error('Error adding task:');
        setAlert({ show: true, variant: 'danger', message: 'Task not created. An unexpected error occurred.' });
      }
    }
  };

 return (
  <Card className="w-full max-w-md bg-transparent text-dark p-4 rounded-lg border-transparent">
    <CardContent>
      <form>
        <div className="flex items-center mb-4">
          <div className="flex-grow">
            <Input
              id="taskInput"
              placeholder="Enter your task"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="border p-2 rounded-l-md bg-neutral text-dark w-full"
            />
          </div>
          <button
            type="button"
            onClick={() => setShowForm(!showForm)}
            className="bg-yellow-600 btn-md m-2 text-dark p-2 rounded-lg"
          >
            +
          </button>
        </div>
        {showForm && (
          <div className="form-container">
            <Input
      id="taskInput"
      type="text"
      placeholder="Title"
      value={title}
      onChange={(e) => setTitle(e.target.value)}
      className="border p-2 rounded-l-md bg-neutral text-dark w-full"
    />
   
    <Input
      id="taskInput"
      type="text"
      placeholder="Description"
      value={description}
      onChange={(e) => setDescription(e.target.value)}
      className="border p-2 rounded-l-md bg-neutral text-dark w-full"
    />
    <select value={status} onChange={(e) => setStatus(e.target.value)}>
      <option value="pending">Pending</option>
      <option value="completed">Completed</option>
    </select>
    <button
      onClick={handleAddTask}
      className="bg-yellow-600 btn-md m-2 text-dark p-2 rounded-lg"
      disabled={!title.trim() || !description.trim()} 
    >
      Add
    </button>
  </div>
        )}
        {alert.show && (
          <Alert>
            
            <AlertTitle>Heads up!</AlertTitle>
            <AlertDescription>
              Created
            </AlertDescription>
          </Alert>
        )}
      </form>
    </CardContent>
  </Card>
);

};

export default TaskBar;
