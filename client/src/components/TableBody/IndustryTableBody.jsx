import { useState } from "react";

import {
  HeadingStyles,
  DeviceStyles,
  TitleContainerStyles,
  IndustryTitleStyles,
  DeviceIndustryStyles,
} from "./TableStyles";

import EditIndustry from "../EditRow/EditIndustry";

const base_url = process.env.REACT_APP_API_URL;

const IndustryTableBody = ({ industries }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [popUpID, setPopUpID] = useState("");
  const [popUpDetails, setPopUpDetails] = useState({});

  // Delete industry
  const deleteIndustry = async (industryId) => {
    await fetch(`${base_url}/api/industries/${industryId}`, {
      method: "DELETE",
    });
  };
  const togglePopup = () => {
    setIsOpen(!isOpen);
  };
  function newTogglePopup(industryID, industry) {
    setIsOpen(!isOpen);
    setPopUpID(industryID);
    setPopUpDetails(industry);
  }
  console.log("POPUP", popUpID);
  return (
    <>
      <HeadingStyles>
        <DeviceIndustryStyles>Industry Name:</DeviceIndustryStyles>
      </HeadingStyles>
      {industries.map((industry) => (
        <DeviceStyles key={industry._id}>
          <TitleContainerStyles>
            <IndustryTitleStyles
              onClick={() => newTogglePopup(industry._id, industry)}
            >
              {industry.industryName}
            </IndustryTitleStyles>
            <DeviceIndustryStyles>
              <button onClick={() => newTogglePopup(industry._id, industry)}>
                Edit
              </button>
            </DeviceIndustryStyles>

            <DeviceIndustryStyles>
              <button onClick={() => deleteIndustry(industry._id)}>
                Delete
              </button>
            </DeviceIndustryStyles>
          </TitleContainerStyles>
        </DeviceStyles>
      ))}
      {isOpen && (
        <EditIndustry
          handleClose={togglePopup}
          industryID={popUpID}
          industryDetails={popUpDetails}
        />
      )}
    </>
  );
};

export default IndustryTableBody;
