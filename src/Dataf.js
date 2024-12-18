import axios from "axios";
import React, { useState, useEffect } from "react";

const Dataf = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  // Fetch data using useEffect (similar to componentDidMount)
  useEffect(() => {
    axios
      .get("https://spring-production-ce49.up.railway.app/getall")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        setError(error.message);
      });
  }, []);

  // Delete employee by ID
  const deleteEmployee = (id) => {
    axios
      .delete(`https://spring-production-ce49.up.railway.app/delete/${id}`)
      .then(() => {
        // After successful deletion, remove the employee from the state
        setData((prevData) =>
          prevData.filter((employee) => employee.id !== id)
        );
      })
      .catch((error) => {
        setError("Failed to delete employee: " + error.message);
      });
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Employee List</h1>
      {error && <p style={styles.error}>Error: {error}</p>}

      <div style={styles.tableContainer}>
        {data.length > 0 ? (
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.tableHeader}>Name</th>
                <th style={styles.tableHeader}>Salary</th>
                <th style={styles.tableHeader}>Image</th>
                <th style={styles.tableHeader}>Delete</th>
              </tr>
            </thead>
            <tbody>
              {data.map((employee) => (
                <tr key={employee.id} style={styles.tableRow}>
                  <td style={styles.tableCell}>
                    {employee.name.replace(/^"|"$/g, "")}
                  </td>
                  <td style={styles.tableCell}>${employee.sal}</td>
                  <td style={styles.tableCell}>
                    {employee.imgname && (
                      <img
                        src={`https://spring-production-ce49.up.railway.app/images/${employee.imgname}`}
                        alt={employee.name}
                        style={styles.image}
                      />
                    )}
                  </td>
                  <td style={styles.tableCell}>
                    {/* Delete button with onClick event */}
                    <button
                      style={styles.deleteBtn}
                      onClick={() => deleteEmployee(employee.id)} // Pass employee.id
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p style={styles.noData}>No data available</p>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: "20px",
    backgroundColor: "#f4f4f4",
    borderRadius: "8px",
    maxWidth: "900px",
    margin: "20px auto",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
  },
  heading: {
    textAlign: "center",
    color: "#333",
    fontSize: "2.5rem",
    marginBottom: "30px",
  },
  error: {
    color: "red",
    textAlign: "center",
    fontSize: "1.2rem",
    marginTop: "20px",
  },
  tableContainer: {
    overflowX: "auto",
    maxWidth: "100%",
    marginBottom: "20px",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "20px",
  },
  tableHeader: {
    backgroundColor: "#4CAF50",
    color: "white",
    padding: "12px 15px",
    textAlign: "left",
  },
  tableRow: {
    backgroundColor: "#fff",
    borderBottom: "1px solid #ddd",
  },
  tableCell: {
    padding: "12px 15px",
    textAlign: "left",
    border: "1px solid #ddd",
  },
  image: {
    width: "200px",
    height: "100px",
    objectFit: "cover",
  },
  noData: {
    textAlign: "center",
    fontSize: "1.2rem",
    color: "#555",
    marginTop: "20px",
  },
  deleteBtn: {
    backgroundColor: "#f44336",
    color: "white",
    padding: "8px 12px",
    border: "none",
    cursor: "pointer",
    borderRadius: "4px",
  },
};

export default Dataf;
