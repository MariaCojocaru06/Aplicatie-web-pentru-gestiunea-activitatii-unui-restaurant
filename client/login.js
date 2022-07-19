import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import back_log from '../img/back_log.jpg'
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import { Component, useRef, useState, useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { Carousel } from 'react-responsive-carousel';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme();

export default function SignInSide() {

    const passRef = useRef();
    const emailRef = useRef();
    //  const [id,setid]=useState();
    let id = 0;
    //  const [idStorage,setidStorage]=useState();
    let idStorage = 0;
    const [now, setnow] = useState(1)
    let idCart = 1;
    const [client, setclient] = useState()
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isLoggedAdmin, setIsLoggedAdmin] = useState(false);
    const countCart = localStorage.getItem('countCart');

    const onLogin = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        fetch(`http://localhost:8080/api-client/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: data.get('email'),
                parola: data.get('password'),
            })
        }
        )
            .then((response) => {
                console.log(response)
                if (response.status == 200) {
                    toast.success('Succes', {
                        position: "top-right",
                        autoClose: 1500,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                    return response.json();
                } else {
                    throw new Error('Email invalid sau parolă gresită!');
                }
            })
            .then((data) => {
                if (data.message) {
                    console.log(data)
                    setclient(data.user)
                    id = data.user.id


                    if (data.user.email == 'admin@gmail.com') {
                        setIsLoggedAdmin(true);
                        localStorage.setItem('token', data.token);
                        console.log('admin logat');
                        localStorage.setItem('admin', id)
                        window.location.href = "http://localhost:3000/admin";

                    } else {
                        localStorage.setItem('prof', id)
                        console.log("id:" + id)
                        localStorage.setItem('token', data.token);
                        setIsLoggedIn(true); setnow(1);
                        fetch(`http://localhost:8080/api-client/client/${id}/order`, {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify(
                                { id: 1 }
                            ),

                        }).then((res) => res.json())
                        fetch(`http://localhost:8080/api-client/client/${id}/order`, {
                            method: 'GET',
                            headers: {
                                'Content-Type': 'application/json',
                            }
                        }).then((response) => {
                            if (response.ok) {
                                return response.json();
                            } else {
                                throw new Error('Eroare!');
                            }
                        })
                            .then((data) => {
                                localStorage.setItem("com",data.length)
                                console.log(data.length)
                                console.log('ok')})
                                console.log(data.length)
                               
                        
                       
                        window.location.href = "http://localhost:3000/";
                    }
                }
            })
            .catch((e) => {
                toast.error("Atenție! " + e.message, {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                }); setnow(0);
            }
            )
    }



    return (
        <ThemeProvider theme={theme}>
            <Grid container component="main" sx={{ height: '100vh' }}>
                <CssBaseline />
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    sx={{
                        backgroundImage: `url(${back_log})`,
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: (t) =>
                            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />
                <Grid item xs={12} sx={{ backgroundColor: '#272727' }} sm={8} md={5} component={Paper} elevation={6} square>
                    <Box
                        sx={{
                            my: 8,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',

                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign in
                        </Typography>
                        <Box component="form" noValidate onSubmit={onLogin} sx={{ mt: 1 }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email "
                                name="email"
                                autoComplete="email"
                                autoFocus
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Parola"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                            />
                            <FormControlLabel
                                control={<Checkbox value="remember" color="primary" />}
                                label="Remember me"
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2, backgroundColor: 'black' }}
                            >
                                Logare
                            </Button>
                            <Grid container>
                                <Grid item xs>
                                    <Link href="#" variant="body2">
                                        Ai uitat parola?
                                    </Link>
                                </Grid>
                                <Grid item>
                                    <Link href="/register" variant="body2">
                                        {"Nu ai un cont? Creează"}
                                    </Link>
                                </Grid>
                            </Grid>


                        </Box>
                        <Grid item style={{ padding: '30', marginTop: '50' }}>
                            {/* <Link href="/admin" variant="body2">
                                {"ADMIN"}
                            </Link> */}
                        </Grid>
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider>
    )
}