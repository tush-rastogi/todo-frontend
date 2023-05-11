import React from 'react';
import {createRoot } from 'react-dom/client';
import App from './App';
import './index.css';

const container =document.getElementById('root');
const root=createRoot(container);

const DATA=[
 
  { id: "todo-0", name: "Eat", completed: true },
  { id: "todo-1", name: "Sleep", completed: false },
  { id: "todo-2", name: "Repeat", completed: false }
    
]

root.render(
  <App tasks={DATA}/>
 
);
