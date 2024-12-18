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
      const response = await axios.post(
        "https://spring-production-ce49.up.railway.app/empsave",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      alert("Employee saved successfully!");
      console.log(response.data);
    } catch (error) {
      console.error("Error saving employee:", error);
      alert("Failed to save employee!");
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Employee Form</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.formGroup}>
          <label style={styles.label}>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            style={styles.input}
            required
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Salary:</label>
          <input
            type="number"
            name="sal"
            value={formData.sal}
            onChange={handleChange}
            style={styles.input}
            required
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Image:</label>
          <input
            type="file"
            name="img"
            onChange={handleFileChange}
            style={styles.inputFile}
            required
          />
        </div>
        <button type="submit" style={styles.submitButton}>
          Save Employee
        </button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    padding: "40px",
    backgroundColor: "#f7f7f7",
    borderRadius: "10px",
    maxWidth: "600px",
    margin: "50px auto",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
  },
  heading: {
    textAlign: "center",
    fontSize: "2rem",
    color: "#333",
    marginBottom: "30px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  formGroup: {
    marginBottom: "20px",
  },
  label: {
    fontSize: "1rem",
    color: "#555",
    marginBottom: "8px",
    fontWeight: "600",
  },
  input: {
    padding: "12px",
    fontSize: "1rem",
    borderRadius: "8px",
    border: "1px solid #ddd",
    outline: "none",
    width: "100%",
    boxSizing: "border-box",
    backgroundColor: "#fff",
  },
  inputFile: {
    padding: "8px",
    fontSize: "1rem",
    borderRadius: "8px",
    border: "1px solid #ddd",
    outline: "none",
    cursor: "pointer",
  },
  submitButton: {
    backgroundColor: "#4CAF50",
    color: "white",
    padding: "12px 20px",
    border: "none",
    borderRadius: "8px",
    fontSize: "1rem",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
  submitButtonHover: {
    backgroundColor: "#45a049",
  },
};

export default Employee;
