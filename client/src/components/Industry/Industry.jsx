import React from "react";
import styled from "styled-components";

const Container = styled.div`
  margin: 10px;
  align-items: flex-start;
  padding: 10px 20px;
  box-shadow: var(--box-shadow);
  background-color: white;
  border-radius: 4px;
`;

const Heading = styled.h1`
  margin: 0;
  font-size: 16px;
  margin: 10px;
  text-align: center;
`;

const IndustryContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

const IndustryItem = styled.div`
  min-width: 90px;
  display: flex;
  align-items: center;
  margin: 2px 0;
`;

const IndustryLabel = styled.p`
  margin: 0;
  margin-left: 5px;
`;

const Industry = ({ industries, filterIndustry, setFilterIndustry }) => {
  const onChange = ({ currentTarget: input }) => {
    if (input.checked) {
      const state = [...filterIndustry, input.value];
      setFilterIndustry(state);
    } else {
      const state = filterIndustry.filter((val) => val !== input.value);
      setFilterIndustry(state);
    }
  };

  return (
    <Container>
      <Heading>Filter By Industry</Heading>
      <IndustryContainer>
        {industries.map((industry) => (
          <IndustryItem key={industry}>
            <input type="checkbox" value={industry} onChange={onChange} />
            <IndustryLabel>{industry}</IndustryLabel>
          </IndustryItem>
        ))}
      </IndustryContainer>
    </Container>
  );
};

export default Industry;
