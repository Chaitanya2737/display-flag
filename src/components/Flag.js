import React, { useEffect, useState } from 'react'
import { flag } from '../api/Api'
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import "./style.css"
import Typography from '@mui/material/Typography'


const Flag = () => {
    const [data, setData] = useState([])


    const img =  "https://mainfacts.com/media/images/coats_of_arms/in.png"

    const brokeImg = (event) =>{

        console.log(event)
        event.currentTarget.src= img;
    }



    const getflags = async () => {
        const flagdata = await flag();
        setData(flagdata)
    }


    useEffect(() => {
        getflags()
    }, [])

    console.log(data)

    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));

    return (
        <Box sx={{ width: '100%' }} >
            <Grid container className='container'  spacing={{ xs: 2, md: 3 }}>

                {
                    data.map((flag, index) => (
                        <Grid item xs={12} md={3} lg={4} xl={2} key={index}>
                            <Item >
                                <img src={ flag.coatOfArms.png || img } className='photo' alt='original image is not found' />
                                <Typography variant="h6" color="initial" >
                                {flag.name.common }
                                </Typography>
                           </Item>
                        </Grid>
                    ))
                }

            </Grid>
        </Box>
    )
}

export default Flag