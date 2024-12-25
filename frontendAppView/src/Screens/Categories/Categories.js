import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import SearchBar from '../../components/SearchBar';
import Cards from '../../components/Cards/Cards';
import { ArrowLeftIcon, AdjustmentsHorizontalIcon } from 'react-native-heroicons/outline';
import color from '../../constants/color';
import { useRoute } from '@react-navigation/native';
import FilterModal from '../../components/FilterModal';
import { moderateScale, moderateVerticalScale } from 'react-native-size-matters';

export default function Categories({ navigation }) {
  const {
    params: { category },
  } = useRoute();

  const [isFilterVisible, setFilterVisible] = useState(false);
  const [filteredData, setFilteredData] = useState(category.data);
   // Initialize with full data
    console.log(category.data);
  // Function to handle filter logic
  const applyFilters = (filters) => {
    console.log('Applied Filters:', filters);

    const filteredSalons = category.data.filter((salon) => {
      // Check if any service matches the price filter
      const matchesPrice = salon.services.some((service) =>
        service.options.some((option) => parseInt(option.price, 10) <= filters.price)
      );

      const matchesRating = salon.rating >= filters.rating;

      return matchesPrice && matchesRating;
    });

    // console.log('Filtered Salons:', filteredSalons.map((salon) => salon.name)); // Debugging output
     
    setFilteredData(filteredSalons);
    setFilterVisible(false); // Close the modal
  };

  // Function to reset filters
  const resetFilters = () => {
    setFilteredData(category.data); // Reset to original data
    setFilterVisible(false); // Close the modal
  };

  const handleBackPress = () => {
    navigation.navigate('TABROUTES');
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={handleBackPress}
          style={{
            backgroundColor: 'white',
            borderRadius: 100,
          }}
        >
          <ArrowLeftIcon size={30} color={color.background} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setFilterVisible(true)}>
          <AdjustmentsHorizontalIcon size={25} color={color.foreground} />
        </TouchableOpacity>
      </View>
      <View
        style={{
          justifyContent: 'center',
          backgroundColor: color.background,
          padding: moderateVerticalScale(12),
          borderBottomEndRadius: moderateScale(80),
        }}
      >
        <SearchBar placeholder={category.placeholder} />
      </View>
      {/* Pass the filtered or default data to Cards */}
      <Cards data={filteredData} />
      {/* Filter Modal */}
      <FilterModal
        visible={isFilterVisible}
        onClose={() => setFilterVisible(false)}
        onApply={applyFilters}
        onReset={resetFilters} // Add reset functionality
      />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: color.background,
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 40,
  },
});
