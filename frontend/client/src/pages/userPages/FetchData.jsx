import React, { useEffect, useState } from "react";

import axios from "axios";
export default function FetchData() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get("http://localhost:5000/api/users/get");
        const data = response.data;
        setUsers(data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="users-detail">
      <h1>List of Users</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Id</th>
            <th>Role</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.email}>
              <td>{user.name}</td>
              <td>{"_"}</td>
              <td>{user.role}</td>
              <td>{user.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
