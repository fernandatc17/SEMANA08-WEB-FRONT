import React, { useEffect, useState } from "react";
import {
  Container, Typography, Table, TableHead, TableRow, TableCell,
  TableBody, Paper, Select, MenuItem, IconButton
} from "@mui/material";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import SaveIcon from "@mui/icons-material/Save";
import axios from "axios";
import AuthService from "../Services/AuthService";

const AdminPage = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const user = AuthService.getCurrentUser();
    const token = user?.accessToken;

    axios.get("https://semana08-web.onrender.com/api/users", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(res => setUsers(res.data))
    .catch(err => console.error("Error al cargar usuarios:", err));
  }, []);

  const handleRoleChange = (index, newRole) => {
    const updatedUsers = [...users];
    updatedUsers[index].selectedRole = newRole;
    setUsers(updatedUsers);
  };

  const handleSave = (user) => {
    const token = AuthService.getCurrentUser()?.accessToken;

    axios.put(`https://semana08-web.onrender.com/api/users/${user.id}/role`,
      { role: user.selectedRole },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
    .then(() => alert(`Rol de ${user.username} actualizado a ${user.selectedRole}`))
    .catch(err => console.error("Error al actualizar rol:", err));
  };

  return (
    <Container maxWidth="md" sx={{ mt: 10 }}>
      <Typography variant="h4" gutterBottom>
        <AdminPanelSettingsIcon sx={{ verticalAlign: "middle", mr: 1 }} />
        Gestión de Roles
      </Typography>
      <Paper elevation={3}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Usuario</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Rol actual</TableCell>
              <TableCell>Cambiar a</TableCell>
              <TableCell>Acción</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((u, index) => (
              <TableRow key={u.id}>
                <TableCell>{u.username}</TableCell>
                <TableCell>{u.email}</TableCell>
                <TableCell>{u.roles.join(", ")}</TableCell>
                <TableCell>
                  <Select
                    value={u.selectedRole || ""}
                    onChange={(e) => handleRoleChange(index, e.target.value)}
                    fullWidth
                  >
                    <MenuItem value="user">User</MenuItem>
                    <MenuItem value="moderator">Moderator</MenuItem>
                    <MenuItem value="admin">Admin</MenuItem>
                  </Select>
                </TableCell>
                <TableCell>
                  <IconButton
                    color="primary"
                    onClick={() => handleSave(u)}
                    disabled={!u.selectedRole}
                  >
                    <SaveIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Container>
  );
};

export default AdminPage;
