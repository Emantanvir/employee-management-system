import { useState, useEffect } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    Box,
} from "@mui/material";

function EmployeeForm({ open, onClose, onSave, selectedEmployee }) {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        department: "",
    });

    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (selectedEmployee) {
            setFormData({
                firstName: selectedEmployee.firstName || "",
                lastName: selectedEmployee.lastName || "",
                email: selectedEmployee.email || "",
                phone: selectedEmployee.phone || "",
                department: selectedEmployee.department || "",
            });
        } else {
            setFormData({
                firstName: "",
                lastName: "",
                email: "",
                phone: "",
                department: "",
            });
        }

        setErrors({});
    }, [selectedEmployee, open]);

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.firstName.trim()) {
            newErrors.firstName = "First name is required";
        }

        if (!formData.lastName.trim()) {
            newErrors.lastName = "Last name is required";
        }

        if (!formData.email.trim()) {
            newErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Email is not valid";
        }

        if (!formData.phone.trim()) {
            newErrors.phone = "Phone is required";
        }

        if (!formData.department.trim()) {
            newErrors.department = "Department is required";
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = () => {
        if (!validateForm()) {
            return;
        }

        onSave(formData);
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle>
                {selectedEmployee ? "Edit Employee" : "Add Employee"}
            </DialogTitle>

            <DialogContent>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
                    <TextField
                        label="First Name"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        error={!!errors.firstName}
                        helperText={errors.firstName}
                        fullWidth
                    />

                    <TextField
                        label="Last Name"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        error={!!errors.lastName}
                        helperText={errors.lastName}
                        fullWidth
                    />

                    <TextField
                        label="Email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        error={!!errors.email}
                        helperText={errors.email}
                        fullWidth
                    />

                    <TextField
                        label="Phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        error={!!errors.phone}
                        helperText={errors.phone}
                        fullWidth
                    />

                    <TextField
                        label="Department"
                        name="department"
                        value={formData.department}
                        onChange={handleChange}
                        error={!!errors.department}
                        helperText={errors.department}
                        fullWidth
                    />
                </Box>
            </DialogContent>

            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button variant="contained" onClick={handleSubmit}>
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default EmployeeForm;