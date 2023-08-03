import { Box, TablePagination, Typography } from "@mui/material";
import React, { FC, useState } from 'react';
import LastPageIcon from '@mui/icons-material/LastPage';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import './index.css';

interface Props {
  total: number;
  title: string;
}

const PaginationTable: FC<Props> = ({
  total,
  title,
}) => {
  const [state, setState] = useState({
      page: 1,
      perPage: 10
  });
  const handleFirstPage = () => {
    // getCoupons(1, state.perPage, state.field, state.order, state.searchField, state.searchValue);
  };

  const handleLastPage = () => {
    const page = Math.ceil(total / state.perPage);
    // getCoupons(page, state.perPage, state.field, state.order, state.searchField, state.searchValue);
  };

  const handleChangePage = (
    _event: React.MouseEvent<HTMLButtonElement> | null,
    _newPage: number,
  ): void => {
    // getCoupons(newPage + 1, state.perPage, state.field, state.order, state.searchField, state.searchValue);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    const perPage = parseInt(event.target.value, 10);
    // getCoupons(1, perPage, state.field, state.order, state.searchField, state.searchValue);
  };
  return (
    <>
      {total === 0 && (
        <div className="no-active">
          <Typography variant="h6" gutterBottom className="base-color">
            No {title} to display
          </Typography>
        </div>
      )}
      {total > 0 && (
        <Box
          display="flex"
          alignItems="center"
          position="relative"
          paddingRight="1em"
          justifyContent="flex-end"
        >
          <TablePagination
            component="div"
            count={total}
            page={state.page - 1}
            onPageChange={handleChangePage}
            rowsPerPage={state.perPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            className="pagination-table"
          />
          <div
            className="last-page-icon"
            title="Last Page"
            onClick={handleLastPage}
          >
            <LastPageIcon className="last-icon" />
          </div>
          <Box position="absolute" right="160px">
            <div
              className="first-page-icon"
              title="First Page"
              onClick={handleFirstPage}
            >
              <FirstPageIcon />
            </div>
          </Box>
        </Box>
      )}
    </>
  );
};

export default PaginationTable;
