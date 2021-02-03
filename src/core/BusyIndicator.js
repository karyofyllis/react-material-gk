import React from "react";
import {makeStyles} from "@material-ui/styles";
import {CircularProgress} from "@material-ui/core";

const useStyles = makeStyles({
    loader: {
        zIndex: 1,
        position: "absolute",
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
});

export default (props) => {
    const classes = useStyles();

    return (
        props.busy && (
            <div className={classes.loader}>
                <CircularProgress size={props.size} color="secondary" />
            </div>
        )
    );
};
