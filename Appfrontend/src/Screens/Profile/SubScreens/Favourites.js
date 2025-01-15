import { View, Text,StyleSheet,TouchableOpacity,Image ,FlatList} from 'react-native'
import React from 'react'
import { useFavorites } from '../../../contextApi/FavouriteContext';
import navigationStrings from '../../../constants/navigationStrings';
import { IMAGELOCATION } from '../../../../ipconfig';
import {  StarIcon } from 'react-native-heroicons/outline';

export default function Favourites({navigation}) {
      const { favorites } = useFavorites(); 
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
  return (
    <View style={styles.container}>
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
           
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.listContainer}
          />
        )}
    </View>
  )
}
const styles = StyleSheet.create({
     container:{
        flex:1
     },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginVertical: 10,
        paddingHorizontal: 20,
      },
      listContainer: { paddingHorizontal: 16, paddingTop: 20 },
      image: { width: '100%', height: 120 },
      cardContent: { padding: 10 },
      categories: { fontSize: 12, color: '#888', marginBottom: 4 },
      salonName: { fontSize: 16, fontWeight: 'bold', color: '#333', marginBottom: 4 },
      ratingContainer: { flexDirection: 'row', alignItems: 'center' },
      rating: { marginLeft: 4, fontSize: 14, color: '#333' },
      reviews: { marginLeft: 4, fontSize: 14, color: '#888' },
      card: {
   
        borderRadius: 10,
        marginRight: 5,
        width:'100%',
       marginBottom:30,
        height: 200, 
        elevation: 2,
        backgroundColor: 'white',
        
      },
});