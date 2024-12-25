import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  ScrollView,
} from 'react-native';
import color from '../constants/color';
import Slider from '@react-native-community/slider';

export default function FilterModal({ visible, onClose, onApply, onReset }) {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [rating, setRating] = useState(5);
  const [price, setPrice] = useState(100); // Single value for price
  const [distance, setDistance] = useState(50);

  const handleApply = () => {
    onApply({
      category: selectedCategory,
      rating,
      price,
      distance,
    });
    onClose(); // Close the modal
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <ScrollView>
            <Text style={styles.title}>Filter</Text>

            {/* Category Section */}
            {/* <Text style={styles.label}>Category</Text>
            <View style={styles.categories}>
              {['Hair Cut', 'Makeup', 'Spa', 'Nail'].map((cat) => (
                <TouchableOpacity
                  key={cat}
                  style={[
                    styles.categoryButton,
                    selectedCategory === cat && styles.selectedCategory,
                  ]}
                  onPress={() => setSelectedCategory(cat)}
                >
                  <Text
                    style={{
                      color: selectedCategory === cat ? 'white' : 'black',
                    }}
                  >
                    {cat}
                  </Text>
                </TouchableOpacity>
              ))}
            </View> */}

            {/* Rating Section */}
            <Text style={styles.label}>Rating</Text>
            <View style={styles.rating}>
              {[5, 4, 3, 2, 1].map((rate) => (
                <TouchableOpacity
                  key={rate}
                  style={[
                    styles.categoryButton,
                    rating === rate && styles.selectedCategory,
                  ]}
                  onPress={() => setRating(rate)}
                >
                  <Text
                    style={{ color: rating === rate ? 'black' : 'black' }}
                  >
                    {rate}⭐
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Price Slider */}
            <Text style={styles.label}>Price Range: Rs.200 - Rs.{price}</Text>
            <Slider
              value={price}
              onValueChange={(value) => setPrice(value)}
              maximumValue={10000}
              minimumValue={300}
              step={1}
              style={{ marginBottom: 20 }}
            />

            {/* Distance Slider */}
            <Text style={styles.label}>Distance: {distance}km</Text>
            <Slider
              value={distance}
              onValueChange={(value) => setDistance(value)}
              maximumValue={100}
              minimumValue={0}
              step={1}
            />
          </ScrollView>

          {/* Footer Buttons */}
          <View style={styles.footer}>
            <TouchableOpacity onPress={handleApply} style={styles.applyButton}>
              <Text style={{ color: 'white' }}>Apply</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onReset} style={styles.resetButton}>
              <Text>Reset</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    maxHeight: '90%',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: '600',
  },
  categories: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
  },
  categoryButton: {
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: color.background,
    margin: 5,
  },
  selectedCategory: {
    backgroundColor: color.background,
  },
  rating: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  ratingButton: {
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: color.foreground,
  },
  selectedRating: {
    backgroundColor: color.foreground,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  applyButton: {
    padding: 15,
    backgroundColor: color.background,
    borderRadius: 5,
  },
  resetButton: {
    padding: 15,
    backgroundColor: 'lightgray',
    borderRadius: 5,
  },
});
