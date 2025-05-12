'use client'
import Image from 'next/image';
import Link from 'next/link'; // Import Link
import React, { useState } from 'react';

import { useEffect, useMemo} from 'react';
import './style.css';
import { MenuItem } from '@mui/material';

const profiles = [
  {
    id: 'alex',
    name: 'Alex',
    species: 'Bird',
    breed: 'Blue Macaw',
    location: 'Rio, BZ',
    image: 'profile-picture.jpg',
  },
  {
    id: 'jithan',
    name: 'Jithan',
    species: 'Cat',
    breed: 'Siamese',
    location: 'Los Angeles, CA',
    image: 'profile-picture.jpg',
  },
  {
    id: 'gus',
    name: 'Gus',
    species: 'Cat',
    breed: 'Orange',
    location: 'San Diego, CA',
    image: 'profile-picture.jpg',
  },
  {
    id: 'ricky',
    name: 'Ricky',
    species: 'Pupper',
    breed: 'Smol',
    location: 'Las Vegas, NV',
    image: 'profile-picture.jpg',
  },
  {
    id: 'muhammed',
    name: 'Muhammed',
    species: 'Cat',
    breed: 'Garfield',
    location: 'Chicago, IL',
    image: 'profile-picture.jpg',
  },
  {
    id: 'david',
    name: 'David',
    species: 'Werewolf',
    breed: 'American',
    location: 'London',
    image: 'david.jpg',
  },
];

export default function SearchPage() {
  const [searchInput, setSearchInput] = React.useState('');
  const [profileList, setProfileList] = useState([]);

  useEffect(() => {
    console.log("mount")
    fetch(`api/profile/search`, {method: "get"}).then((response) => response.json()).then((profile) => {
      setProfileList(profile)
    });
  }, []);

  // async function handleSearchClick () {  
  //     await fetch(`api/profile/petinfo/getter`, {method: "get"}).then((response) => response.json()).then((profile) => {
  //       setProfileList(profile);
  //     });
  
  // };

  
  const filteredProfiles = profileList.filter(
    (profile) =>
      profile.petName.toLowerCase().includes(searchInput.toLowerCase()) ||
      profile.species.toLowerCase().includes(searchInput.toLowerCase()) ||
      profile.breed.toLowerCase().includes(searchInput.toLowerCase()) ||
      profile.location.toLowerCase().includes(searchInput.toLowerCase())
  );

  const handleInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  return (
    <div className="search-page-container">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search Profiles"
          className="search-input"
          value={searchInput}
          onChange={handleInputChange}
        />
        <button className="search-button" >Search</button>
      </div>
      <div className="profile-list">
        {filteredProfiles.map((profile) => (
          <Link key={profile.petId} href={`/demo_profile/${profile.petId}`} as={`/demo_profile/${profile.petId}`}>
            <div className="profile-card clickable">
              <div className="profile-image">
                {/* Use the 'image' property from the profile */}
                <Image src={profile.profileImage} alt="Profile Picture" width={200} height={200} />
              </div>
              <div className="profile-details">
                <h2 className="profile-name">{profile.petName}</h2>
                <p className="profile-species">Species: {profile.species}</p>
                <p className="profile-breed">Breed: {profile.breed}</p>
                <p className="profile-location">Location: {profile.location}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}