import axios from "axios";
import React, { Component } from "react";

class Dataf extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      error: null,
    };
  }
  deletebyid(id) {
    axios.delete("http://localhost:8086/delete/${id}");
  }
  componentDidMount() {
    axios
      .get("http://localhost:8086/getall") // Fetch employee data from the backend
      .then((response) => {
        this.setState({
          data: response.data,
        });
      })
      .catch((error) => {
        this.setState({
          error: error.message,
        });
      });
  }

  render() {
    return (
      <div style={styles.container}>
        <h1 style={styles.heading}>Employee List</h1>
        {this.state.error && (
          <p style={styles.error}>Error: {this.state.error}</p>
        )}

        <div style={styles.tableContainer}>
          {this.state.data.length > 0 ? (
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
                {this.state.data.map((employee) => (
                  <tr key={employee.id} style={styles.tableRow}>
                    <td style={styles.tableCell}>
                      {employee.name.replace(/"/g, "")}
                    </td>{" "}
                    {/* Remove quotes from name */}
                    <td style={styles.tableCell}>${employee.sal}</td>
                    <td style={styles.tableCell}>
                      {employee.imgname && (
                        <img
                          src={`http://localhost:8086/images/${employee.imgname}`} // Dynamically fetch image from Spring Boot
                          alt={employee.name}
                          style={styles.image} // Adjust image size
                        />
                      )}
                    </td>
                    <td style={styles.tableCell}>
                      <button> Delete</button>
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
  }
}

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
};

export default Dataf;
