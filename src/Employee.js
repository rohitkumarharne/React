import React, { useState } from "react";
import axios from "axios";

const Employee = () => {
  const [formData, setFormData] = useState({
    name: "",
    sal: "",
    img: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      img: e.target.files[0], // Store the uploaded file
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("name", formData.name);
    data.append("sal", formData.sal);
    data.append("img", formData.img);

    try {
      const response = await axios.post("http://localhost:8086/empsave", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Employee saved successfully!");
      console.log(response.data);
    } catch (error) {
      console.error("Error saving employee:", error);
      alert("Failed to save employee!");
    }
  };

  return (
    <div>
      <h2>Employee Form</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Salary:</label>
          <input
            type="number"
            name="sal"
            value={formData.sal}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Image:</label>
          <input type="file" name="img" onChange={handleFileChange} required />
        </div>
        <button type="submit">Save Employee</button>
      </form>
    </div>
  );
};

export default Employee;
