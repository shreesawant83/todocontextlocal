import { useEffect, useState } from 'react';
import './App.css';
import { TodoProvider } from './Context/TodoContext';
import TodoForm from "./Components/TodoForm"
import TodoItem from './Components/TodoItem';

function App() {
  const [todos, setTodos] = useState([]);
  const addTodo = (todo) => {
    setTodos((oldtodo) => [{ id: Date.now(), ...todo }, ...oldtodo])
  };
  const updateTodo = (id, todo) => {
    setTodos((oldtodo) => oldtodo.map((oldtodos) => (oldtodos.id == id ? todo : oldtodos)))
  }
  const deleteTodo = (id) => {
    debugger;
    setTodos((oldtodo) => oldtodo.filter((oldtodos) => oldtodos.id != id))
  }

  const toggleComplete = (id) => {
    setTodos((oldtodo) => oldtodo.map((oldtodos) => oldtodos.id === id ? { ...oldtodos, completed: !oldtodos.completed } : oldtodos))
  }


  useEffect(() => {
    let todo = JSON.parse(localStorage.getItem("todos"));

    if (todo && todo.length > 0) {
      setTodos(todo)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }, [todos])

  return (
    <TodoProvider value={{ todos, addTodo, updateTodo, deleteTodo, toggleComplete }}>
      <div className="bg-[#172842] min-h-screen py-8">
        <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
          <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>
          <div className="mb-4">
            {/* Todo form goes here */}
            <TodoForm />
          </div>
          <div className="flex flex-wrap gap-y-3">
            {/*Loop and Add TodoItem here */}
            {todos.map((todo) => (
              <div key={todo.id} className='w-full'>
                <TodoItem todo={todo} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </TodoProvider>
  );
}

export default App;
