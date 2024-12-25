// Import necessary components and styles
import { StyleSheet } from "react-native";
import color from "../../constants/color";
import {
  scale,
  verticalScale,
  moderateScale,
  moderateVerticalScale,
} from "react-native-size-matters";

// Define the styles using StyleSheet.create
const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
  },
  view1: {
    backgroundColor: color.background,
    borderBottomEndRadius: moderateScale(80),
    padding: moderateScale(28),
  },
  textHeading: {

    paddingLeft: moderateScale(20),
    color: "white",
    fontWeight: "bold",
    fontSize: scale(15),
  },
  textSubheading: {
    paddingTop: moderateScale(5),
    paddingLeft: moderateScale(20),
    color: "white",
    fontSize: scale(12),
  },
  tabContainer: {
    flexDirection: "row",
    paddingTop: scale(20),
    justifyContent: "space-around",
  },
  tabButton: {
    paddingVertical: verticalScale(10),
    paddingHorizontal: moderateScale(20),
    borderRadius: moderateScale(10),
  },
  tabButtonText: {
    color: "white",
    fontSize: scale(15),
  },
  activeTabButton: {
    backgroundColor: "white",
  },
  activeTabButtonText: {
    color: color.background,
  },

  itemContainer: {
    flexDirection: "row",
    borderWidth:.75,
    borderRadius: moderateScale(3),
    margin: moderateScale(15),
    backgroundColor: "white",

  },

  imageContainer: {
    
    justifyContent: "center", // Center the image vertically
    alignItems: "center", // Center the image horizontally
    
  },

  image: {
    height: moderateVerticalScale(120),
    width: moderateScale(120),
    
  },

  itemTextName: {
    fontSize: scale(13),
    fontWeight: "bold",
    color: color.background,
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: moderateVerticalScale(5),
    paddingTop: moderateScale(5),
  },
  locationIcon: {
    marginRight: moderateScale(5),
  },
  LocationitemText: {
    fontSize: scale(12),
    color: "grey",
  },

  itemTextAppointment: {
    paddingTop: moderateScale(2),
    fontSize: scale(12),
  },
  buttonView: {
    flex: 1,
    flexDirection: "row",
   
    paddingTop: moderateScale(10),
    paddingBottom: moderateScale(10),
  },
  buttonTextD: {
    fontSize: scale(10),
    color: color.background,
    fontWeight: "bold",
  },
  buttonTextC: {
    fontSize: scale(10),
    fontWeight: "bold",
  },

  button: {
    borderRadius: moderateScale(5),
    borderWidth: moderateScale(0.3),
    backgroundColor: "white",
    height: moderateScale(40), // Adjust button height as needed
    width: moderateScale(100),
    justifyContent: "center",
    alignItems: "center",
  },
  feedBackButton: {
    borderRadius: moderateScale(5),
    borderWidth: moderateScale(0.3),
    backgroundColor: "white",
    height: moderateScale(40), // Adjust button height as needed
    width: moderateScale(180),
    justifyContent: "center",
    alignItems: "center",
  },
  butttonSpace: {
    paddingLeft: moderateScale(10),
  },
  
});


// Export the styles object as default
export default styles;
