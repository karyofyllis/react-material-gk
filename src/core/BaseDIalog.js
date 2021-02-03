import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import PropTypes from "prop-types";
import Alert from "@material-ui/lab/Alert";
import BusyIndicator from "./BusyIndicator";

const spacing = 6;

const styles = (theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(2),
        paddingLeft: theme.spacing(spacing),
    },
    closeButton: {
        position: "absolute",
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
    title: {
        fontSize: 14,
    },
    dialog: {
        MuiDialog: {
            backdropFilter: {
                filter: "blur(3px)",
            },
        },
    },
});

const DialogTitle = withStyles(styles)((props) => {
    const { children, classes, onClose, ...other } = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root} {...other}>
            <Typography variant="h6" className={classes.title}>
                {children}
            </Typography>
            {onClose ? (
                <IconButton
                    style={{ width: 36, height: 36 }}
                    aria-label="close"
                    className={classes.closeButton}
                    onClick={onClose}
                >
                    <CloseIcon />
                </IconButton>
            ) : null}
        </MuiDialogTitle>
    );
});

const DialogContent = withStyles((theme) => ({
    root: {
        padding: theme.spacing(spacing),
        position: "relative",
    },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(spacing),
    },
}))(MuiDialogActions);

function BaseDialog(props) {
    const {
        open,
        onClose,
        title,
        maxWidth,
        fullWidth,
        primaryAction,
        primaryActionTitle,
        primaryActionDisabled = false,
        secondaryAction,
        secondaryActionTitle,
        inProgress,
        isInvalid,
        errorMessage,
        dismissError,
        showProgress,
        // blurOnBackdrop,
        maxContentHeight = "auto",
        disableBackdropClick,
        classes,
    } = props;

    // const { setBlur } = useContext(BlurContext)
    //
    // useEffect(() => {
    //   if (open && blurOnBackdrop)
    //     setBlur(true)
    //   else
    //     setBlur(false)
    // }, [open, setBlur, blurOnBackdrop])

    return (
        <Dialog
            onClose={onClose}
            aria-labelledby="customized-dialog-title"
            open={open}
            fullWidth={fullWidth}
            maxWidth={maxWidth}
            disableBackdropClicka={disableBackdropClick}
            classes={classes}
        >
            <BusyIndicator busy={showProgress && inProgress} />
            <DialogTitle id="customized-dialog-title" onClose={onClose}>
                {title}
            </DialogTitle>
            <DialogContent dividers style={{ maxHeight: maxContentHeight }}>
                {errorMessage && (
                    <Alert
                        severity="error"
                        onClose={dismissError}
                        style={{ marginBottom: 8 }}
                    >
                        {errorMessage}
                    </Alert>
                )}
                {props.children}
            </DialogContent>
            {(Boolean(primaryAction) || Boolean(secondaryAction)) && (
                <DialogActions style={{ padding: 16 }}>
                    {Boolean(secondaryAction) && (
                        <Button
                            autoFocus
                            onClick={secondaryAction}
                            variant={"outlined"}
                            color="primary"
                            size={"medium"}
                        >
                            {secondaryActionTitle}
                        </Button>
                    )}
                    {Boolean(primaryAction) && (
                        <Button
                            disabled={inProgress || isInvalid}
                            variant={"contained"}
                            size={"medium"}
                            autoFocus
                            onClick={primaryAction}
                            color="primary"
                            disabed={primaryActionDisabled}
                        >
                            {primaryActionTitle}
                        </Button>
                    )}
                </DialogActions>
            )}
        </Dialog>
    );
}

export default BaseDialog;

BaseDialog.defaultProps = {
    fullWidth: true,
    primaryActionTitle: "Confirm",
    secondaryActionTitle: "Cancel",
    showProgress: false,
    disableBackdropClick: false,
};

BaseDialog.propTypes = {
    onClose: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    maxWidth: PropTypes.oneOf(["xs", "sm", "md", "lg", "xl", false]),
    fullWidth: PropTypes.bool,
    open: PropTypes.bool.isRequired,
    primaryAction: PropTypes.func,
    primaryActionTitle: PropTypes.string,
    secondaryAction: PropTypes.func,
    secondaryActionTitle: PropTypes.string,
    inProgress: PropTypes.bool,
    isInvalid: PropTypes.bool,
    errorMessage: PropTypes.string,
    dismissError: PropTypes.func,
    showProgress: PropTypes.bool,
    blurOnBackdrop: PropTypes.bool,
    disableBackdropClick: PropTypes.bool,
};
