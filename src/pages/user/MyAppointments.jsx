import { Card, CardContent, Grid, Typography } from '@mui/material';
import React from 'react'

function MyAppointments() {
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Card sx={{ height: 60 + "vh" }}>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                My Appointments
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={6}>
          <Card sx={{ height: 60 + "vh" }}>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                My Orders
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}

export default MyAppointments