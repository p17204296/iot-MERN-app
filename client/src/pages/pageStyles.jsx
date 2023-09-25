import styled from "styled-components";

export const WrapperStyles = styled.div`
  width: 100%;
  min-height: 20vh;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
`;

export const ContainerStyles = styled.div`
  width: 1300px;
  border-radius: 10px;
  box-shadow: var(--box-shadow);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background-color: white;
`;

export const HeadStyles = styled.div`
  display: flex;
  align-content: center;
  height: 80px;
  background-color: black;
  justify-content: space-between;
`;

export const HeadingStyles = styled.div`
  width: 255px;
  background-color: #ccedff;
  object-fit: contain;
  text-align: center;
  padding-left: 6px;
`;

export const BodyStyles = styled.div`
  height: 400px;
  display: flex;
`;

export const TableContainerStyles = styled.div`
  flex: 3;
  position: relative;
`;

export const FilterContainerStyles = styled.div`
  flex: 1;
`;
