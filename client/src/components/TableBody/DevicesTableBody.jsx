import React, { useState } from "react";
import moment from "moment";
import EditDevice from "../EditRow/EditDevice";

import {
  HeadingStyles,
  TitleTabStyles,
  DeviceStyles,
  IndustryContainerStyles,
  FeeContainerStyles,
  DeviceFeeStyles,
} from "./TableStyles";

const base_url = process.env.REACT_APP_API_URL;

const DevicesTableBody = ({ devices, linkedIndustries }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [popUpID, setPopUpID] = useState("");
  const [popUpDetails, setPopUpDetails] = useState({});

  const deleteDevice = async (deviceId) => {
    await fetch(`${base_url}/api/devices/${deviceId}`, {
      method: "DELETE",
    });
  };

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  function newTogglePopup(deviceID, device) {
    setIsOpen(!isOpen);
    setPopUpID(deviceID);
    setPopUpDetails(device);
  }

  return (
    <>
      <HeadingStyles>
        <DeviceFeeStyles>Device Name</DeviceFeeStyles>
        <TitleTabStyles>Linked Industry</TitleTabStyles>
        <TitleTabStyles>Fee</TitleTabStyles>
        <TitleTabStyles>Warehouse Addition Time</TitleTabStyles>
        <TitleTabStyles>Action</TitleTabStyles>
      </HeadingStyles>
      {devices.map((device) => (
        <DeviceStyles key={device._id}>
          <DeviceFeeStyles>{device.deviceName}</DeviceFeeStyles>
          <IndustryContainerStyles>
            {device.linkedIndustry}
          </IndustryContainerStyles>
          <FeeContainerStyles>£{device.fee}</FeeContainerStyles>
          <FeeContainerStyles>
            {moment(device.warehouseAdditionTime).format(
              "MMMM Do YYYY, h:mm a"
            )}
          </FeeContainerStyles>
          <FeeContainerStyles>
            <button onClick={() => newTogglePopup(device._id, device)}>
              Edit
            </button>
            <button onClick={() => deleteDevice(device._id)}>Delete</button>
          </FeeContainerStyles>
        </DeviceStyles>
      ))}
      {isOpen && (
        <EditDevice
          handleClose={togglePopup}
          deviceID={popUpID}
          deviceDetails={popUpDetails}
          linkedIndustries={linkedIndustries}
        />
      )}
    </>
  );
};

export default DevicesTableBody;
