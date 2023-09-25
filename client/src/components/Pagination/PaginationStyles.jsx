import styled from "styled-components";

export const PaginationContainerStyles = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: calc(100% - 20px);
  margin: 0 10px;
  height: 45px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const PageBtnStyles = styled.button`
  outline: none;
  border: none;
  font-size: 14px;
  font-weight: 500;
  border-radius: 5px;
  outline: none;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 5px;
  box-shadow: var(--box-shadow);
  cursor: pointer;
  background-color: white;
`;

export const ActiveStyles = styled.button`
  background-color: var(--blue);
  color: white;
  outline: none;
  border: none;
  font-size: 14px;
  font-weight: 500;
  border-radius: 5px;
  outline: none;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 5px;
  box-shadow: var(--box-shadow);
  cursor: pointer;
`;
