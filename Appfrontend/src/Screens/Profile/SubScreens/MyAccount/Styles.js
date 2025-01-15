// Import necessary components and styles
import { StyleSheet } from "react-native";
import color from "../../../../constants/color";
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
    paddingBottom: moderateVerticalScale(20),
  },
  profileImageContainer: {
    position: "absolute",
    top: moderateScale(50),
    left: moderateScale(100),
    alignItems: "center",
    zIndex: 1,
  },
  profileImageWrapper: {
    width: moderateScale(150),
    height: moderateScale(150),
    borderWidth: 4,
    borderColor: "white",
    borderRadius: 100,
    overflow: "hidden",
    backgroundColor: "white",
  },
  profileImage: {
    width: moderateScale(150),
    height: moderateScale(150),
    resizeMode: "cover",
  },
  cameraIcon: {
    top: moderateScale(-30),
  
    left: moderateScale(25),
    backgroundColor: color.background,
    borderRadius: 100,
    padding: 5,
    zIndex: 2,
  },
  additionalTextContainer: {
    marginTop: moderateScale(200),
    padding: scale(10),
    margin: scale(10),
  },
  additional2ndTextContainer: {
    marginTop: moderateScale(-20),
    padding: scale(10),
    margin: scale(10),
  },
  additional3rdTextContainer: {
    marginTop: moderateScale(-20),
    padding: scale(10),
    margin: scale(10),
  },

  additionalText: {
    fontSize: scale(12),
    fontWeight: "bold",
    color: "grey",
  },
  additionalTextSubContainer: {
    flexDirection: "column",
    borderWidth: 0.5,
    borderColor: "grey",
    borderRadius: 5,
    padding: scale(10),
    marginTop: scale(5),
  },
  additionalSubText: {
    fontSize: scale(12),
    fontWeight: "bold",
  },
  bigButton: {
    backgroundColor: color.background,
    borderRadius: scale(10),
    paddingVertical: scale(10),
    alignItems: "center",
    marginHorizontal: scale(15),
    marginTop: moderateScale(10),
  
  },
  bigButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: scale(15),
  },
});

// Export the styles object as default
export default styles;
