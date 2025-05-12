'use client'

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import AdbIcon from '@mui/icons-material/Pets';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import NavBar from './NavBar';
import Login from './Login';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Signup from './Signup';
import { useSession } from 'next-auth/react';
import { Button } from '@mui/material';
import { signOut } from "next-auth/react"
import { useState } from 'react';
import Link from 'next/link';
// import Profile from './demo_profile'
import { useRouter } from 'next/navigation';

const theme = createTheme({});

export default function RootLayout({ children, title }) {

  const { data: session, status }  = useSession();

  let loginSection;

  if (status === 'authenticated') {
    loginSection = <Button component = {Link} variant="outlined" color="inherit" href = '/demo_profile'>Profile</Button>;
  } else {
    loginSection = <>
      <Login/>
      <Signup/>
    </>;
  }

  const [op, setOp] = useState(true);

  function opClose()
  {
    setOp(false);
  }

  function opOpen()
  {
    setOp(true);
  }
  const router = useRouter();

  function handleSignOut() {
    signOut({redirect: false});
    router.push('/');
  }

  let navB;

  if (op === true)
  {
    navB = <Button variant="outlined" color="inherit" onClick= {() => opClose()}>Option</Button>;
  } else{
    if (status === 'authenticated'){
      navB = <>
        <Button sx = {{my: 2, mr: 1 ,color: 'white', display: 'block'}}variant="outlined" color="inherit" onClick= {()=> opOpen()}>Close</Button>
        <NavBar/>
        <Button sx = {{my: 2, mr: 1 ,color: 'white', display: 'block'}}variant="outlined" color="inherit" onClick={handleSignOut}>SignOut</Button>
      </>
    }
    else{
      navB = <>
        <Button sx = {{my: 2, mr: 1 ,color: 'white', display: 'block'}}variant="outlined" color="inherit" onClick= {()=> opOpen()}>Close</Button>
        <NavBar/>
      </>
    }
  }



  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="static">
          <Container maxWidth="xl">
            <Toolbar disableGutters>
              
            <Box sx={{ flexGrow: 0, mr: 150 }}>
                <Stack direction='row' spacing={0}>
                  {navB}
                </Stack>
              </Box>
              
              <AdbIcon sx={{position: 'absolute', right: '55%' ,display: { xs: 'none', md: 'flex' }, mr: 1 }} />
              
              <Typography
                variant="h6"
                noWrap
                component={Link}
                href="/"
                sx={{
                  position: "absolute",
                  left: '45%',
                  //mr: 75,
                  display: { xs: 'none', md: 'flex' },
                  fontFamily: 'monospace',
                  fontWeight: 700,
                  letterSpacing: '.3rem',
                  color: 'inherit',
                  textDecoration: 'none',
                }}
              >
                {title}
              </Typography>
              
              <Box sx={{ position: 'absolute',right : '0%' }}>
                <Stack direction='row' spacing={2}>
                  {loginSection}
                </Stack>
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
      </Box>
      <Box component="main" sx={{ p: 3 }}>
        {children}
      </Box>
    </ThemeProvider>
  );
}