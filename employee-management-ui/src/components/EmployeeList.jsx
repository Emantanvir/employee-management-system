import { useEffect, useState } from "react";
import {
    Box,
    Button,
    CircularProgress,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    IconButton,
    Snackbar,
    Alert,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import {
    getEmployees,
    createEmployee,
    updateEmployee,
    deleteEmployee,
} from "../api/employeeApi";

import EmployeeForm from "./EmployeeForm";
import DeleteConfirmDialog from "./DeleteConfirmDialog";

function EmployeeList() {
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(false);

    const [formOpen, setFormOpen] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState(null);

    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [employeeToDelete, setEmployeeToDelete] = useState(null);

    const [snackbar, setSnackbar] = useState({
        open: false,
        message: "",
        severity: "success",
    });

    const fetchEmployees = async () => {
        try {
            setLoading(true);

            const response = await getEmployees();

            setEmployees(response.data);
        } catch (error) {
            console.error("Error fetching employees:", error);

            setSnackbar({
                open: true,
                message: "Failed to load employees",
                severity: "error",
            });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchEmployees();
    }, []);

    const handleAddClick = () => {
        setSelectedEmployee(null);
        setFormOpen(true);
    };

    const handleEditClick = (employee) => {
        setSelectedEmployee(employee);
        setFormOpen(true);
    };

    const handleFormClose = () => {
        setFormOpen(false);
        setSelectedEmployee(null);
    };

    const handleSaveEmployee = async (employeeData) => {
        try {
            if (selectedEmployee) {
                await updateEmployee(selectedEmployee.id, employeeData);

                setSnackbar({
                    open: true,
                    message: "Employee updated successfully",
                    severity: "success",
                });
            } else {
                await createEmployee(employeeData);

                setSnackbar({
                    open: true,
                    message: "Employee added successfully",
                    severity: "success",
                });
            }

            handleFormClose();
            fetchEmployees();
        } catch (error) {
            console.error("Error saving employee:", error);

            setSnackbar({
                open: true,
                message: "Failed to save employee",
                severity: "error",
            });
        }
    };

    const handleDeleteClick = (employee) => {
        setEmployeeToDelete(employee);
        setDeleteDialogOpen(true);
    };

    const handleDeleteClose = () => {
        setDeleteDialogOpen(false);
        setEmployeeToDelete(null);
    };

    const handleConfirmDelete = async () => {
        try {
            await deleteEmployee(employeeToDelete.id);

            setSnackbar({
                open: true,
                message: "Employee deleted successfully",
                severity: "success",
            });

            handleDeleteClose();
            fetchEmployees();
        } catch (error) {
            console.error("Error deleting employee:", error);

            setSnackbar({
                open: true,
                message: "Failed to delete employee",
                severity: "error",
            });
        }
    };

    const handleSnackbarClose = () => {
        setSnackbar({
            ...snackbar,
            open: false,
        });
    };

    return (
        <Box sx={{ padding: 3 }}>
            <Typography variant="h4" gutterBottom align="center">
                Employee Management System
            </Typography>

            <Box sx={{ display: "flex", justifyContent: "center", marginBottom: 2 }}>
                <Button variant="contained" color="primary" onClick={handleAddClick}>
                    Add Employee
                </Button>
            </Box>

            {loading ? (
                <Box sx={{ display: "flex", justifyContent: "center", marginTop: 4 }}>
                    <CircularProgress />
                </Box>
            ) : (
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>
                                    <strong>First Name</strong>
                                </TableCell>
                                <TableCell>
                                    <strong>Last Name</strong>
                                </TableCell>
                                <TableCell>
                                    <strong>Email</strong>
                                </TableCell>
                                <TableCell>
                                    <strong>Phone</strong>
                                </TableCell>
                                <TableCell>
                                    <strong>Department</strong>
                                </TableCell>
                                <TableCell>
                                    <strong>Created Date</strong>
                                </TableCell>
                                <TableCell>
                                    <strong>Actions</strong>
                                </TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {employees.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={7} align="center">
                                        No employees found
                                    </TableCell>
                                </TableRow>
                            ) : (
                                employees.map((employee) => (
                                    <TableRow key={employee.id}>
                                        <TableCell>{employee.firstName}</TableCell>
                                        <TableCell>{employee.lastName}</TableCell>
                                        <TableCell>{employee.email}</TableCell>
                                        <TableCell>{employee.phone}</TableCell>
                                        <TableCell>{employee.department}</TableCell>
                                        <TableCell>
                                            {new Date(employee.createdDate).toLocaleDateString()}
                                        </TableCell>
                                        <TableCell>
                                            <IconButton
                                                color="primary"
                                                onClick={() => handleEditClick(employee)}
                                            >
                                                <EditIcon />
                                            </IconButton>

                                            <IconButton
                                                color="error"
                                                onClick={() => handleDeleteClick(employee)}
                                            >
                                                <DeleteIcon />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}

            <EmployeeForm
                open={formOpen}
                onClose={handleFormClose}
                onSave={handleSaveEmployee}
                selectedEmployee={selectedEmployee}
            />

            <DeleteConfirmDialog
                open={deleteDialogOpen}
                onClose={handleDeleteClose}
                onConfirm={handleConfirmDelete}
                employee={employeeToDelete}
            />

            <Snackbar
                open={snackbar.open}
                autoHideDuration={3000}
                onClose={handleSnackbarClose}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            >
                <Alert
                    onClose={handleSnackbarClose}
                    severity={snackbar.severity}
                    sx={{ width: "100%" }}
                >
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </Box>
    );
}

export default EmployeeList;