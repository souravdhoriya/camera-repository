import React, { useState } from "react";
import Select from "react-select"; 
import { CiCloudOn } from "react-icons/ci";
import { CircularProgressbar } from "react-circular-progressbar";
import { PiDeviceTabletThin } from "react-icons/pi";
import { RiErrorWarningLine } from "react-icons/ri";
import { RxCrossCircled } from "react-icons/rx";

import "react-circular-progressbar/dist/styles.css";

const FilterableTable = ({ data }) => {
    
    
  const [locationFilter, setLocationFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedItems, setSelectedItems] = useState([]);
  

  const handleCheckboxChange = (item) => {
    const updatedItems = selectedItems.includes(item)
      ? selectedItems.filter((i) => i !== item)
      : [...selectedItems, item];
    setSelectedItems(updatedItems);
  };

  const filteredData = data.filter((item) => {
    const matchesLocation =
      locationFilter === "All" || item.location === locationFilter;
    const matchesStatus =
      statusFilter === "All" || item.status === statusFilter;
    return matchesLocation && matchesStatus;
  });

  const locationOptions = [
    { value: "All", label: "All Locations" },
    { value: "San Francisco, CA", label: "San Francisco, CA" },

   {value:"Miami, FL",label:"Miami, FL"},
    { value: "Philadelphia, PA", label: "Philadelphia, PA" },
    { value: "Denver, CO", label: "Denver, CO" },
    {value:"San Diego, CA",label:"San Diego, CA"},
    {value:"Chicago, IL" ,label:"	Chicago, IL"},
  ];

  const statusOptions = [
    { value: "All", label: "All" },
    { value: "Active", label: "Active" },
    { value: "Inactive", label: "Inactive" },
  ];

  return (
    <div>
      <div className="header-filters">
        <Select
          options={locationOptions}
          value={locationOptions.find((option) => option.value === locationFilter)}
          onChange={(selectedOption) => setLocationFilter(selectedOption.value)}
          placeholder="Select Location"
          className="custom-select"
        />

        <Select
          options={statusOptions}
          value={statusOptions.find((option) => option.value === statusFilter)}
          onChange={(selectedOption) => setStatusFilter(selectedOption.value)}
          placeholder="Select Status"
          className="custom-select"
        />
      </div>

      
      <table border="1" style={{ width: "100%" }}>
        <thead>
          <tr>
            <th>Select</th>
            <th>Name</th>
            <th>Health</th>
            <th>Location</th>
            <th>Recorder</th>
            <th>Task</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((item, index) => (
            <tr key={index}>
              <td>
                <input
                  type="checkbox"
                  onChange={() => handleCheckboxChange(item)}
                  checked={selectedItems.includes(item)}
                />
              </td>
              <td>
                <div style={{ display: "flex", alignItems: "center" }}>
 
  <div
    style={{
      width: "10px",
      height: "10px",
      borderRadius: "50%",
      backgroundColor: item.status === "Active" ? "#4caf50" : "#f44336",
      marginRight: "8px",
    }}
  ></div>
  
 
  <span>{item.name}</span>
  

  {item.hasWarning === true && (
    <div style={{ marginLeft: "8px", color: "orange" }}>
      <RiErrorWarningLine size={18} />
    </div>
  )}
</div>

              </td>
              <td>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    width: 150,
                  }}
                >
                  <div>
                    <CiCloudOn size={24} color="#A0A0A0" />
                  </div>
                  <div style={{ width: 30, height: 30 }}>
                    <CircularProgressbar
                      value={75}
                      text={item.health.cloud}
                      styles={{
                        path: {
                          stroke: item.health.cloud === "A" ? "#4caf50" : "#ffa500",
                          strokeWidth: 5,
                        },
                        trail: {
                          stroke: "#f4f4f4",
                        },
                        text: {
                          fill: "#000",
                          fontSize: "32px",
                        },
                      }}
                    />
                  </div>
                  <div>
                    <PiDeviceTabletThin size={24} color="#A0A0A0" />
                  </div>
                  <div style={{ width: 30, height: 30 }}>
                    <CircularProgressbar
                      value={75}
                      text={item.health.device}
                      styles={{
                        path: {
                          stroke: item.health.device === "A" ? "#4caf50" : "#ffa500",
                          strokeWidth: 5,
                        },
                        trail: {
                          stroke: "#f4f4f4",
                        },
                        text: {
                          fill: "#000",
                          fontSize: "32px",
                        },
                      }}
                    />
                  </div>
                </div>
              </td>
              <td>{item.location}</td>
              <td>{item.recorder ? item.recorder : "NA"}</td>
              <td>{item.tasks} Tasks</td>
              <td>
                <button
                  style={{
                    backgroundColor:
                      item.status === "Active" ? "#029262" : "#F0F0F0",
                    color: item.status === "Active" ? "green" : "black",
                    border: "none",
                  }}
                >
                  {item.status}
                </button>
              </td>
              <td>
                
              <RxCrossCircled />

              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

};

export default FilterableTable;
