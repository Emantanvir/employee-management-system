import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Button,
} from "@mui/material";

function DeleteConfirmDialog({ open, onClose, onConfirm, employee }) {
    return (
        <Dialog open={open} onClose={onClose}>

            <DialogTitle>
                Confirm Delete
            </DialogTitle>

            <DialogContent>
                <DialogContentText>
                    Are you sure you want to delete{" "}
                    <strong>
                        {employee?.firstName} {employee?.lastName}
                    </strong>
                    ?
                </DialogContentText>
            </DialogContent>

            <DialogActions>
                <Button onClick={onClose}>
                    Cancel
                </Button>

                <Button
                    onClick={onConfirm}
                    color="error"
                    variant="contained"
                >
                    Delete
                </Button>
            </DialogActions>

        </Dialog>
    );
}

export default DeleteConfirmDialog;