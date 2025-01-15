import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image,
  FlatList,
  ScrollView,
  ActivityIndicator,

} from 'react-native';
import styles from './styles';
import { IMAGELOCATION } from '../../../ipconfig';
import axios from 'axios';
import { moderateScale, moderateVerticalScale, } from 'react-native-size-matters';
import imagePath from '../../constants/imagePath';
import navigationStrings from '../../constants/navigationStrings';
import GetLocation from '../../components/GetLocation';
import SearchBar from '../../components/SearchBar';
import color from '../../constants/color';
import { BellIcon } from 'react-native-heroicons/outline';
import { HeartIcon, StarIcon } from 'react-native-heroicons/outline';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFavorites } from '../../contextApi/FavouriteContext'; // Import Favorites context

export default function Home({
  navigation,
  permissionStatus,
  setPermissionStatus,
  location,
  setLocation,
  address,
  setAddress,
  allSalons,
  categories
}) {

console.log(allSalons);
  const bannerData = [
    { id: '1', image: imagePath.promo},
    { id: '2', image: imagePath.promo },
    { id: '3', image: imagePath.promo },
    
  ];
  

  
  const { favorites } = useFavorites(); 
 
  
  const [userName, setUserName] = useState('');
  const [loading, setLoading] = useState(true);

 

  const [searchQuery, setSearchQuery] = useState('');

  

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await AsyncStorage.getItem('auth');
        if (userData) {
          const parsedData = JSON.parse(userData);
          setUserName(parsedData.user.first_name);
          
          
        }
      } catch (error) {
        console.log('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchUserData();
  }, []);

 

  const handleCategorySelect = (category) => {
    const filtered = allSalons.filter((salon) =>
      salon.salonType.includes(category)
    );
    navigation.navigate(navigationStrings.CATEGORIES, {
      category: {
        name: category,
        data: filtered,
        placeholder: `Search for ${category}`,

      },
    });
  };

  const renderCategory = ({ item }) => (
    <TouchableOpacity
      style={styles.categoryButton}
      key={item.name}
      onPress={() => handleCategorySelect(item.name)}
    >
      <Image source={item.imagePath} style={styles.categoryImage} />
      <Text style={styles.categoryText}>{item.name}</Text>
    </TouchableOpacity>
  );

  const renderFavoriteSalon = ({ item }) => (
   <TouchableOpacity
  //  activeOpacity={1}
   onPress={() =>
    navigation.navigate(navigationStrings.SHOP, { item })
    
  }
 
   >
     <View style={styles.card}>
      <Image  source={{ uri: `${IMAGELOCATION}${item.coverImage}`}} style={styles.image} />
      
      <View style={styles.cardContent}>
       
        <Text style={styles.categories}>
          {Array.isArray(item.salonType) ? item.salonType.join(', ') : 'No category'}
        </Text>
        <Text style={styles.salonName}>{item.name}</Text>
        <View style={styles.ratingContainer}>
          <StarIcon size={16} color="orange" />
          <Text style={styles.rating}>{item.rating || 'N/A'}</Text>
          <Text style={styles.reviews}>({item.numReviews || 0})</Text>
        </View>
      </View>
    </View>
   </TouchableOpacity>
  );

  const handleInput = () => {
    navigation.navigate(navigationStrings.SEARCHSCREEN)
  };


  if (loading) {
    return <View style={{flex:1,backgroundColor:'white'}}></View>;
  }
  
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
        
          <View style={styles.headerContent}>
            <Text style={styles.userText}>Hello, {userName}</Text>
            {loading?<ActivityIndicator size="large" color="#0000ff"/>:
              <GetLocation
              permissionStatus={permissionStatus}
              setPermissionStatus={setPermissionStatus}
              location={location}
              setLocation={setLocation}
              address={address}
              setAddress={setAddress}
            />
            
            }
          </View>
          
          <TouchableOpacity
            onPress={() => navigation.navigate(navigationStrings.NOTIFICATION)}
          >
            <BellIcon size={30} color={color.background} fill={color.foreground} />
          </TouchableOpacity>
        </View>

        <View style={{ marginTop: 10, paddingHorizontal: 10 }}>
        <SearchBar
      placeholder="Search for services"
      containerStyle={{
        borderColor: 'grey',
        borderRadius: 10,
        padding: 4,
        borderWidth: 0.5,
      }}
      onFocus={handleInput}  // Navigate when the search bar is focused (tapped)
    />
      </View>  
         
      <View style={styles.bannerContainer}>
      <FlatList
        data={bannerData}
        renderItem={({ item }) => (
          <Image source={item.image} style={styles.banner} />
        )}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled // To scroll one banner at a time
      />
    </View>


        <Text style={styles.sectionTitle}>What do you want to do?</Text>
        <FlatList
          horizontal
          data={categories}
          renderItem={renderCategory}
          keyExtractor={(item) => item.name}
          contentContainerStyle={styles.categoriesContainer}
          showsHorizontalScrollIndicator={false}
        />

        <Text style={styles.sectionTitle}>Your Favourites</Text>
        {favorites.length === 0 ? (
          <Text style={{ textAlign: 'center', marginTop: 10 }}>
            No favourites added yet.
          </Text>
        ) : (
          <FlatList
            data={favorites}
            renderItem={renderFavoriteSalon}
            keyExtractor={(item, index) => item._id || item.salonId || index.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.listContainer}
          />
        )}

        <Text style={styles.sectionTitle}>Featured Salons</Text>
        {Array.isArray(allSalons) ? (
  <FlatList
    data={allSalons.filter((salon) => salon.rating >= 4)} // Safely filter salons with rating >= 4
    renderItem={renderFavoriteSalon}
    keyExtractor={(item) => item._id || item.salonId.toString()}
    horizontal
    showsHorizontalScrollIndicator={false}
    contentContainerStyle={styles.listContainer}
  />

  
) : (
  <Text>Loading salons...</Text> // Show a fallback while salons are loading
)}
<Text style={styles.sectionTitle}>Hair Salons</Text>
    {Array.isArray(allSalons) ? (
  <FlatList
    data={allSalons.filter((salon) =>salon.salonType.includes("Hair Salon"))} // Safely filter salons with rating >= 4
    renderItem={renderFavoriteSalon}
    keyExtractor={(item) => item._id || item.salonId.toString()}
    horizontal
    showsHorizontalScrollIndicator={false}
    contentContainerStyle={styles.listContainer}
  />

  
) : (
  <Text>Loading salons...</Text> // Show a fallback while salons are loading
)}
<Text style={styles.sectionTitle}>Home Service</Text>
    {Array.isArray(allSalons) ? (
  <FlatList
    data={allSalons.filter((salon) =>salon.salonType.includes("Home Service"))} // Safely filter salons with rating >= 4
    renderItem={renderFavoriteSalon}
    keyExtractor={(item) => item._id || item.salonId.toString()}
    horizontal
    showsHorizontalScrollIndicator={false}
    contentContainerStyle={styles.listContainer}
  />

  
) : (
  <Text>Loading salons...</Text> // Show a fallback while salons are loading
)}

      </ScrollView>
    </SafeAreaView>
  );
}
