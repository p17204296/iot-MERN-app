import {
  HeadingStyles,
  TitleTabStyles,
  DeviceStyles,
  TitleContainerStyles,
  IndustryTitleStyles,
} from "./TableStyles";

const IndustryTableBody = ({ industries }) => {
  let currentDate = new Date();
  console.log(currentDate);
  return (
    <>
      <HeadingStyles>
        <TitleTabStyles>Industry Name</TitleTabStyles>
      </HeadingStyles>
      {console.log("Table body:", industries)}
      {industries.map((industry) => (
        <DeviceStyles key={industry._id}>
          <TitleContainerStyles>
            <IndustryTitleStyles>{industry.industryName}</IndustryTitleStyles>
          </TitleContainerStyles>
        </DeviceStyles>
      ))}
    </>
  );
};

export default IndustryTableBody;
