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
    paddingBottom: moderateVerticalScale(100),
  },
  textHeading: {
    paddingTop: moderateScale(30),
    paddingLeft: moderateScale(15),
    color: "white",
    fontWeight: "bold",
    fontSize: scale(15),
  },
  profileImageContainer: {
    position: "absolute",
    top: moderateScale(25),
    left: moderateScale(100),
    alignItems: "center",
    zIndex: 1,
  },
  profileImageWrapper: {
    width: moderateScale(150),
    height: moderateScale(150),
    borderWidth: 4,
    borderColor: "white",
    borderRadius: 100, // Half of width and height to make it circular
    overflow: "hidden", // Clip the image to the border radius
    backgroundColor: "white", // Background color to cover the safe area
  },
  profileImage: {
    width: moderateScale(150),
    height: moderateScale(150),
    resizeMode: "cover",
  },
  profileTextView: {
    alignItems: "center",
  },
  profileTextName: {
    fontSize: scale(13),
    fontWeight: "bold",
    textAlign: "center", // Align text centrally
  },
  profileTextEmail: {
    fontSize: scale(10),
    textAlign: "center", // Align text centrally
  },
  additionalTextContainer: {
    flexDirection: "column",
    marginTop: moderateScale(150),
    padding: scale(10),
    margin: scale(10),
    borderWidth: 0.3,
    borderColor: "grey",
    borderRadius: 5,
  },
  additionalText2ndContainer: {
    flexDirection: "column",
    marginTop: moderateScale(10),
    padding: scale(10),
    margin: scale(10),
    borderWidth: 0.3,
    borderColor: "grey",
    borderRadius: 5,
  },
  additionalTextView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  additionalButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: moderateScale(25),
  },
  additionalText: {
    fontSize: scale(12),
    marginRight: "auto", // Push the text to the end of the row
    fontWeight: "bold",
  },
  ProfileIcon: {
    marginRight: moderateScale(5),
    paddingRight: moderateScale(10),
    color: color.background,
  },
  ChatIcon: {
    marginRight: moderateScale(5),
    paddingRight: moderateScale(10),
    color: color.background,
  },
});

// Export the styles object as default
export default styles;
