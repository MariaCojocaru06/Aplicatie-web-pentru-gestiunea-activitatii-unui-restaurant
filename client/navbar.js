import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';

import CartPic from "../img/Cart.png"
import Menu from '@mui/material/Menu';

import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
// import Typography from '@mui/material/Typography';
import Collapse from '@mui/material/Collapse';
// import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import lavie from '../img/lavie.jpeg'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

// import { Link } from 'react-router';
import { Link } from 'react-router-dom';
//  import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import jwt_decode from 'jwt-decode';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import info from '../img/info.png'
import PropTypes from 'prop-types';
import { ToastContainer, toast } from 'react-toastify';
import { Component, useRef, useState, useEffect } from "react";

import menu from '../img/menu.png'
import { styled } from '@mui/material/styles';
import { createIsAfterIgnoreDatePart } from '@mui/lab/internal/pickers/time-utils';

const pages = ["Acasa", 'Rezervare', 'Produse'];
const settings = ['Cos', 'Cont', 'Logout'];
const Icont = ['Comenzi', "Date personale"];

const ResponsiveAppBar = () => {
    let idCart = 1;
    let id = 0;
    const [text, setext] = useState(0)
    //  const [idStorage,setidStorage]=useState();
    let idStorage = 0;
    let pagina = ''
    const [now, setnow] = useState(1)
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const [isLoggedIn, setIsLoggedIn] = React.useState(false);
    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };


    const Img = styled('img')({
        margin: 'auto',
        display: 'block',
        maxWidth: '100%',
        maxHeight: '100%',
    });
    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };





    const onLogout = async () => {
        console.log("delogare")
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        id = localStorage.getItem('prof')
        console.log("cl" + id);
        fetch(`http://localhost:8080/api-client/client/${id}/order/${idCart}`, {
            method: 'DELETE'
        }).then((res) => { res.json(); console.log("aici1"); })
            .then((data) => { console.log("stergere apelata") })
            .catch((e) => {
                console.log("aici3" + e)
            });
        console.log("aici");
        setnow(1)
        toast.success('Delogare cu succes!');
        localStorage.removeItem('prof');
        window.location.href = "http://localhost:3000/";




    };
    const BootstrapDialog = styled(Dialog)(({ theme }) => ({
        '& .MuiDialogContent-root': {
            padding: theme.spacing(2),
        },
        '& .MuiDialogActions-root': {
            padding: theme.spacing(1),
        },
    }));

    const BootstrapDialogTitle = (props) => {
        const { children, onClose, ...other } = props;

        return (
            <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
                {children}
                {onClose ? (
                    <IconButton
                        aria-label="close"
                        onClick={onClose}
                        sx={{
                            position: 'absolute',
                            right: 8,
                            top: 8,
                            color: (theme) => theme.palette.grey[500],
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                ) : null}
            </DialogTitle>
        );
    };

    BootstrapDialogTitle.propTypes = {
        children: PropTypes.node,
        onClose: PropTypes.func.isRequired,
    };


    function createData(name, info) {
        return {
            name,
            info

        };
    }
    const rows = [
        createData("Comenzi", "Comenzile pot fi plasate atât acasă cât și direct la masă pentru a facilita fluxul. Pașii sunt simpli: adăugați produsele în coș, selectati locația iar ulterior metoda de plată pentru comenzile plasate la domiciliu și masa în cazul în care plasați comanda la restaurant. Nu uitați să verificați in permanență bonusurile disponibile. Surprizele se află la tot pasul!!"),
        createData("Rezervari", "Puteți rezerva o masă în cel mai rapid mod posibil, fară apel telefonic și timp pierdut în așteptarea unui răspuns. Adaugați data dorită și numărul de persoane, iar mesele disponibile vor fi marcate cu VERDE. Preferințele vă sunt mereu luate în considerare"),
        createData("Feedback", "Părerea clienților este extrem de importantă pentru noi deoarece urmărim în permanență îmbunătățirea serviciilor. Vă invităm să acordați o reacție pentru produsele comandate și să consultați opiniile celorlalți clienți inainte de achiziționa un produs."),
        createData("Bonus", " Din pagina coșului de cumpărături puteți accesa bonusurile disponibile și vă puteți bucura de reduceri")

    ];
    React.useEffect(() => {
        let id = 0;
        //  const [idStorage,setidStorage]=useState();
        pagina = localStorage.getItem('pagina')
        console.log('navbar', pagina)

        const token = localStorage.getItem('token');
        console.log(token)
        if (token) {
            try {
                const data = jwt_decode(token);
                setIsLoggedIn(true);
                console.log("logat" + isLoggedIn)
            } catch (e) {
                // localStorage.removeItem('token');
                console.log(e)
            }
        } else {
            console.log("nu e token")
        }
        const prof = localStorage.getItem('prof');
        console.log("idStorage " + prof)
        if (prof) {
            try {
                //verificam persistenta utilizatorului logat
                console.log(prof)
            } catch (e) {
                console.log(e);
            }
        }
    }, []);
    function Row(props) {
     
        const { row } = props;
        const [open, setOpen] = React.useState(false);

        return (

            <React.Fragment>
                <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
                    <TableCell>
                        <IconButton
                            aria-label="expand row"
                            size="small"
                            onClick={() => setOpen(!open)}
                        >
                            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                        </IconButton>
                    </TableCell>
                    <TableCell component="th" scope="row">
                        {row.name}
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                        <Collapse in={open} timeout="auto" unmountOnExit>
                            <Box sx={{ margin: 1 }}>

                                <Table size="small" aria-label="purchases">
                                    <TableHead></TableHead>

                                    <TableBody>
                                        <tr>
                                            <td>{row.info}</td>
                                        </tr>
                                    </TableBody>
                                </Table>
                            </Box>
                        </Collapse>
                    </TableCell>
                </TableRow>
            </React.Fragment>
        );
    }
    return (
        <AppBar position="static">
            <Container maxWidth="xl" sx={{ backgroundColor: '#1f1f1f', fontFamily: "Roboto" }}>
                <Toolbar disableGutters>
                 
                    <Button sx={{ width: 40, height: 50, margin: 0, py: 0, display: "inline", borderRadius: '70%' }}>
                        <Img alt="complex" src={lavie} style={{ borderRadius: '80%' }} />
                    </Button>

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                            image={menu}

                        >
                            {/* <MenuIcon /> */}
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            {pages.map((page) => (
                                <MenuItem key={page} onClick={() => { handleCloseNavMenu(); console.log("apsat") }}>
                                    {
                                        page == 'Acasa' ? (
                                            <div sx={{ textDecoration: "none" }} >

                                                <Typography component="a" href="/" sx={{ textDecoration: "none", color: 'black' }} textAlign="center">{page}</Typography>
                                            </div>
                                        ) : page == 'Rezervare' ? (
                                            <div sx={{ textDecoration: "none" }} >

                                                <Typography component="a" href="/rezervare" sx={{ textDecoration: "none", color: 'black' }} textAlign="center">{page}</Typography>
                                            </div>
                                            // <Typography textAlign="center">{setting}</Typography>
                                        ) : page == 'Produse' ? (
                                            <Typography component="a" href="/produse" sx={{ textDecoration: "none", color: 'black' }} textAlign="center">{page}</Typography>


                                        ) : (
                                            <Typography textAlign="center">{page}</Typography>

                                        )


                                    }
                                    {/* <Typography key={page} sx={{fontFamily:"Roboto"}} href={'/' + page} textAlign="center">{page }</Typography> */}
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
                    >
                        LOGO
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {pages.map((page) => (
                            <Button
                                key={page}
                                href={'/' + page}
                                onClick={handleCloseNavMenu}
                                sx={{ my: 2, color: 'white', display: 'block', textDecoration: 'none' }}
                            >
                                {page}
                            </Button>
                        ))}
                    </Box>
                    {isLoggedIn && (

                        <Box sx={{ flexGrow: 0 }}>
                            <Button sx={{ width: 40, height: 40, margin: 0, py: 0, display: "inline" }}>
                                <Img alt="complex" src={info} onClick={handleClickOpen} />
                            </Button>
                            <BootstrapDialog
                                onClose={handleClose}
                                aria-labelledby="customized-dialog-title"
                                open={open}
                            >
                                <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
                                    Informații
                                </BootstrapDialogTitle>
                                <DialogContent sx={{ width: '500px' }} dividers>

                                    {/* <Typography gutterBottom> */}

                                    <p>Aveți o nelămurire?</p>
                                    <TableContainer component={Paper}>
                                        <Table aria-label="collapsible table">
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell />
                                                    <TableCell>Informatii</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {rows.map((row) => (
                                                    <Row key={row.name} row={row} />


                                                ))}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>

                                </DialogContent>
                                <DialogActions>
                                    <Button autoFocus onClick={handleClose}>
                                        OK
                                    </Button>
                                </DialogActions>
                            </BootstrapDialog>
                            <Tooltip title="Open settings">
                                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                    <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                                </IconButton>
                            </Tooltip>
                            <Menu
                                sx={{ mt: '45px' }}
                                id="menu-appbar"
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}
                            >
                                {settings.map((setting) => (
                                    <MenuItem key={setting} onClick={handleCloseUserMenu}>
                                        {
                                            setting == 'Cos' ? (
                                                <div href="/cos" sx={{ textDecoration: "none" }} >  
                                                    <Typography component="a" href="/cos" sx={{ textDecoration: "none", color: 'black' }} textAlign="center">{setting}</Typography>
                                                </div>
                                            ) : setting == 'Cont' ? (
                                                <div sx={{ textDecoration: "none" }} >
                                                    <Typography component="a" href="/cont" sx={{ textDecoration: "none", color: 'black' }} textAlign="center">{setting}</Typography>
                                                </div>
                                               
                                            ) : setting == 'Logout' ? (
                                                <Typography component="a" onClick={onLogout} sx={{ textDecoration: "none", color: 'black' }} textAlign="center">{setting}</Typography>

                                            ) : (
                                                <Typography textAlign="center">{setting}</Typography>

                                            )

                                        }

                                    </MenuItem>
                                ))}


                            </Menu>
                        </Box>
                    )}
                    {!isLoggedIn && (

                        <Box sx={{ flexGrow: 0 }}>
                            <Box>
                                <Button href="/login" sx={{ my: 2, color: 'white', display: 'block', textDecoration: 'none' }}>LOGIN</Button>
                            </Box>



                        </Box>



                    )}
                </Toolbar>
            </Container>
        </AppBar>
    );
};
export default ResponsiveAppBar;