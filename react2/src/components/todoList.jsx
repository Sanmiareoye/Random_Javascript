import { useEffect, useState } from "react";
import "../index.css";

function Todo() {
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem("todos");
    return saved
      ? JSON.parse(saved)
      : [{ id: Date.now(), text: "Hey, write your first todo :)" }];
  });
  const [newTodo, setNewTodo] = useState("");

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);
  useEffect(() => {
    const saved = localStorage.getItem("todos");
    if (saved) {
      setTodos(JSON.parse(saved));
    }
  }, []);

  const handleTodos = () => {
    if (!newTodo.trim()) return;

    const todoObj = { id: Date.now(), text: newTodo };
    setTodos([...todos, todoObj]);
    setNewTodo("");
  };

  const deleteTodo = (id) => {
    const result = todos.filter((todo) => todo.id !== id);
    setTodos(result);
  };
  return (
    <div>
      <h1 className="spin-on-hover">🔄</h1>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            {todo.text} <button onClick={() => deleteTodo(todo.id)}>x</button>
          </li>
        ))}
      </ul>
      <p>{newTodo}</p>
      <input
        placeholder="Type Todo"
        value={newTodo}
        onChange={(e) => {
          setNewTodo(e.target.value);
        }}
      />

      <button onClick={handleTodos}>Submit</button>
    </div>
  );
}
export default Todo;
