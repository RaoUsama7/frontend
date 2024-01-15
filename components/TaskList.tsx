import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface TaskListProps {
  onDeleteTask: (id: string) => void;
  onUpdateTask: (id: string, updatedTask: string) => void;
}

const TaskList: React.FC<TaskListProps> = ({ onDeleteTask, onUpdateTask }) => {
  const [activeAccordion, setActiveAccordion] = useState<number | null>(null);
  const [isParentAccordionActive, setIsParentAccordionActive] = useState(true); // State for parent accordion

  const [tasks, setTasks] = useState<any[]>([]);
  const [collapsedTasks, setCollapsedTasks] = useState<Record<string, boolean>>({});

  const toggleAccordion = (id: string) => {
    setCollapsedTasks((prevCollapsedTasks) => {
      const updatedState = {
        ...prevCollapsedTasks,
        [id]: !prevCollapsedTasks[id],
      };
      console.log('After Toggle:', updatedState);
      return updatedState;
    });
  };

  const toggleParentAccordion = () => {
    setIsParentAccordionActive(!isParentAccordionActive);
  };
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get('http://localhost:4000/tasks');

        if (response.status === 200) {
          setTasks(response.data);
          const initialCollapsedState: Record<string, boolean> = {};
          response.data.forEach((task: { _id: string | number; }) => {
            initialCollapsedState[task._id] = true; 
          });
          setCollapsedTasks(initialCollapsedState);
        } else {
          console.error('Unexpected response status:', response.status);
        }
      } catch (error) {
        console.error('Error fetching tasks:');
      }
    };

    fetchTasks();
  }, []);

  const handleDeleteTask = async (id: string) => {
    try {
      const response = await axios.delete(`http://localhost:4000/tasks/${id}`);

      if (response.status === 200) {
        setTasks((prevTasks) => prevTasks.filter((task) => task._id !== id));
        onDeleteTask(id);

      } else {
        console.error('Unexpected response status:', response.status);
      }
    } catch (error) {
      console.error('Error deleting task:');
    }
  };

  const handleUpdateTask = async (id: string, updatedTask: string) => {
    try {
      const response = await axios.put(`http://localhost:4000/tasks/${id}`, {
        description: updatedTask,
      });

      if (response.status === 200) {
        setTasks((prevTasks) =>
          prevTasks.map((task) =>
            task._id === id ? { ...task, description: updatedTask } : task
          )
        );
        onUpdateTask(id, updatedTask);
      } else {
        console.error('Unexpected response status:', response.status);
      }
    } catch (error) {
      console.error('Error updating task:');
    }
  };

  return (
    <div className="container mx-auto p-4 flex flex-col items-center justify-center space-y-4">
      <div className="bg-white bg-opacity-80 backdrop-blur-md shadow-md rounded-lg mb-4 w-full max-w-2xl">
        <h2 className="p-4">
          <button
            className="flex justify-between items-center w-full rounded-lg focus:outline-none"
            onClick={toggleParentAccordion}
            aria-expanded={isParentAccordionActive ? 'true' : 'false'}
            aria-controls="collapseParent"
          >
            <span className="text-gray-800 font-semibold text-lg">Your Todos</span>
            <svg className={`w-6 h-6 transform ${isParentAccordionActive ? 'rotate-180' : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </h2>
        <div
          id="collapseParent"
          className={`accordion-collapse ${isParentAccordionActive ? 'show' : ''}`}
          aria-labelledby="headingParent"
        >
          {tasks.length > 0 ? (
            <ul className="space-y-2">
              {tasks.map((task, index) => (
                <li className="bg-white bg-opacity-80 text-dark backdrop-blur-md shadow rounded-lg" key={task._id}>
                  <h2 className={`p-4 text-dark bg-orange-100 ${task.status === 'completed' ? 'flex items-center' : ''}`}>
                    {task.status === 'completed' && (
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 m-1">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                      </svg>

                    )}
                    <button
                      className="flex justify-between items-center w-full rounded-lg focus:outline-none"
                      onClick={() => toggleAccordion(task._id)}
                      aria-expanded={collapsedTasks[task._id] ? 'true' : 'false'}
                      aria-controls={`collapse${task._id}`}
                    >
                      <span className="text-dark font-semibold">{task.title}</span>
                      <svg className={`w-6 h-6 transform ${collapsedTasks[task._id] ? 'rotate-180' : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </h2>
                  <div
                    id={`collapse${task._id}`}
                    className={`accordion-collapse text-gray-700 ${collapsedTasks[task._id] ? 'hidden' : ''}`}
                    aria-labelledby={`heading${task._id}`}
                  >
                    <div className="p-4 bg-orange-200">
                      <p className="text-dark"><b>Description: </b> {task.description}</p>
                      <p className="text-dark"><b>Created At: </b> {task.createdAt}</p>
                      <button className="text-red-500 p-2 rounded-md btn bg-red-200 w-full hover:text-red-700 m-2" onClick={() => handleDeleteTask(task._id)}>Delete</button>
                      {/* <button className="text-blue-500 hover:text-blue-700 m-2" onClick={() => handleUpdateTask(task._id, prompt('Enter updated task:', task.description) || task.description)}>
                        Update
                      </button> */}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-800 text-center">No tasks available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskList;
