import { View, Text, FlatList, TouchableOpacity, Image, Linking,StyleSheet } from 'react-native';
import React, { useState, useEffect } from "react";
import {
  scale,
  verticalScale,
  moderateScale,
  moderateVerticalScale,
} from "react-native-size-matters";
import {
  StarIcon,
  MapPinIcon,
  HeartIcon,
} from "react-native-heroicons/outline";
import color from "../constants/color";
import navigationStrings from "../constants/navigationStrings";
import { useNavigation } from "@react-navigation/native";
import * as Location from 'expo-location';
import MapView, { Marker } from 'react-native-maps';
import { userLocation } from './UserLocation';
import { IMAGELOCATION } from '../../ipconfig';

const haversineDistance = (coords1, coords2) => {
  const toRad = x => (x * Math.PI) / 180;
  const R = 6371; 

  const dLat = toRad(coords2.latitude - coords1.latitude);
  const dLon = toRad(coords2.longitude - coords1.longitude);
  const lat1 = toRad(coords1.latitude);
  const lat2 = toRad(coords2.latitude);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c; 
};

export default function Map({ allSalons, permissionStatus, setPermissionStatus, setAddress, setLocation, address, location }) {
  const navigation = useNavigation();
  const [data, setData] = useState([]);
  const [mapRegion, setMapRegion] = useState({
    latitude: 37.7,
    longitude: -122,
    latitudeDelta: 0.005,
    longitudeDelta: 0.005,
  });

  useEffect(() => {
    const getLocation = async () => {
      if (permissionStatus !== 'granted') {
        try {
          const { location, address, permissionStatus1 } = await userLocation();
          setPermissionStatus(permissionStatus1);

          if (permissionStatus1 === 'granted') {
            setLocation(location);
            setAddress(`${address[0].name}, ${address[0].city}`);
            setMapRegion({
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
              latitudeDelta: 0.005,
              longitudeDelta: 0.005,
            });
          }
        } catch (error) {
          console.log(error);
        }
      } else {
        try {
          setMapRegion({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
          });
        } catch (error) {
          console.log(error);
        }
      }
    };
    getLocation();
  }, [permissionStatus]);

  

  useEffect(() => {
   
    const formattedData = allSalons.map(item => ({
      ...item,
      latitude: parseFloat(item.location.latitude),
      longitude: parseFloat(item.location.longitude)
    }));

    if (location) {
      const nearbySalons = formattedData.filter(item => {
        const distance = haversineDistance(location.coords, { latitude: item.latitude, longitude: item.longitude });
        return distance <= 11; 
      });
      setData(nearbySalons);
     
    }
  }, [location, allSalons]);

  const handleMarkerPress = (item) => {
    const { latitude, longitude } = item;
    const url = `https://www.google.com/maps/dir/?api=1&origin=${location.coords.latitude},${location.coords.longitude}&destination=${latitude},${longitude}`;
    Linking.openURL(url);
  };

  return (
    <View>
      <MapView
        style={{ height: moderateVerticalScale(750) }}
        region={mapRegion}
      >
        {location ? (
          <Marker
            coordinate={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            }}
            title={address}
          />
        ) : null}

        {data.map((item, index) => (
          <Marker
            key={index}
            coordinate={{
              latitude: parseFloat(item.location.latitude),
              longitude: parseFloat(item.location.longitude),
            }}
            onPress={() => handleMarkerPress(item)}
          >
            <View style={{ alignItems: 'center' }}>
              <Text
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.7)', 
                  paddingHorizontal: 5,
                  borderRadius: 5,
                }}
              >
               {item.name}
              </Text>
              <Image
               source={{ uri: `${IMAGELOCATION}${item.coverImage}`}}
                style={{ width: 40, height: 40, borderRadius: 20 }}
              />
            </View>
          </Marker>
        ))}
      </MapView>

      {location ? (
        <View style={{ position: 'absolute', zIndex: 1, bottom: moderateVerticalScale(210) }}>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={data}
            
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => navigation.navigate(navigationStrings.SHOP, { item })}
              >
                <View
                  style={{
                    flexDirection: "row",
                    margin: verticalScale(7),
                    borderWidth: moderateScale(1),
                    borderRadius: moderateScale(10),
                 
                    backgroundColor: "white",
                    borderColor: "white",
                  }}
                >
                  <Image
                    source={{ uri: `${IMAGELOCATION}${item.coverImage}`}}
                    style={{ width: moderateScale(120), height: moderateVerticalScale(120) }}
                  />
                  <View style={{ flexDirection: "row", flex: 0.6 }}>
                    <View style={{ padding: moderateScale(20) }}>
                      <Text style={{ fontSize: scale(17), fontWeight: "400", color }}>
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
                      <View style={{ flexDirection: "row" }}>
                        <MapPinIcon size={18} color="grey" />
                        <Text style={{ fontSize: scale(12), color: color.textColor }}>
                          {item.address}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            )}
          />
        </View>
      ) : null}
    </View>
  );
}
