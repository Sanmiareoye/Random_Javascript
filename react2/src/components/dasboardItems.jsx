import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { ThemeContext } from "../context/themeContext";
import { AuthContext } from "../context/authContext";
import LoginPage from "./loginPage";

function DashboardItems() {
  const { id } = useParams();
  const [todos, setTodos] = useState([]);
  const { theme, setTheme } = useContext(ThemeContext);
  const { isAuthenticated, logout } = useContext(AuthContext);

  useEffect(() => {
    if (isAuthenticated) {
      fetch(`https://jsonplaceholder.typicode.com/users/${id}/todos`)
        .then((response) => response.json())
        .then((data) => setTodos(data))
        .catch((error) => console.error("Error fetching users:", error));
    }
  }, [id, isAuthenticated]);

  return (
    <div>
      <button
        onClick={() =>
          setTheme(theme === "white" ? "rgb(69, 184, 177)" : "white")
        }
      >
        {theme}
      </button>
      {isAuthenticated ? (
        <div>
          <h1>User Todos</h1>
          <ul>
            {todos.map((todo) => (
              <li key={todo.id}>
                <h3>{todo.title}</h3>
                <p>Status: {todo.completed ? "Completed" : "Pending"}</p>
              </li>
            ))}
          </ul>{" "}
          <button onClick={logout}>Logout</button>
        </div>
      ) : (
        <LoginPage />
      )}
    </div>
  );
}

export default DashboardItems;
