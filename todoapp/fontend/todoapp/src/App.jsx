import React from 'react'
import Inputfield from './components/inputfield'
import { useState } from 'react'
import axios from 'axios'
import { useEffect } from 'react'
import styles from "./App.module.css"


const App = () => {
  let [title, setTitle] = useState("")
  let [description, setDescription] = useState("")
  let [todos, setTodos] = useState([])

  let fetchTodos = async () => {
    try {
      let res = await axios.get("http://localhost:5005/gettodo")
      setTodos(res.data.data)
      console.log(res.data.data);

    } catch (error) {
      console.log("fetch todos error", error.message)
    }
  }

  let handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.post("http://localhost:5005/createtodo", {
        title,
        description,
        isComplete: false,
      });
      setTitle("")
      setDescription("")
      fetchTodos()

    } catch (error) {
      console.log("handle submit ", error.message)
    }

  }


  let deleteTodo = async (id) => {
    try {
      await axios.delete(`http://localhost:5005/deletetodo/${id}`)
      fetchTodos()
    } catch (error) {
      console.log(error.message)
    }
  }

  let editTodo = (todo) => {

    try {
      let newTitle = prompt("Enter new title" , todo.title);
      let newDes = prompt("enter new description" , todo.description)
      if(!newTitle && !newDes ) return;

      axios.put(`http://localhost:5005/updatetodo/${todo._id}` , {
        title : newTitle ,
        description: newDes 
      })

      fetchTodos()

    } catch (error) {
      console.log(error.message)
    }
  }

  useEffect(() => {
    fetchTodos();
  }, [])


  return (
    <div>

      <form onSubmit={handleSubmit}>
        <input type="text" placeholder='Enter Todo Title' value={title} onChange={(e) => setTitle(e.target.value)} />
        <input type="text" placeholder='Enter Todo Description' value={description} onChange={(e) => setDescription(e.target.value)} />

        <button type="submit"  className={styles.addButton} >Add</button>
      </form>


      <h2>Your Todos</h2>
      <div  >
        {todos.map((todo) => (
          <div key={todo._id} className={styles.todoList}>
            <h3>Title: {todo.title}</h3>
            <p>Description: {todo.description}</p>

            <button
              onClick={() => deleteTodo(todo._id)}
              className={styles.deleteButton}
            >
              Delete
            </button>
            <button
              className={styles.editButton}
              onClick={() => editTodo(todo)}
            >Edit</button>
          </div>
        )
        )
        }
      </div>

    </div>
  )
}

export default App
