import { useState, useEffect } from 'react'
import ProductCard from '../components/product';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { ToastContainer, toast } from 'react-toastify';
import { width } from '@mui/system';

//pentru fiecare categorie intram pe pagina de produse care afiseaza produele ce apartin categoriei selectate
function Product() {
    const [data, setdata] = useState([]);
    const SERVER = `http://localhost:8080`;

    useEffect(() => {
        //preluam id ul trimis din pagina de home
        const href = window.location.href;
        console.log(href)
        const id = href.split('/').at(-2);

        const getProduct = async () => {
            const res = await fetch(`${SERVER}/api-restaurant/category/${id}/produs`)
            const data = await res.json();
            console.log(data);
           
            setdata(data)
          
        }
        getProduct();
        console.log("lungime"+data.length)
        if(data.lenght<1){
            console.log("dhhsdh")
            toast.error('Din pacate nu mai exista produse din categoria selectată', {
                position: "top-right",
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            
        }

    }, []);

    return (
        // <div>
        //     <Grid>
        //         {data.map(product => 
        //             <Container sx={{py:0,mb:5,mt:5,backgroundColor:"#1a1c1b",margin:0,backgroundSize:"cover" }} maxWidth='xl'>
        //                 <ProductCard key={product.id} product={product} />
        //             </Container>

        //         )}
        //     </Grid>
        // </div>)

        <div  id='produse'style={{backgroundColor:"#3f3f3f", backgroundSize:"cover"}}>
            <Container sx={{margin:0, align:"center"}}>
            <lottie-player src="https://assets5.lottiefiles.com/packages/lf20_bnh0nfjr.json"
             background="transparent" 
             speed="1"
             loop  autoplay
            //  style="width: 300px; height: 300px;"
            style={{width:300,align:"center"}}
            >

               </lottie-player>
               </Container>
            

            <Container sx={{ py: 5, mb: 0, mt: 0, ml: 0, margin: 0, backgroundSize: "cover" }} maxWidth='xl'>
                <Grid  container spacing={3}>
                    {data.map((product) => (
                        <ProductCard  key={product.id} product={product} />
                    ))}
                </Grid>
            </Container>
        </div>
    )

} export default Product;