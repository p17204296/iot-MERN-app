import {
  PaginationContainerStyles,
  PageBtnStyles,
  ActiveStyles,
} from "./PaginationStyles";

const Pagination = ({ page, total, limit, setPage }) => {
  const totalPages = Math.ceil(total / limit);

  const onClick = (newPage) => {
    setPage(newPage + 1);
  };

  return (
    <PaginationContainerStyles>
      {totalPages > 0 &&
        [...Array(totalPages)].map((val, index) =>
          page === index + 1 ? (
            <ActiveStyles onClick={() => onClick(index)}>
              {index + 1}
            </ActiveStyles>
          ) : (
            <PageBtnStyles onClick={() => onClick(index)}>
              {index + 1}
            </PageBtnStyles>
          )
        )}
    </PaginationContainerStyles>
  );
};

export default Pagination;
