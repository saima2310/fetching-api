import React, { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";

function UserDetails() {
  const { id } = useParams(); // Access the 'id' parameter from the URL
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then((response) => response.json())
      .then((data) => setUser(data))
      .catch((error) => console.error("Error fetching user details: ", error));
  }, [id]); // Include 'id' as a dependency in the useEffect

  return (
    <div className="user-details">
      <h2>User Details</h2>
      {user ? (
        <div>
          <p>Name: {user.name}</p>
          <p>Username: {user.username}</p>
          <p>Email: {user.email}</p>
          <p>Phone: {user.phone}</p>
          <Link to="/">Back to Home</Link>
        </div>
      ) : (
        <p>Loading user details...</p>
      )}
    </div>
  );
}

function Home({ users }) {
  return (
    <ul className="user-list">
      {users.map((user) => (
        <li key={user.id} className="user-card">
          <p>Name: {user.name}</p>
          <p>Username: {user.username}</p>
          <p>Name: {user.name}</p>
          <p>Username: {user.username}</p>
          <Link to={`/details/${user.id}`}>View Details</Link>
        </li>
      ))}
    </ul>
  );
}

function App() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // Initialize the search term state

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error("Error fetching user data: ", error));
  }, []);

  const filteredUsers = searchTerm
    ? users.filter((user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : users;

  return (
    <Router>
      <div className="app">
        <h1>User Details App</h1>
        <input
          type="text"
          placeholder="Search by name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <ul className="user-list">
          {filteredUsers.map((user) => (
            <li key={user.id} className="user-card">
              <p>Name: {user.name}</p>
              <p>Username: {user.username}</p>
              <p>Phone: {user.phone}</p>
              <p>Street: {user.address.street}</p>

              <Link to={`/details/${user.id}`}>View Details</Link>
            </li>
          ))}
        </ul>
      </div>
    </Router>
  );
}

export default App;
