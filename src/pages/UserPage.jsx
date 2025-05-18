import React from "react";
import { Container, Typography } from "@mui/material";
import LocalPharmacyIcon from "@mui/icons-material/LocalPharmacy";

const UserPage = () => {
  return (
    <Container maxWidth="sm" sx={{ mt: 10, textAlign: "center" }}>
      <LocalPharmacyIcon sx={{ fontSize: 60, color: "primary.main" }} />
      <Typography variant="h4" gutterBottom>
        Zona Usuario - Información de Farmacia
      </Typography>
      <Typography variant="body1" color="text.secondary">
        Aquí los usuarios pueden consultar productos, ver disponibilidad y más.
      </Typography>
    </Container>
  );
};

export default UserPage;
