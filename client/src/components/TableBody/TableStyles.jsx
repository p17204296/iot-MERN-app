import styled from "styled-components";

export const HeadingStyles = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 60px;
  text-align: center;
  font-size: 18px;
  font-weight: bold;
  box-shadow: var(--box-shadow);
  margin: 10px;
  background-color: white;
  border-radius: 4px;
`;

export const TitleTabStyles = styled.p`
  font-size: 16px;
  font-weight: 600;
  color: var(--black);
  flex: 2;
  text-align: center;
  padding-left: 10px;
`;

export const DeviceStyles = styled.div`
  display: flex;
  align-items: center;
  height: 70px;
  margin: 5px 10px;
  box-shadow: var(--box-shadow);
  cursor: pointer;
  transition: all 0.1s ease;
  background-color: white;
  border-radius: 4px;

  &:hover {
    scale: 1.01;
  }
`;

export const TitleContainerStyles = styled.div`
  flex: 2;
  display: flex;
  align-items: center;
  object-fit: contain;
`;

export const IndustryTitleStyles = styled.p`
  font-size: 16px;
  font-weight: 500;
  font-align: center;
  width: 100%;
`;

export const IndustryContainerStyles = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const DeviceIndustryStyles = styled.div`
  font-size: 16px;
  font-align: left;
  padding-left: 15px;
  font-weight: 400;
  margin-right: 15px;
`;

export const FeeContainerStyles = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const DeviceFeeStyles = styled.div`
  font-size: 16px;
  font-weight: 400;
`;
