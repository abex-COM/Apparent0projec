import React, { useState, useEffect } from "react";
import { MDBInput, MDBBtn } from "mdbreact";
import { Link } from "react-router-dom";

import axios from "axios";

const TaskPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    summary: "",
    description: "",
  });
  const [tasks, setTasks] = useState([]);
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setIsLoading(true);
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found. Please sign in again.");
      }

      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };

      const response = await axios.post(
        "http://localhost:5000/api/task/createtask",
        {
          summary: formData.summary,
          description: formData.description,
        },
        { headers }
      );

      setTasks([...tasks, response.data]);
      setIsLoading(false);
    } catch (error) {
      console.error(
        "Error creating task:",
        error.response?.data || error.message || error
      );
      alert(
        "Error creating task: " +
          (error.response?.data?.message || error.message)
      );
    }
  };
  async function handleDelete(){
    try {
      const response = await axios.get("http://localhost:5000/api/task/get");

      const data = response.data;
        console.log(data)
    } catch (error) {
      console.error(error);
    }
  }
  
  // Fetch tasks on component mount
  useEffect(() => {
    setIsLoading(true);
    async function fetchTasks() {
      try {
        const response = await axios.get("http://localhost:5000/api/task/get");

        const data = response.data;
        setTasks(data);

        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    }
    fetchTasks();
   
  }, []);

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <p className="h4 text-center py-4">Create Task</p>
        <div className="grey-text">
          <textarea
            placeholder="Summary"
            label="Task Summary"
            type="text"
            name="summary"
            value={formData.summary}
            onChange={handleInputChange}
          />

          <textarea
            placeholder="Description"
            type="textarea"
            rows="2"
            label="Task Description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
          />
        </div>
        <button>Submit</button>
        
      </form>
      <div className="table">
        <h1>Tasks List</h1>
        {tasks.length === 0 ? (
          "No Tasks"
        ) : isLoading ? (
          "Loading..."
        ) : (
          <div className="task">
            <table>
              <thead>
                <th>No.</th>
                <th>Task Description</th>
                <th>Task Summary</th>
                <th>delete task</th>
              </thead>
              <tbody>
                {tasks.map((task, index) => (
                  <tr key={task._id}>
                    <td className="number">{index + 1}</td>
                    <td>{task.description}</td>
                    <td>{task.summary}</td>
                    <td><button onClick={handleDelete}>&#10060;</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskPage;
