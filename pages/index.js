import Head from 'next/head'
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Paper from '@mui/material/Paper';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { createStore } from 'redux'
import reducers from '../src/reducers'
import { Provider } from 'react-redux';
import Availability from '../src/profile/availability/Availability';

const theme = createTheme();

const store = createStore( reducers )
 
export default function Home() {
  return (

    <ThemeProvider theme={theme}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Provider store={store}>

              <CssBaseline />
              <Box className="flex flex-col items-center justify-center min-h-screen py-2">
                <Head>
                  <title>Information Providers Profile</title>
                  <link rel="icon" href="/favicon.ico" />
                </Head>

                <AppBar
                    position="absolute"
                    color="default"
                    elevation={0}
                    sx={{
                      position: 'relative',
                      borderBottom: (t) => `1px solid ${t.palette.Boxider}`,
                    }}
                  >
                    <Toolbar>
                      <Typography variant="h6" color="inherit" noWrap>
                        ExpertzRUs
                      </Typography>
                    </Toolbar>
                  </AppBar>

                <main sx={{ my: { xs: 2, md: 6 }, p: { xs: 1, md: 3} }} 
                     className="flex flex-col sm:w-full md:w-2/3 lg:w-1/2  "
                    >

                    <Container component="main"  sx={{ mb: 10 }}>
                        <Availability/>
                      </Container>

                  
                </main>

                <footer className="flex items-center justify-center w-full h-24 border-t">
                  <a
                    className="flex items-center justify-center"
                    href="https://ExpertzRUs.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Powered by ExpertzRUs
                  </a>
                </footer>
              </Box>
          </Provider>
      </LocalizationProvider>
    </ThemeProvider>
  )
}
