import React, { useState, useEffect } from "react";
import "./AddRow.css";
import axios from "axios";

const base_url = process.env.REACT_APP_API_URL;

function AddDevice() {
  const [deviceName, setDeviceName] = useState("");
  const [selectedIndustry, setSelectedIndustry] = useState("");
  const [fee, setFee] = useState("");
  const [options, setOptions] = useState([]);
  const [errors, setErrors] = useState("");

  useEffect(() => {
    const fetchIndustryData = async () => {
      try {
        const response = await axios.get(`${base_url}/api/industries`);
        const industriesData = response.data;

        if (industriesData.industries) {
          setOptions(
            industriesData.industries.map((industry) => ({
              key: industry.industryName,
              value: industry._id,
            }))
          );
        }
      } catch (error) {
        console.error("Error fetching industry data:", error);
      }
    };

    fetchIndustryData();
  }, []);

  const handleFeeChange = (event) => {
    const numericRegex = /^[0-9]*$/;
    const inputValue = event.target.value;

    if (numericRegex.test(inputValue) || inputValue === "") {
      setFee(inputValue);
    }
  };

  const addDeviceHandler = async () => {
    if (deviceName !== "" && fee !== "" && selectedIndustry !== "") {
      try {
        await axios.post(`${base_url}/api/devices`, {
          deviceName: deviceName,
          linkedIndustry: selectedIndustry,
          fee: fee,
        });

        setDeviceName("");
        setSelectedIndustry("");
        setFee("");
        setErrors("");
      } catch (error) {
        console.error("Error adding device:", error);
        setErrors("Error adding device. Please try again.");
      }
    } else {
      setErrors("Please ensure you have filled in all required fields");
    }
  };

  return (
    <div className="add-issue">
      <form>
        <label>
          DeviceName*
          <input
            type="text"
            value={deviceName}
            onChange={(event) => setDeviceName(event.target.value)}
            placeholder="Name of Device..."
            required
          />
        </label>
        <label>
          Linked Industry*
          <select
            value={selectedIndustry}
            onChange={(event) => setSelectedIndustry(event.target.value)}
            required
          >
            <option value="">Select an Industry</option>
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.key}
              </option>
            ))}
          </select>
        </label>
        <label>
          Fee*
          <input
            type="text"
            value={fee}
            onChange={handleFeeChange}
            placeholder="Fee of Device..."
            required
          />
        </label>
        <button type="button" onClick={addDeviceHandler}>
          Add Device
        </button>
        {errors && <p style={{ color: "red" }}>{errors}</p>}
      </form>
      <br />
    </div>
  );
}

export default AddDevice;
