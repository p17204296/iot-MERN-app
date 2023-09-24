import {
  HeadingStyles,
  TitleTabStyles,
  DeviceStyles,
  TitleContainerStyles,
  DeviceTitleStyles,
  IndustryContainerStyles,
  DeviceIndustryStyles,
  FeeContainerStyles,
  DeviceFeeStyles,
} from "./TableStyles";

const TableBody = ({ devices }) => {
  let currentDate = new Date();
  console.log(currentDate);
  return (
    <>
      <HeadingStyles>
        <TitleTabStyles>Device Name</TitleTabStyles>
        <TitleTabStyles>Linked Industry</TitleTabStyles>
        <TitleTabStyles>Fee</TitleTabStyles>
        <TitleTabStyles>Warehouse Addition Time</TitleTabStyles>
      </HeadingStyles>
      {console.log("Table body:", devices)}
      {devices.map((device) => (
        <DeviceStyles key={device._id}>
          <TitleContainerStyles>
            <DeviceIndustryStyles>{device.deviceName}</DeviceIndustryStyles>
          </TitleContainerStyles>
          <IndustryContainerStyles>
            <DeviceIndustryStyles>{device.linkedIndustry}</DeviceIndustryStyles>
          </IndustryContainerStyles>
          <FeeContainerStyles>
            <DeviceIndustryStyles>£{device.fee}</DeviceIndustryStyles>
          </FeeContainerStyles>
          <FeeContainerStyles>
            <DeviceIndustryStyles>
              {device.warehouseAdditionTime}
            </DeviceIndustryStyles>
          </FeeContainerStyles>
        </DeviceStyles>
      ))}
    </>
  );
};

export default TableBody;
