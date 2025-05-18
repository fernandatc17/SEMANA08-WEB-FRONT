import React, { useEffect, useState } from "react";
import { Container, Typography, Table, TableHead, TableRow, TableCell, TableBody, Paper } from "@mui/material";
import PeopleIcon from "@mui/icons-material/People";
import axios from "axios";
import AuthService from "../Services/AuthService";
const ModPage = () => {
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

  return (
    <Container maxWidth="md" sx={{ mt: 10 }}>
      <Typography variant="h4" gutterBottom>
        <PeopleIcon /> Lista de Usuarios
      </Typography>
      <Paper elevation={3}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Usuario</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Rol</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((u, index) => (
              <TableRow key={index}>
                <TableCell>{u.username}</TableCell>
                <TableCell>{u.email}</TableCell>
                <TableCell>{u.roles.join(", ")}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Container>
  );
};

export default ModPage;
