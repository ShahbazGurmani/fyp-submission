import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React from "react";
import color from "../../constants/color";
import {
  moderateScale,
  moderateVerticalScale,
  scale,
} from "react-native-size-matters";

export default function Services({ services, selected, onSelect }) {

  


  
const toggleOption = (serviceType, optionName, optionPrice,optionStylist) => {
  const option = { name: optionName, price: optionPrice,optionStylist };
  const isSelected = 
  selected[serviceType] && selected[serviceType].name === optionName && selected[serviceType].price === optionPrice;

  if (isSelected) {
    onSelect(serviceType, null);  
  } else {
    onSelect(serviceType, option);  
  }
};


  const isSelected = (serviceType, optionName, optionPrice) => {
    return (
      selected[serviceType] &&
      selected[serviceType].name === optionName &&
      selected[serviceType].price === optionPrice
    );
  };

  return (
    <ScrollView style={{ marginTop: moderateScale(10) }}>
      {services.map((service, i) => (
        <View key={i}>
          <Text
            style={{
              textAlign: "center",
              backgroundColor: color.background,
              fontSize: scale(18),
              color: "white",
              padding: moderateVerticalScale(2),
            }}
          >
            {service.type}
          </Text>
          <View
            style={{
              marginTop: moderateVerticalScale(10),
              marginBottom: moderateVerticalScale(10),
            }}
          >
            {service.options.map((option, j) => (
              <View
                key={j}
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  margin: moderateScale(8),
                }}
              >
                <View style={{ width: "50%" }}>
                  <Text>{option.name}</Text>
                </View>
                <View style={{ width: "40%" }}>
                  <Text> Rs. {option.price}</Text>
                </View>
                <View style={{ width: "10%" }}>
                  <TouchableOpacity
                    onPress={() =>
                      toggleOption(service.type, option.name, option.price,option.stylists)
                    }
                  >
                    <View
                      style={{
                        width: 30,
                        height: 30,
                        borderColor: color.background,
                        borderWidth: 2,
                        borderRadius: 20,
                      }}
                    >
                      {isSelected(service.type, option.name, option.price) ? (
                        <View
                          style={{
                            backgroundColor: color.background,
                            width: 22,
                            height: 22,
                            borderRadius: 20,
                            margin: 2,
                          }}
                        ></View>
                      ) : null}
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        </View>
      ))}
    </ScrollView>
  );
}
