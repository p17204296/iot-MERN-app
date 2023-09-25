import styled from "styled-components";

export const SortContainerStyles = styled.div`
  height: 60px;
  margin: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: var(--box-shadow);
  background-color: white;
  border-radius: 4px;
`;

export const SortByStyles = styled.p`
  font-size: 16px;
  font-weight: 500;
`;
export const SelectStyles = styled.select`
  width: 180px;
  height: 30px;
  margin-left: 4px;
  border-radius: 4px;
  border: 1px solid var(--black);
  outline: none;
  cursor: pointer;
  padding: 5px;
`;
export const ArrowBtnStyles = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 30px;
  width: 30px;
  outline: none;
  border: 1px solid var(--black);
  margin-left: 5px;
  border-radius: 4px;
  background-color: transparent;
  cursor: pointer;
`;
export const ArrowDirectionStyles = styled.p`
  font-size: 18px;
  font-weight: bold;
  color: var(--black);
`;
