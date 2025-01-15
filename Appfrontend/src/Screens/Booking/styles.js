// Import necessary components and styles
import { StyleSheet } from "react-native";
import color from "../../constants/color";
import {
  scale,
  verticalScale,
  moderateScale,
  moderateVerticalScale,
} from "react-native-size-matters";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { RFPercentage } from "react-native-responsive-fontsize";

// Define the styles using StyleSheet.create
const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
  },
  view1: {
    backgroundColor: color.background,
    borderBottomEndRadius: wp('20%'),
    padding:  wp('10%'),
  },
  textHeading: {

    paddingLeft: wp('5%'),
    color: "white",
    fontWeight: "bold",
    fontSize: RFPercentage(2.5),
  },
  textSubheading: {
    paddingTop: wp('2%'),
    paddingLeft: wp('5%'),
    color: "white",
    fontSize: RFPercentage(2),
  },
  tabContainer: {
    flexDirection: "row",
    paddingTop: hp('3%'),
    justifyContent: "space-around",
  },
  tabButton: {
    paddingVertical: hp('1.5%'),
    paddingHorizontal: wp('8%'),
    borderRadius: wp('2.5%'),
  },
  tabButtonText: {
    color: "white",
    fontSize: RFPercentage(2),
  },
  activeTabButton: {
    backgroundColor: "white",
  },
  activeTabButtonText: {
    color: color.background,
  },

  itemContainer: {
    flexDirection: "row",
    borderWidth: 0.75,
    borderRadius: wp('1%'),
    margin: wp('4%'),
    backgroundColor: "white",

  },

  imageContainer: {
    
    justifyContent: "center", // Center the image vertically
    alignItems: "center", // Center the image horizontally
    
  },

  image: {
    height: hp('15%'),
    width: wp('30%'),
    
  },

  itemTextName: {
    fontSize: RFPercentage(2),
    fontWeight: "bold",
    color: color.background,
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: hp('1%'),
    paddingTop: wp('2%'),
  },
  locationIcon: {
    marginRight: wp('2%'),
  },
  LocationitemText: {
    fontSize: RFPercentage(1.8),
    color: "grey",
  },

  itemTextAppointment: {
    paddingTop: moderateScale(2),
    fontSize: scale(12),
  },
  buttonView: {
    flex: 1,
    flexDirection: "row",
   
    paddingTop: wp('2%'),
    paddingBottom: wp('2%'),
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
    borderRadius: wp('2%'),
    borderWidth: wp('0.1%'),
    backgroundColor: "white",
    height: hp('5%'),
    width: wp('25%'),
    justifyContent: "center",
    alignItems: "center",
  },
  feedBackButton: {
    borderRadius:wp('2%'),
    borderWidth: wp('0.1%'),
    backgroundColor: "white",
    height: hp('5%'),
    width: wp('50%'),
    justifyContent: "center",
    alignItems: "center",
  },
  butttonSpace: {
    paddingLeft: moderateScale(10),
  },
  
});


// Export the styles object as default
export default styles;
