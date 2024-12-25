import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import {
  StarIcon,
  MapPinIcon,
  HeartIcon,
} from 'react-native-heroicons/outline';
import { useNavigation } from '@react-navigation/native';
import { useFavorites } from '../../contextApi/FavouriteContext'; // Import context
import {
  scale,
  verticalScale,
  moderateScale,
  moderateVerticalScale,
} from 'react-native-size-matters';
import color from '../../constants/color';
import navigationStrings from '../../constants/navigationStrings';
import { IMAGELOCATION } from '../../../ipconfig';
export default function Cards({ data }) {
  
  
  const navigation = useNavigation();

  const { favorites, updateFavorites } = useFavorites();

  const toggleHeart = (item) => {
    const isFavorite = favorites.some((fav) => fav._id === item._id);
    let newFavorites;

    if (isFavorite) {
      newFavorites = favorites.filter((fav) => fav._id !== item._id);
      Alert.alert('Removed from favorites');
    } else {
      newFavorites = [...favorites, item];
      Alert.alert('Added to favorites');
    }

    updateFavorites(newFavorites);
  };

  return (
    <FlatList
      data={data}
      
      renderItem={({ item }) => (
        <TouchableOpacity
          onPress={() =>
            navigation.navigate(navigationStrings.SHOP, { item })
          }
        >
          <View
            style={{
              flexDirection: 'row',
              margin: verticalScale(6),
              borderWidth: moderateScale(1),
              borderRadius: moderateScale(10),
              backgroundColor: 'white',
              borderColor: 'white',
            }}
          >
            <View style={{ flex: 0.3 }}>
              <Image
               
                source={{ uri: `${IMAGELOCATION}${item.coverImage}`}}
                style={{
                  width: moderateScale(120),
                  height: moderateVerticalScale(120),
                }}
              />
            </View>

            <View style={{ flexDirection: 'row', flex: 0.6 }}>
              <View style={{ padding: moderateScale(20) }}>
                <Text
                  style={{
                    fontSize: scale(17),
                    fontWeight: '400',
                    color,
                  }}
                >
                  {item.name}
                </Text>

                <View style={{ flexDirection: 'row' }}>
  {[1, 2, 3, 4, 5].map((star) => (
    <StarIcon
      key={star}
      color="grey"
      size={15}
      fill={star <= item.rating ? color.background : 'none'} // Fill the star if its value is <= the rating
    />
  ))}
</View>
                <View style={{ flexDirection: 'row' }}>
                  <MapPinIcon size={18} color="grey" />
                  <Text style={{ fontSize: scale(12), color: color.textColor }}>
                    {item.address}
                  </Text>
                </View>
              </View>
            </View>

            <TouchableOpacity
                onPress={() => toggleHeart(item)}
                style={{ flex: 0.1, paddingVertical: moderateVerticalScale(5) }}
              >
                {favorites.some((fav) => fav._id === item._id)? (
                  <HeartIcon size={20} color="grey" fill={color.background} />
                ) : (
                  <HeartIcon size={20} color="grey" />
                )}
              </TouchableOpacity>
          </View>
        </TouchableOpacity>
      )}
      keyExtractor={(item) => item._id}
    />
  );
}
