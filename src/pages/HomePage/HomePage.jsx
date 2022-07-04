import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Stack, Box, Typography, Container } from '@mui/material';
import { routesPaths } from 'routerSettings/routesPaths';

export default function HomePage() {
  const navigate = useNavigate();
  return (
    <main>
      {/* Hero unit */}
      <Box
        sx={{
          pt: 3,
          pb: 3,
        }}
      >
        <Container maxWidth="sm">
          <Typography
            component="h1"
            variant="h2"
            align="center"
            color="text.primary"
            gutterBottom
          >
            Phonebook
          </Typography>
          <Typography
            variant="h5"
            align="center"
            color="text.secondary"
            paragraph
          >
            This is a simple phone directory where you can store contacts' phone
            numbers and find them quickly.
          </Typography>
          <Stack
            sx={{ pt: 1 }}
            direction="row"
            spacing={5}
            justifyContent="center"
          >
            <Button
              sx={{
                width: '120px',
                ':hover': {
                  bgcolor: 'rgba(39, 183, 35, 0.459)',
                  color: 'black',
                },
              }}
              onClick={() =>
                navigate(routesPaths.registerPage, { replace: true })
              }
              variant="contained"
            >
              REGISTER
            </Button>
            <Button
              sx={{
                width: '120px',
                ':hover': {
                  bgcolor: 'rgba(39, 183, 35, 0.459)',
                  color: 'black',
                },
              }}
              onClick={() => navigate(routesPaths.loginPage, { replace: true })}
              variant="outlined"
            >
              LOGIN
            </Button>
          </Stack>
        </Container>
      </Box>
    </main>
  );
}
