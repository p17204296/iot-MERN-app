import {
  SortContainerStyles,
  SortByStyles,
  SelectStyles,
  ArrowBtnStyles,
  ArrowDirectionStyles,
} from "./SortStyles";

const Sort = ({ sort, setSort }) => {
  const onSelectChange = ({ currentTarget: input }) => {
    setSort({ sort: input.value, order: sort.order });
  };

  const onArrowChange = () => {
    if (sort.order === "asc") {
      setSort({ sort: sort.sort, order: "desc" });
    } else {
      setSort({ sort: sort.sort, order: "asc" });
    }
  };

  return (
    <SortContainerStyles>
      <SortByStyles>Sort By :</SortByStyles>
      <SelectStyles onChange={onSelectChange} defaultValue={sort.sort}>
        <option value="fee">Fee</option>
        <option value="linkedIndustry">Industry</option>
        <option value="warehouseAdditionTime">Warehouse Addition Time</option>
      </SelectStyles>
      <ArrowBtnStyles onClick={onArrowChange}>
        <ArrowDirectionStyles>&uarr;</ArrowDirectionStyles>
        <ArrowDirectionStyles>&darr;</ArrowDirectionStyles>
      </ArrowBtnStyles>
    </SortContainerStyles>
  );
};

export default Sort;
