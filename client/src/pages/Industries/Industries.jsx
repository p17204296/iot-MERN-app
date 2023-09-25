import { useEffect, useState } from "react";
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
import IndustryTableBody from "../../components/TableBody/IndustryTableBody";
import Search from "../../components/Search/Search";
import Pagination from "../../components/Pagination/Pagination";
import AddIndustry from "../../components/AddRow/AddIndustry";

const base_url = process.env.REACT_APP_API_URL;

const Devices = () => {
  const [obj, setObj] = useState({});
  const [sort, setSort] = useState({
    sort: "_id",
    order: "desc",
  });
  // const [filterIndustry, setFilterIndustry] = useState("All");
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const getAllIndustries = async () => {
      try {
        const url = `${base_url}/api/industries/?page=${page}&sort=${sort.sort},${sort.order}&search=${search}`;
        const { data } = await axios.get(url);
        setObj(data);
        console.log(data);
      } catch (err) {
        console.log(err);
      }
    };
    const interval = setInterval(getAllIndustries, 1000);

    getAllIndustries();
    return () => {
      clearInterval(interval);
    };
  }, [sort, page, search]);

  return (
    <>
      <WrapperStyles>
        <ContainerStyles>
          <h2>Add New Industry</h2>

          <AddIndustry />
        </ContainerStyles>
      </WrapperStyles>

      <WrapperStyles>
        <ContainerStyles>
          <HeadStyles>
            <HeadingStyles>
              <h1>Industries Page</h1>
            </HeadingStyles>
            <Search setSearch={(search) => setSearch(search)} />
          </HeadStyles>
          <BodyStyles>
            <TableContainerStyles>
              <IndustryTableBody
                industries={obj.industries ? obj.industries : []}
              />
              <Pagination
                page={page}
                limit={obj.limit ? obj.limit : 0}
                total={obj.total ? obj.total : 0}
                setPage={(page) => setPage(page)}
              />
            </TableContainerStyles>
            <FilterContainerStyles></FilterContainerStyles>
          </BodyStyles>
        </ContainerStyles>
      </WrapperStyles>
    </>
  );
};

export default Devices;
