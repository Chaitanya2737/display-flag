import React, { useEffect, useState } from 'react';
import { flag } from '../api/Api';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import './style.css';
import Typography from '@mui/material/Typography';
import Search from './Search';

const Flag = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const img = "https://mainfacts.com/media/images/coats_of_arms/in.png";

  const brokeImg = (event) => {
    event.currentTarget.src = img;
  };

  const getflags = async () => {
    try {
      const flagdata = await flag();
      setData(flagdata);
      setFilteredData(flagdata); // Initialize filteredData with all flags
    } catch (error) {
      console.error('Failed to fetch flags:', error);
    }
  };

  useEffect(() => {
    try {
        getflags();
    } catch (error) {
        console.log(error)
    }
  }, []);

  const handleSearch = (searchTerm) => {
    if (searchTerm === '') {
      setFilteredData(data); // Reset to all data if search is empty
    } else {
      const filtered = data.filter((flag) =>
        flag.name.common.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredData(filtered);
    }
  };

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

  return (
    <Box sx={{ width: '100%' }}>
      <Search data={data} onSearch={handleSearch} />

      <Grid container className='container' spacing={{ xs: 2, md: 3 }}>
        {filteredData.map((flag, index) => (
          <Grid item xs={12} md={3} lg={4} xl={2} key={index}>
            <Item>
              <img
                src={flag.coatOfArms?.png || img}
                className='photo'
                alt='original image is not found'
                onError={brokeImg}
              />
              <Typography variant="h6" color="initial">
                {flag.name.common}
              </Typography>
            </Item>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Flag;
