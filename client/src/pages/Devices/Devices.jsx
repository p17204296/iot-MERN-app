import React, { useEffect, useState } from "react";
import axios from "axios";

import {
  WrapperStyles,
  ContainerStyles,
  HeadStyles,
  HeadingStyles,
  BodyStyles,
  TableContainerStyles,
  FilterContainerStyles,
} from "../pageStyles";
import TableBody from "../../components/TableBody/DevicesTableBody";
import Search from "../../components/Search/Search";
import Pagination from "../../components/Pagination/Pagination";
import Sort from "../../components/Sort/Sort";
import AddDevice from "../../components/AddRow/AddDevice";

const base_url = process.env.REACT_APP_API_URL;

const Devices = () => {
  const [obj, setObj] = useState({});
  const [sort, setSort] = useState({
    sort: "warehouseAdditionTime",
    order: "desc",
  });
  const [filterIndustry, setFilterIndustry] = useState("All");
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const getAllDevices = async () => {
      try {
        const url = `${base_url}/api/devices/?page=${page}&sort=${sort.sort},${
          sort.order
        }&linkedIndustry=${filterIndustry.toString()}&search=${search}`;
        const { data } = await axios.get(url);
        setObj(data);
        console.log(data);
      } catch (err) {
        console.log(err);
      }
    };

    const interval = setInterval(getAllDevices, 1000);

    getAllDevices();
    return () => {
      clearInterval(interval);
    };
  }, [sort, filterIndustry, page, search]);

  return (
    <>
      <WrapperStyles>
        <ContainerStyles>
          <AddDevice />
        </ContainerStyles>
      </WrapperStyles>

      <WrapperStyles>
        <ContainerStyles>
          <HeadStyles>
            <HeadingStyles>
              <h1>Devices Page</h1>
            </HeadingStyles>
            <Search setSearch={(search) => setSearch(search)} />
          </HeadStyles>
          <BodyStyles>
            <TableContainerStyles>
              <TableBody devices={obj.devices ? obj.devices : []} />
              <Pagination
                page={page}
                limit={obj.limit ? obj.limit : 0}
                total={obj.total ? obj.total : 0}
                setPage={(page) => setPage(page)}
              />
            </TableContainerStyles>
            <FilterContainerStyles>
              <Sort sort={sort} setSort={(sort) => setSort(sort)} />
              {/* <Genre
              filterGenre={filterGenre}
              genres={obj.genres ? obj.genres : []}
              setFilterGenre={(genre) => setFilterGenre(genre)}
            /> */}
            </FilterContainerStyles>
          </BodyStyles>
        </ContainerStyles>
      </WrapperStyles>
    </>
  );
};

export default Devices;
