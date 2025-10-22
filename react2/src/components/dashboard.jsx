import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Dashboard() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [data, setData] = useState([]);

  useEffect(() => {
    document.body.style.backgroundColor = "";

    async function fetchData() {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/users/"
        );
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("User not found", error);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    const filtered = users.filter((user) =>
      user.name.toLowerCase().includes(name.toLowerCase())
    );
    setData(filtered);
  }, [name, users]);

  return (
    <div>
      <h1>
        <Link to={"/todo"}>Todo</Link> |{" "}
        <Link to={"/colorchange"}>Color Changer</Link> |{" "}
        <Link to={"/counter"}>Counter</Link>
      </h1>
      <ul>
        {data.length > 0 ? (
          data.map((user) => (
            <li key={user.id}>
              <Link to={`/dashboard/${user.id}`}>{user.name}</Link>
            </li>
          ))
        ) : (
          <li>No users found</li>
        )}
      </ul>

      <input
        placeholder="Search users..."
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
    </div>
  );
}

export default Dashboard;
