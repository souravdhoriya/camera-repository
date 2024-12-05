import React, { useState, useEffect } from "react";
import Table from "./components/Table";
import "./App.css";
import { FaSearch } from "react-icons/fa";

function App() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  
  const fetchCameras = async () => {
    try {
      const response = await fetch(
        "https://api-app-staging.wobot.ai/app/v1/fetch/cameras",
        {
          headers: {
            Authorization: `Bearer 4ApVMIn5sTxeW7GQ5VWeWiy`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch cameras: ${response.status}`);
      }

      const result = await response.json();
      setData(result.data);
      setFilteredData(result.data);
    } catch (error) {
      console.error("Error fetching cameras:", error.message);
    }
  };


  const updateStatus = async (id, status) => {
    try {
      const response = await fetch(
        "https://api-app-staging.wobot.ai/app/v1/update/camera/status",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer 4ApVMIn5sTxeW7GQ5VWeWiy`,
          },
          body: JSON.stringify({ id, status }),
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to update status: ${response.status}`);
      }

      const updatedData = data.map((item) =>
        item.id === id ? { ...item, status } : item
      );
      setData(updatedData);
      setFilteredData(updatedData);
    } catch (error) {
      console.error("Error updating status:", error.message);
    }
  };

  useEffect(() => {
    fetchCameras();
  }, []);

  const handleSearch = (query) => {
    setSearchQuery(query);
    const filtered = data.filter((item) =>
      item.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredData(filtered);
    setCurrentPage(1);
  }


  const handleStatusToggle = (id) => {
    const currentStatus = data.find((item) => item.id === id).status;
    const newStatus = currentStatus === "Active" ? "Inactive" : "Active";
    updateStatus(id, newStatus);
  };

  
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <div className="main-section">
        <h1>Cameras</h1>
        <div style={{ position: "relative", display: "inline-block" }}>
          <input
            type="text"
            className="input-field"
            name="search"
            placeholder="Search.."
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            style={{
              paddingRight: "30px",
              border: "1px solid #ccc",
              borderRadius: "6px",
              height: "40px",
              width: "240px",
              backgroundColor: "#F3F3F4",
            }}
          />
          <FaSearch
            style={{
              position: "absolute",
              right: "8px",
              top: "25%",
              transform: "translateY(-50%)",
              color: "#aaa",
              cursor: "pointer",
            }}
          />
        </div>
      </div>
      <div>
        <p>Manage your cameras here</p>
      </div>
      <Table
        data={currentItems}
        handleStatusToggle={handleStatusToggle}
      />
      <div className="pagination">
        {Array.from(
          { length: Math.ceil(filteredData.length / itemsPerPage) },
          (_, i) => (
            <button
              key={i}
              onClick={() => paginate(i + 1)}
              style={{
                backgroundColor: currentPage === i + 1 ? "#007BFF" : "#f1f1f1",
                color: currentPage === i + 1 ? "white" : "black",
                border: "1px solid #ccc",
                padding: "5px 10px",
                margin: "0 5px",
                cursor: "pointer",
              }}
            >
              {i + 1}
            </button>
          )
        )}
      </div>
    </>
  );
}

export default App;
