import React, { useState, useEffect } from "react";
import "./EditRow.css";
import axios from "axios";

const base_url = process.env.REACT_APP_API_URL;

const EditDevice = (props) => {
  const deviceId = props.deviceID;
  const deviceDetails = props.deviceDetails;
  const [deviceName, setDeviceName] = useState(deviceDetails.deviceName);
  const [fee, setFee] = useState(deviceDetails.fee);
  const [linkedIndustry, setLinkedIndustry] = useState(
    deviceDetails.linkedIndustry
  );

  const [errors, setErrors] = useState("");
  const [editSuccess, setEditSuccess] = useState("");
  const [options, setOptions] = useState([]);

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

  // Change Device Status
  const editDeviceHandler = async (deviceId) => {
    if (deviceName !== "" && fee !== "" && linkedIndustry !== "") {
      await fetch(`${base_url}/api/devices/${deviceId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          deviceName: deviceName,
          fee: fee,
          linkedIndustry: linkedIndustry,
        }),
      })
        .then((res) => {
          if (res.ok) {
            console.log("HTTP PATCH Request Successful");
            setEditSuccess("You have successfully made the edit");
            setErrors("");
          } else {
            console.log("HTTP PATCH Request Unsuccessful");
          }
        })
        .then((res) => res.JSON)
        .catch((err) => console.error(err));
    } else {
      setErrors("Please ensure you have filled in all required fields");
    }
  };

  return (
    <div className="App grey-card-contianer">
      <div className="popup-box">
        <div className="box" style={{ background: "#f6f6f6" }}>
          <div style={{ background: "white", padding: "6px 6px 3px 6px" }}>
            <h2> Current Device Details </h2>
            <p>Device Name: {deviceDetails.deviceName}</p>
            <p>Fee: {deviceDetails.fee}</p>
            <p>Linked Industry: {deviceDetails.linkedIndustry}</p>
          </div>

          <h2> Edit Device </h2>
          <p style={{ color: "red", textAlign: "center" }}>{errors}</p>
          <p style={{ color: "green", textAlign: "center" }}>{editSuccess}</p>
          <span className="close-icon" onClick={props.handleClose}>
            x
          </span>
          <div></div>
          <div className="add-issue">
            <form>
              <label>
                Device Name*
                <input
                  type="text"
                  value={deviceName}
                  onChange={(event) => setDeviceName(event.target.value)}
                  placeholder="Name of Device..."
                  required
                />
              </label>
              <label>
                Fee*
                <input
                  type="text"
                  value={fee}
                  onChange={(event) => setFee(event.target.value)}
                  placeholder="Fee of Device..."
                  required
                />
              </label>
              <label>
                Linked Industry*
                <select
                  value={linkedIndustry}
                  onChange={(event) => setLinkedIndustry(event.target.value)}
                >
                  <option value={linkedIndustry}>{linkedIndustry}</option>
                  {options.map((option) => (
                    <option key={option.value} value={option.key}>
                      {option.key}
                    </option>
                  ))}
                </select>
              </label>
              <button
                className="submit-edit-industry"
                onClick={() => editDeviceHandler(deviceId)}
                style={{
                  color: "white",
                  cursor: "pointer",
                  textAlign: "center",
                }}
              >
                Edit Device
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditDevice;
