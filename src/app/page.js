'use client'

import { useState, useEffect, use } from 'react';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import DeleteForever from '@mui/icons-material/DeleteForever';
import AddBox from '@mui/icons-material/AddBox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Box, Grid, TextField } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';
import { Icon } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { FaceRetouchingNatural } from '@mui/icons-material';
import Image from 'next/image';
import Link from 'next/link';



const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function ToDos() {

    const [isLoading, setIsLoading] = useState(true);
    const [galleries, setGalleries] = useState([]);
    const [isEmpty, setIsEmpty] = useState(true);
    const [curProfile, setCurProfile] = useState({
      petName: '...',
      species: '...',
      breed: '...',
      age: '...',
      vaxxed: '...',
      sprayedNeutered: '...',
      location: '...',
      bio: '...',
      profileImage: '/goated.jpg', // Example URL for the profile image
    });


    // useEffect(() => {
    //     fetch("/api/profile/galleryhome", { method: "get" })
    //       .then((response) => response.ok && response.json())
    //       .then(galleries => {
    //         galleries && setGalleries(galleries);
    //         console.log(galleries)
    //         setIsLoading(false);
    //       });
    //   }, [])

      useEffect(() => {
        console.log("mount")
        fetch(`/api/profile/petinfo/getter`, {method: "get"}).then((response) => response.json()).then((profile) => {
          return fetch(`/api/profile/galleryhome`, { method: "get" }).then(res => res.json()).then((gallery) => {
            if(profile !== '')
            {
              setCurProfile(profile);
            }
            setGalleries(gallery);
            setIsLoading(false);
          });
        });
        // async function fetchPetInfo() {
        //   try {
        //     const response = await 
        //     if(response.ok){
        //       const data = await response.json(); // Parse the JSON response    
              
        //       //console.log(data)
        //     }
        //   } catch (error) {
        //     console.error('Error fetching pet information:', error);
        //   }

        //   try {
        //     const response2 = await 
        //     if(response2.ok){
        //       const data2 = await response2.json()
        //       setGalleries(data2);
        //     }
            
        //   } catch(error){
        //     console.error('Error fetching gallery information:', error);
        //   }
        //   return "done";
        // }
    
        // let done = await fetchPetInfo();
        // setIsLoading(false)
      }, []);
    

    const loadingItems = <CircularProgress/>;
    
    const toDoItems = isLoading ? loadingItems : galleries.map((photo, idx) => {
      let link;
        if (photo.petProfileId === curProfile.petId)
        {
          link = `/demo_profile`;
        }
        else
        {
          link = `/demo_profile/${photo.petProfileId}`;
        }
        return <Grid item xs = {2.4} sm = {2.4} md = {2.4} lg = {2.4} xl = {2.4}>  
            <Button sx ={{border: '5px solid #000' ,width: 300, height: 300 }} component = {Link} href={link}>
                <Image src = {photo.imageUrl} alt = "photos" width = {290} height = {290}/>
            </Button>
        
        </Grid>
    })
    
    const cityGallery = isLoading ? loadingItems : galleries.filter((vals) => {
        return (vals.location === curProfile.location) })

    function splitArr(array)
    {
        const resu = [];
        if (array.length === 0)
        {
            return [[]];
        }
        else
        {
        for (let i = 0; i< array.length; i+=5)
        {
            resu.push(array.slice(i,i+5));
        }
       
        return resu;
    }
    }



    const [arryInd, setArryInd] = useState(0);

    const slider = isLoading ? loadingItems :  splitArr(cityGallery)[arryInd].map((val, idx) => {
      let link;
      if (val.petProfileId === curProfile.petId)
      {
        link = `/demo_profile`;
      }
      else
      {
        link = `/demo_profile/${val.petProfileId}`;
      }
      return <Grid item xs = {2.4} sm = {2.4} md = {2.4} lg = {2.4} xl = {2.4}>
        <Button sx ={{border: '5px solid #000' ,width: 300, height: 300 }} component = {Link} href={link}>
                <Image src = {val.imageUrl} alt = "photos" width = {290} height = {290}/>
            </Button>
      </Grid>
    })

    function sliderInc (){
      if (arryInd >= 0 && arryInd < splitArr(cityGallery).length - 1 )
      {
        setArryInd(arryInd + 1);
      }
    }

    function sliderDec (){
      if (arryInd > 0 && arryInd <= splitArr(cityGallery).length - 1)
      {
        setArryInd(arryInd - 1)
      }
    }




    return (
        <>
         {/* <li> link: <a href="/demo_profile"> demo profile page</a>   </li> */}
            <h2><center>{!isLoading && <ListItem key="leftArrow" secondaryAction={<IconButton sx={{position: 'relative', right: '1720px', top: '100px'}} onClick={sliderDec}><ArrowBackIosIcon sx={{color: 'black'}} /></IconButton>}>
                        </ListItem>}
                        Explore Your Area 
                        {!isLoading && <ListItem key="rightrrow" secondaryAction={<IconButton sx={{position: 'relative',left: '40px', top: '50px'}} onClick={sliderInc}><ArrowForwardIosIcon sx={{color: 'black'}} /></IconButton>}>
                        </ListItem>} 
                  </center></h2>
            <center><Box sx = {{flexgrow: 1, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
              <Grid container justifyContent = "center" alignItems = "center" rowSpacing = {1} >
                {slider}
                 
              </Grid>
            </Box></center>

            <h2><center>Explore All</center></h2>
            <center><Box sx = {{ flexgrow: 1}}>
              <Grid container rowSpacing = {1} >
                {toDoItems}
              </Grid>
            </Box></center>
        </>
    );
}