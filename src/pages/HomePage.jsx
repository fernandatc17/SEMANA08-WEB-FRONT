import React from "react";
import { Container, Typography, Box } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";

const HomePage = () => {
  return (
    <Container maxWidth="md" sx={{ mt: 10, textAlign: "center" }}>
      <HomeIcon sx={{ fontSize: 60, color: "primary.main" }} />
      <Typography variant="h3" gutterBottom>
        Bienvenido al Sistema CRUD de Farmacia
      </Typography>
      <Typography variant="body1" color="text.secondary">
        Este sistema permite gestionar medicamentos, usuarios y órdenes, de manera segura y controlada por roles.
      </Typography>
    </Container>
  );
};

export default HomePage;
