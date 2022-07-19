import * as React from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Title from './title';
import { useState, useEffect } from 'react';

function preventDefault(event) {
    event.preventDefault();
}

export default function ComenziAcasa() {
    const SERVER = `http://localhost:8080`;
    const [category, setcategory] = useState([])
    const [suma, setSuma] = useState(null);
    const [numar, setNumar] = useState(null);
    // const [today, setToday]=useState(new Date);
    // let today = new Date().toISOString().slice(0, 10);
    let today = new Date().toLocaleDateString()


    const getCategory = async () => {
        fetch(`${SERVER}/api-restaurant/orders`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })

            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Eroare!');
                }
            })
            .then((data) => {
                console.log(data)
                console.log('ok')
                setcategory(data);


                let s = 0;
                let nr=0
                for (let i = 0; i < data.length; i++)
                    if (data[i].numar == ' comanda la domiciliu')
                       { s = s + data[i].total;
                        nr=nr+1;
                    }
                console.log("dom"+data.length)
                console.log(s);
                setSuma(s);
                setNumar(nr)
            })
            .catch((e) => { console.log(e) })
    }

    useEffect(() => {

        getCategory()
        //vanzariInregistrate();
        console.log("vanzari" + suma);
    }, []);

    return (
        <React.Fragment>
            <Title>Comanzi plasate acasă</Title>
            <Typography component="p" variant="h6">
                <a>
                    Numar: {numar} 
                </a>
            </Typography>
            <Typography color="text.secondary" sx={{ flex: 1 }}>
                <a>
                    Valoare: {suma} lei
                </a>
            </Typography>
            <div>
                {/* <Link color="primary" href="#" onClick={preventDefault}>
          View balance
        </Link> */}
            </div>
        </React.Fragment>
    );
}