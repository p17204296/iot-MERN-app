import React, { useState } from "react";
import "./EditRow.css";

const base_url = process.env.REACT_APP_API_URL;

const EditIndustry = (props) => {
  const industryId = props.industryID;
  const industriesList = props.industryDetails;
  const [industryName, setIndustryName] = useState("");

  const [errors, setErrors] = useState("");
  const [editSuccess, setEditSuccess] = useState("");

  // console.log("THE props: ", props.industryDetails);
  console.log("THE props: ", industriesList);

  // Change Industry Status
  const editIndustryHandler = async (industryId) => {
    if (industryName !== "") {
      await fetch(`${base_url}/api/industries/${industryId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          industryName: industryName,
        }),
      })
        .then((res) => {
          if (res.ok) {
            console.log("HTTP PATCH Request Successful");
            setEditSuccess("You have Successfully made the edit");
            setErrors("");
          } else {
            console.log("HTTP PATCH Request Unsuccessful");
          }
        })
        .then((res) => res.JSON)
        .catch((err) => console.error(err));
    } else {
      setErrors("Please Ensure you have filed in the required fields");
    }
  };

  return (
    <div className="App grey-card-contianer">
      <div className="popup-box">
        <div className="box" style={{ background: "#f6f6f6" }}>
          <div style={{ background: "white", padding: "6px 6px 3px 6px" }}>
            <h2> Current Industry Details </h2>
            <p>Industry Name: {industriesList.industryName}</p>
          </div>

          <h2> Edit Industry </h2>
          <p style={{ color: "red", textAlign: "center" }}>{errors}</p>
          <p style={{ color: "green", textAlign: "center" }}>{editSuccess}</p>
          <span className="close-icon" onClick={props.handleClose}>
            x
          </span>
          <div></div>
          <div className="add-issue">
            <form>
              <label>
                Industry Name*
                <input
                  type="text"
                  onChange={(event) => setIndustryName(event.target.value)}
                  placeholder="Name of Industry..."
                  required
                />
              </label>
              <button
                className="submit-edit-industry"
                onClick={() => editIndustryHandler(industryId)}
                style={{
                  color: "white",
                  cursor: "pointer",
                  textAlign: "center",
                }}
              >
                Edit Industry
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditIndustry;
