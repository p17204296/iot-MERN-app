import { useState } from "react";
import "./AddRow.css";

const base_url = process.env.REACT_APP_API_URL;

function AddIndustry() {
  const [industryName, setIndustryName] = useState("");

  // Post a industry
  const addIndustryHandler = async () => {
    if (industryName !== "") {
      await fetch(`${base_url}/api/industries/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          industryName: industryName,
        }),
      });
    }
  };

  return (
    <div className="add-issue">
      <form>
        <label>
          IndustryName
          <input
            type="text"
            onChange={(event) => setIndustryName(event.target.value)}
            placeholder="Name of Industry..."
            required
          />
        </label>
        <button type="submit" onClick={addIndustryHandler}>
          Add Industry
        </button>
      </form>
      <br />
    </div>
  );
}

export default AddIndustry;
