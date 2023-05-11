import React, { useState } from 'react';
import Todo from './components/Todo';
import Form from './components/Form';
import FilterButton from './components/FilterButton';
import {nanoid} from 'nanoid';

const FILTER_MAP={

   All:()=>true,
   Active:(task)=>!task.completed,
   Completed:(task)=>task.completed
};

const FILTER_NAMES=Object.keys(FILTER_MAP);
function App(props) {

    
    const [tasks,setTasks]=useState(props.tasks)
    const [filter,setFilter]=useState('All');
   
    
     const filterList=FILTER_NAMES.map((name)=>{

        return <FilterButton 
        key={name} 
        name={name}
        isPressed={name===filter}
        setFilter={setFilter}
        />
     })
  function addTask(task){

    const newTask={
      id: `todo-${nanoid()}`, 
      name:task, 
      completed: false
    }

      setTasks([...tasks,newTask]);
     
 }
   function toggleTaskCompleted(id){
       
      const updatedTasks = tasks.map((task)=>{

           if(id===task.id)
            {
              return {
                ...task,completed:!task.completed
              }
            }

             return task;
       })

        setTasks(updatedTasks);
   }

    function deleteTask(id){

         const remainingTasks=tasks.filter(item=>{

            return id!==item.id;
         })

          setTasks(remainingTasks);
       
    }

     function editTask(id,newName){
  
        const editedTasks=tasks.map(task=>{

             if(id===task.id){
              
                const newTask={

                    ...task,
                    name:newName
                     
                }
                //  console.log(newTask);
             return newTask;
             }

             return task;
        })
          

         setTasks(editedTasks);
        

     }
     
 

    const tasklist=tasks.filter(FILTER_MAP[filter]).map(task=>{
    return    <Todo 
               id={task.id}
               name={task.name} 
               completed={task.completed} 
               key={task.id} 
               toggleTaskCompleted={toggleTaskCompleted} 
               deleteTask={deleteTask}
               editTask={editTask}
               />
})

  const headingText=`${tasklist.length} tasks remaining`;
  return (
    <div className="todoapp stack-large">
      <h1>TodoList</h1>
      <Form addTask={addTask}/>
      <div className="filters btn-group stack-exception">
        
        {filterList}
        
      </div>
      <h2 id="list-heading">{headingText}</h2>
      <ul
        role="list"
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading">
      
           {tasklist}
      
      </ul>
    </div>
  );
}


export default App;
