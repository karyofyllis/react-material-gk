import React, {useEffect} from "react";
import BaseDialog from "./Common/BaseDialog";
import {useEntityProgress} from "reactcoregk/hooks";

const EditDialog = (props) => {
    const {
        handleClose,
        open,
        createEntity,
        updateEntity,
        context,
        form,
        entityType,
        // showDeleteModal,
        // setShowDeleteModal,
        extraClassName,
        isValid,
        primaryActionTitle,
        handleEditTitle,
        keepOpen,
        titleOverride,
    } = props;

    const [errorMessage, setErrorMessage] = React.useState(null);

    const handleCreate = () => {
        return form.id ? updateEntity(form) : createEntity(form);
    };

    const onClose = keepOpen ? function () {} : handleClose;
    const [busy, error] = useEntityProgress(context, onClose);

    useEffect(() => setErrorMessage(error), [error]);
    useEffect(() => {
        if (!open) {
            setErrorMessage(null);
        }
    }, [open]);

    return (
        <BaseDialog
            title={
                titleOverride || `${form.id ? "Edit" : "Create new"} ${entityType}`
            }
            handleEditTitle={handleEditTitle}
            primaryAction={handleCreate}
            primaryActionTitle={primaryActionTitle}
            inProgress={busy}
            open={open}
            size={props.size}
            onClose={handleClose}
            scrollable={true}
            extraClassName={extraClassName}
            isInvalid={isValid === false}
            errorMessage={errorMessage}
            dismissError={() => setErrorMessage(null)}
            {...props}
        >
            {props.children}
        </BaseDialog>
    );
};

export default EditDialog;
