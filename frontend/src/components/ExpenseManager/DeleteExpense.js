import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';

export default function DeleteExpense({ expense }) {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <React.Fragment>
            <IconButton variant="outlined" startIcon={<DeleteIcon />} onClick={handleClickOpen}>
                <DeleteIcon color='error' />
            </IconButton>
            <Dialog
                open={open}
                onClose={handleClose}
            >
                <DialogTitle>
                    {"Delete Expense"}               
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete this expense?
                        <br/> Amount : {expense.amount}
                        <br/> Category : {expense.category}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>No</Button>
                    <Button onClick={handleClose} autoFocus>
                        Yes
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}
