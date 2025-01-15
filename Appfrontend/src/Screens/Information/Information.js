import React from 'react';
import { View, Text, Image, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { IMAGELOCATION } from '../../../ipconfig';
export default function Information({ shopData }) {
  const { about, stylists, images } = shopData;
  console.log(shopData.images);

  return (
    <FlatList
      data={[]} // No data, just using FlatList as a container
      ListHeaderComponent={
        <View style={styles.container}>
          {/* About Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>About</Text>
            <Text style={styles.sectionContent}>{about}</Text>
            
          </View>

          {/* Specialists Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Our Specialists</Text>
            <FlatList
              data={stylists}
              horizontal
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item) => item._id}
              renderItem={({ item }) => (
                <View style={styles.specialistContainer}>
                  <Image
                    source={{ uri: item.profileImage || 'https://via.placeholder.com/100' }}
                    style={styles.specialistImage}
                  />
                  <Text style={styles.specialistName}>{item.name}</Text>
                  <Text style={styles.specialistRole}>{item.expertise}</Text>
                </View>
              )}
            />
          </View>

          {/* Photos Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Photos</Text>
            <FlatList
              data={images}
              // numColumns={2} 
              showsVerticalScrollIndicator={false}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
               <View style={styles.photos}>
                   <Image  source={{ uri: `${IMAGELOCATION}${item}`}} style={styles.photo} />

               </View>
              )}
            />
          </View>
        </View>
      }
    />
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  sectionContent: {
    fontSize: 14,
    color: '#555',
  },
  readMore: {
    color: 'red',
    fontWeight: 'bold',
    marginTop: 4,
  },
  specialistContainer: {
    alignItems: 'center',
    marginRight: 16,
  },
  specialistImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 8,
  },
  specialistName: {
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  specialistRole: {
    fontSize: 12,
    color: '#555',
    textAlign: 'center',
  },
  photo: {
    width: 300,
    height: 300,
    borderRadius: 8,
    margin: 8,
  
  },
  photos:{
    justifyContent:'center',
    alignItems:'center'
  }
});
