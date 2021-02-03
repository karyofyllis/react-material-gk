import { Grid } from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton";
import React from "react";

function TableLoader({rows = 20}) {
    const items = [...Array(rows)]
    return (
        <Grid container direction={"column"}>
            {items.map((i) => (
                <Grid item style={{marginTop: 8}}>
                    <Skeleton variant="rect" height={60} />
                </Grid>
            ))}
        </Grid>
    );
}

export default TableLoader;
