import React, { useState,useEffect } from "react";
import Routes from "./src/Navigation/Routes";
import { Signin } from ".";
import AuthStack from "./src/Navigation/AuthStack";
import { NavigationContainer } from "@react-navigation/native";
import { nailsalon,hairsalon } from "./src/components/Dummydata";
import { Provider } from "react-redux";
import { store } from "./store";
import { StripeProvider } from '@stripe/stripe-react-native';
import { FavoritesProvider } from "./src/contextApi/FavouriteContext";

import axios from "axios";
import imagePath from "./src/constants/imagePath";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from "./ipconfig";
import SplashScreenView from "./SplashScreenView";

export default function App() {
const [isShownSplash,setIsShownSplash] = useState(true)
  useEffect(() => {
    setTimeout(async () => {
     setIsShownSplash(false)
    }, 4000); 
  }, []);

  const [allSalons, setAllSalons] = useState([]);
  const categories = [
    { name: 'Hair Salon', imagePath: imagePath.hairsalon },
    { name: 'Nail Salon', imagePath: imagePath.nailsalon },
    { name: 'Home Service', imagePath: imagePath.homeservice },
    { name: 'Make Up', imagePath: imagePath.makeup },
    { name: 'Spa', imagePath: imagePath.spa },
  ];

  const selectedType = 'yourSelectedType';
  useEffect(() => {
    const fetchSalons = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/salon/getSalons`,
          {
            headers: {
              'Cache-Control': 'no-cache, no-store, must-revalidate',
              Pragma: 'no-cache',
              Expires: '0',
            },
            params: {
              salonType: categories.map((category) => category.name),
              selectedType: selectedType,
            },
          }
        );
      
        setAllSalons(response.data);
      } catch (error) {
        console.error('Error fetching salons:', error);
      }
    };
    fetchSalons();
  }, [selectedType]);

  const [login, setLogin] = useState(false)
  const handleSignIn = () => setLogin(true);
  
  const [permissionStatus, setPermissionStatus] = useState(null);
  const [location, setLocation] = useState(null);
    

  const [address, setAddress] = useState(null);


  

 
  return <>
  {isShownSplash?<SplashScreenView/>:
   <FavoritesProvider>

   
   <StripeProvider publishableKey="pk_test_51PIFiAFdq3SMwAKaqLqamiYft5sraI8d13P9vy0x3mMC2NS1qPdI9Ygm7v8QceNqIgfunx6BwACCIKYQtSwbz7Jm00Cx9Ovein">
 
 
 <NavigationContainer>
   <Routes login={login}  onSignIn={handleSignIn} setLogin={setLogin} allSalons ={allSalons} categories={categories}
    location={location} setLocation = {setLocation} address ={address} setAddress={setAddress}
    permissionStatus={permissionStatus} setPermissionStatus={setPermissionStatus}/>

 </NavigationContainer>

 </StripeProvider>
 
 
 </FavoritesProvider>


  }
  
  </>
}