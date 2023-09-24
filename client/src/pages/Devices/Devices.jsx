import { useEffect, useState } from "react";

import {
  WrapperStyles,
  ContainerStyles,
  HeadStyles,
  HeadingStyles,  BodyStyles,
  TableContainerStyles,
  FilterContainerStyles,
} from "../pageStyles";

import Search from "../../components/Search/Search";

const Devices = () => {
  const logo = "../../../public/images/logo.png";
  const [search, setSearch] = useState("");

  return (
    <WrapperStyles>
      <ContainerStyles>
        <HeadStyles>
          <HeadingStyles><h1>Devices Page</h1></HeadingStyles>
          <Search setSearch={(search) => setSearch(search)} />
        </HeadStyles>
        <BodyStyles>
          <TableContainerStyles>Devices</TableContainerStyles>
          <FilterContainerStyles>Filter</FilterContainerStyles>
        </BodyStyles>
      </ContainerStyles>
    </WrapperStyles>
  );
};

export default Devices;
