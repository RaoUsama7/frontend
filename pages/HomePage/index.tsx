"use client"
import React, { useState } from 'react';
import ProfilePicture from '../../components/ProfilePic';
import TaskBar from '../../components/TaskBar';
import TaskList from '../../components/TaskList';
import '@/styles/styles.css';
const HomePage: React.FC = () => {
  const [tasks, setTasks] = useState<string[]>([]);

  const handleAddTask = (task: string) => {
    setTasks([...tasks, task]);
  };

  return (
    <div className='container mx-auto p-4 flex flex-col items-center justify-center space-y-4'>
      <ProfilePicture  />
      <TaskBar onAddTask={handleAddTask} />
      <TaskList  onDeleteTask={function (id: string): void {
        throw new Error('Function not implemented.');
      } } onUpdateTask={function (id: string, updatedTask: string): void {
        throw new Error('Function not implemented.');
      } } />
    </div>
  );
};

export default HomePage;
