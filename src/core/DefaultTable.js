import React from "react";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import PropTypes from "prop-types";
import TableLoader from "./TableLoader";

function DefaultTable(props) {
    const {
        renderCheckAllCell,
        headCells,
        renderHeadCell,
        renderDefaultBody,
        rows,
        selectableRows,
        onRowClick,
        isLoading,
        styleCell,
    } = props;

    return (
        <ErrorBoundary>
            <TableContainer>
                <Table aria-labelledby="tableTitle" aria-label="enhanced table">
                    <TableHead>
                        <TableRow>
                            {selectableRows && renderCheckAllCell()}
                            {headCells.map((headCell) => renderHeadCell(headCell))}
                        </TableRow>
                    </TableHead>

                    {!isLoading && (
                        <TableBody>
                            {renderDefaultBody(rows, headCells, selectableRows, onRowClick, styleCell)}
                        </TableBody>
                    )}
                </Table>
                {isLoading && <TableLoader />}
            </TableContainer>
        </ErrorBoundary>
    );
}

export default DefaultTable;

DefaultTable.propTypes = {
    renderCheckAllCell: PropTypes.func,
    styleCell: PropTypes.func,
    headCells: PropTypes.array.isRequired,
    rows: PropTypes.array.isRequired,
    renderHeadCell: PropTypes.func.isRequired,
    renderDefaultBody: PropTypes.func.isRequired,
    onRowClick: PropTypes.func,
    selectableRows: PropTypes.bool,
    isLoading: PropTypes.bool,
};
