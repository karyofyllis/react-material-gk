import React from "react";
import TableCell from "@material-ui/core/TableCell";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Typography from "@material-ui/core/Typography";
import Checkbox from "@material-ui/core/Checkbox";
import TableRow from "@material-ui/core/TableRow";

const useDefaultTable = (array, sortHandler, identifier = "id") => {
    const [selected, setSelected] = React.useState([]);

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelectedIds = array.map((n) => n[identifier]);
            setSelected(newSelectedIds);
            return;
        }
        setSelected([]);
    };

    const handleClick = (event, name) => {
        const selectedIndex = selected.indexOf(name);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, name);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1)
            );
        }

        setSelected(newSelected);
    };

    const isSelected = (name) => selected.indexOf(name) !== -1;
    const numSelected = selected.length;
    const rowCount = array.length;

    const renderHeadCell = (headCell) => {
        return (
            <TableCell
                sortDirection={"asc"}
                key={headCell.id}
                align={headCell.numeric ? "right" : "left"}
                padding={headCell.disablePadding ? "none" : "default"}
            >
                {headCell.isSortable && sortHandler ? (
                    <TableSortLabel
                        active={sortHandler.sort.by === headCell.id}
                        direction={sortHandler.sort.direction}
                        onClick={() => sortHandler.handleSort(headCell.id)}
                    >
                        {headCell.label}
                    </TableSortLabel>
                ) : (
                    headCell.label
                )}
            </TableCell>
        );
    };

    const renderBodyCell = (label, stylesOverride = {}) => {
        return (
            <TableCell align="left">
                <Typography
                    style={{ fontSize: 12, ...stylesOverride }}
                    color={"textSecondary"}
                >
                    {label}
                </Typography>
            </TableCell>
        );
    };

    const renderCheckAllCell = () => {
        return (
            <TableCell padding="checkbox">
                <Checkbox
                    indeterminate={numSelected > 0 && numSelected < rowCount}
                    checked={rowCount > 0 && numSelected === rowCount}
                    onChange={handleSelectAllClick}
                    inputProps={{ "aria-label": "select all desserts" }}
                />
            </TableCell>
        );
    };

    const renderCheckRowCell = (isItemSelected, labelId) => {
        return (
            <TableCell padding="checkbox">
                <Checkbox
                    checked={isItemSelected}
                    inputProps={{ "aria-labelledby": labelId }}
                />
            </TableCell>
        );
    };

    const renderDefaultBody = (array, headerColumns, selectableRows, onClick, styleCell) => {
        return array.map((row, index) => {
            const isItemSelected = isSelected(row.id);
            const labelId = `enhanced-table-checkbox-${index}`;
            return (
                <TableRow
                    hover
                    onClick={(event) => {
                        if (onClick) {
                            onClick(row);
                        } else {
                            handleClick(event, row.id);
                        }
                    }}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.id}
                    selected={isItemSelected}
                >
                    {selectableRows && renderCheckRowCell(isItemSelected, labelId)}
                    {headerColumns.map((column) => {
                        const styles = styleCell && styleCell(column.id, row[column.id])
                        return renderBodyCell(row[column.id], styles)
                    })}
                </TableRow>
            );
        });
    };

    return {
        handleClick,
        handleSelectAllClick,
        isSelected,
        setSelected,
        renderHeadCell,
        renderBodyCell,
        renderCheckAllCell,
        renderCheckRowCell,
        renderDefaultBody,
        numSelected,
        rowCount,
        selected,
    };
};

export {
    useDefaultTable,
}
