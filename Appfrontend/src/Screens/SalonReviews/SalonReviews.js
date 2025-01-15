import { View, Text, FlatList, StyleSheet } from 'react-native';
import React from 'react';

export default function SalonReviews({ shopData }) {
  const { reviews, rating } = shopData;

  // Function to render stars based on rating
  const renderStars = (rating) => {
    const roundedRating = Math.round(rating); // Round off decimals
    let stars = '';
    for (let i = 0; i < roundedRating; i++) {
      stars += '★';
    }
    return stars || 'No Stars';
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Salon Reviews</Text>
      <Text style={styles.overallRating}>
        {renderStars(rating)}
      </Text>

      {reviews.length > 0 ? (
        <FlatList
          data={reviews}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.reviewCard}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.stars}>{renderStars(item.rating)}</Text>
              <Text style={styles.comment}>{item.comment}</Text>
            </View>
          )}
        />
      ) : (
        <Text style={styles.noReviews}>No reviews available</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 10 },
  header: { fontSize: 20, fontWeight: 'bold', marginVertical: 10 },
  overallRating: { fontSize: 18, color: 'gold', marginBottom: 10 },
  reviewCard: { backgroundColor: '#f9f9f9', padding: 10, marginBottom: 10, borderRadius: 5 },
  name: { fontWeight: 'bold', fontSize: 16 },
  stars: { color: 'gold', fontSize: 18, marginTop: 5 },
  comment: { fontSize: 14, marginTop: 5 },
  noReviews: { fontSize: 14, color: 'gray', fontStyle: 'italic' },
});
