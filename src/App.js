import React, { useState, useEffect } from 'react';
import Todo from './components/Todo';
import Form from './components/Form';
import FilterButton from './components/FilterButton';
import { nanoid } from 'nanoid';


const FILTER_NAMES = ['All','Active','Completed'];
function App() {


  const [tasks, setTasks] = useState([])
  // const [filter, setFilter] = useState('All');
  const [tabs,setTabs]=useState('All')


  useEffect(() => {
    fetch('http://localhost:3001/')
      .then(response => response.json())
      .then(data => setTasks(data));

  }, [])


  function addTask(task) {

      const newtask={
        task:task
      }
    fetch('http://localhost:3001/addtask',{
        method:"POST",
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify(newtask)

    })
    .then(response => 
      
      {  
         console.log(response);
        return response.json()
      })
    .then(data=>
      {
         console.log(data);
       
        if(data==='Error')
         alert("Duplicate Tasks or Empty tasks are not allowed");

         else
         setTasks(data);
     
    });
      
  }

  function toggleTaskCompleted(id,completed) {

      fetch(`http://localhost:3001/toggleTask`,{
         method:"PATCH",
         headers:{
          'Content-Type':'application/json'
         },
         body:JSON.stringify({
           id:id,
           completed:!completed
         })
      
      })
      .then(response=>response.json())
      .then(data=>setTasks(data))
}

  function deleteTask(id) {

        console.log(id);
        fetch(`http://localhost:3001/deletetask/${id}`,{
          method:"DELETE",

        })
        .then(response=>response.json())
        .then(data=>setTasks(data));

  }

  function editTask(id, newName) {

       console.log(newName);
     
     fetch('http://localhost:3001/editask',{

          method:"PATCH",
          headers:{
            'Content-Type':'application/json'
          },
          body:JSON.stringify({
              id:id,
              newTask:newName,
              
          })
           
     }).then(response=>response.json())
       .then(data=>
        {
          console.log(data);

            if(data==='Error')
            alert("Task already exists");
        else
        setTasks(data)
        
       });

  }

  function fetchTask(name){

    console.log(name)
  
         fetch(`http://localhost:3001/fetchTask/${name}`,{
             method:"GET",
             headers:{
              'Content-Type':'application/json'
             }   
         })
         .then(response=>response.json())
         .then(data=>setTasks(data));

  }


  const filterList = FILTER_NAMES.map((name) => {

    return <FilterButton
      key={name}
      name={name}
      isPressed={name === tabs}
      setTabs={setTabs}
      fetchTask={fetchTask}

      
    />
  })


  const tasklist = tasks.filter((task)=>{
 
          if(tabs==='Active'){
            return !task.completed;
          }

           else if(tabs==='Completed'){
            return task.completed;
           }

           else
           return true;

  }).map(task => {
    return <Todo
      id={task.id}
      name={task.task}
      completed={task.completed}
      key={task.id}
      toggleTaskCompleted={toggleTaskCompleted}
      deleteTask={deleteTask}
      editTask={editTask}
    />
  })

  const headingText = `${tasklist.length} tasks remaining`;
  return (
    <div className="todoapp stack-large">
      <h1>TodoList</h1>
      <Form addTask={addTask} />
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
