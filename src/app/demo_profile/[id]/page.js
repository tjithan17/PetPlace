'use client'
import Image from 'next/image';
import { useEffect, useState, useMemo} from 'react';
import '../style.css';
import { Button, MenuItem } from '@mui/material';
import Link from 'next/link';


export default function otherProfile({params}) {
  const [gallery, setGallery] = useState([]);
  const [curUser, setCurUser] = useState([])
  const idPhoto = parseInt(params.id);
  console.log(idPhoto)
  //const [showUploadedImages, setShowUploadedImages] = useState(false);

  const [petInfo, setPetInfo] = useState({
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

  const [userInfo, setUserInfo] = useState({
    userImage: "/goated.jpg",
    name: "Your Name",
    username: "Your username"
  })


  const [editedPetInfo, setEditedPetInfo] = useState({ ...petInfo });


  //Updates whatever section got updated. So if name got updated it will update name and if species got updated it updates species textbox

  useEffect(() => {
    console.log("mount")
    const fetchPetInfo = async () => {
      try {
        let link = `/api/profile/petinfo/getter/${idPhoto}`
        const response = await fetch(link, {method: "get"})
        if(response.ok){
          const data = await response.json(); // Parse the JSON response
          if(data.status === 'No Profile'){
            console.error('Error No Profile Found')
          }
          else{
            setEditedPetInfo(data);
            let uid = data.userId
            let link2 = `/api/users/${uid}`
            const newres = await fetch (link2, {method: "get"})
            if (newres.ok)
            {
              const newuser = await newres.json();
              if(newuser)
              {
                setCurUser(newuser)
                setUserInfo(newuser)
              }
            }
          }

          
          //console.log(data)
        }
      } catch (error) {
        console.error('Error fetching pet information:', error);
      }
    };
    
    const fetchpetGal = async () =>{
      try {
        const response2 = await fetch(`api/profile/galleryhome/getter`, {method: "get"})
        if(response2.ok){
          const data2 = await response2.json()
          setGallery(data2)
        }
        
      } catch(error){
        console.error('Error fetching pet information:', error);
      }
    }

    fetchPetInfo();
    fetchpetGal()
  }, []);

  async function createChatroom(){
    await fetch(`/api/profile/messages`, {method: "post", body: JSON.stringify({name: curUser.username, nameid: curUser.id})}).then((res) => {
      return res.json().then((outp) => {
          window.location.href = '/messages'
      })})

  }

  //memorize gallery to prevent from re rendering if gallery isn't updated.
  const memorizedGallery = useMemo(() => (

    gallery.map((image, index) => {
      // console.log(image)
      return (
        <div key={index}>
          <Image src={image} alt={`Gallery Image ${index}`} width={100} height={100} />
        </div>
      );
      
    })
  ), [gallery]);


  return (
    <div className="profile-container">
      <div className = "pet-container">
        <div className="profile-header">
          
          <div className="profile-image">
              <Image src={editedPetInfo.profileImage} alt="Profile Picture" width = {200} height ={200} />
          </div>
          <div className="profile-info">
            <h1 className="profile-name">
                {editedPetInfo.petName}
            </h1>
            <p className="profile-bio">
                {editedPetInfo.bio}
            </p>
          </div>
          <div className="message">
            <Button className= "message-button"onClick={createChatroom} style = {{ display: 'block', marginLeft: '1075px', 
              backgroundColor: '#3498db',/* Add a blue background color */
              padding: '10px', /* Optional: Add padding for spacing between the image and the box */
              borderRadius: '8px', /* Optional: Add border-radius for rounded corners */
              
              color: 'white'}} >Message</Button>
          </div>

        </div>
        <h2>Pet Info</h2>
        <ul className="pet-info-list">
          <li className="pet-info-item">
            <strong>Species:</strong>
              {editedPetInfo.species}
          </li>
          <li className="pet-info-item">
            <strong>Breed:</strong>
              {editedPetInfo.breed}
          </li>
          <li className="pet-info-item">
            <strong>Age:</strong>
              {editedPetInfo.age}
          </li>
          <li className="pet-info-item">
            <strong>Vaccine Status:</strong>     
              {editedPetInfo.vaxxed}
          </li>
          <li className="pet-info-item">
            <strong>Neuter Status:</strong>
              {editedPetInfo.sprayedNeutered}
          </li>
          <li className="pet-info-item">
            <strong>Location:</strong>  
              {editedPetInfo.location}
          </li>
        </ul>
        <div>
        {memorizedGallery} 
        </div>
      </div>
      <div className = "userContainer">
        <div className="profile-image">          
          <Image src={userInfo.userImage} alt="Profile Picture" width = {200} height ={200} />           
        </div>
        <div className="user-info">
          <h1 className="user-name">  
              {userInfo.name}
          </h1>
          <h2 className="user-username">
                {userInfo.username}
          </h2>
        </div>
      </div>
    </div>
  );
}