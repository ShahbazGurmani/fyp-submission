// Import necessary components and styles
import { StyleSheet } from "react-native";
import color from "../../constants/color";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { RFValue } from "react-native-responsive-fontsize";

// Define the styles using StyleSheet.create
const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
  },
  view1: {
    backgroundColor: color.background,
    paddingBottom: wp(10),
    padding: wp(3),
  },
  textHeading: {
    paddingTop: wp(7),
    paddingLeft: wp(3),
    color: "white",
    fontWeight: "bold",
    fontSize: RFValue(16),
  },
  profileImageContainer: {
    position: "absolute",
    top: hp(5), // Replacing moderateScale(25)
    left: wp(25), // Replacing moderateScale(100)
    alignItems: "center",
    zIndex: 1,
  },
  profileImageWrapper: {
    width: wp(40), // Replacing moderateScale(150)
    height: wp(40), // Keeping it square
    borderWidth: wp(1), // Adjusted to scale with screen size
    borderColor: "white",
    borderRadius: wp(20), // Half of width and height to make it circular
    overflow: "hidden", // Clip the image to the border radius
    backgroundColor: "white", // Background color to cover the safe area
  },
  profileImage: {
    width: wp(40), // Replacing moderateScale(150)
    height: wp(40), // Keeping it square
    resizeMode: "cover",
  },
  profileTextView: {
    alignItems: "center",
    marginTop:hp(13),
    margin:wp(5)
  },
  profileTextName: {
    fontSize: RFValue(16), // Replacing scale(13)
    fontWeight: "bold",
    textAlign: "center", // Align text centrally
  },
  profileTextEmail: {
    fontSize: RFValue(12), // Replacing scale(10)
    textAlign: "center", // Align text centrally
  },
  additionalTextContainer: {
    flexDirection: "column",
    marginTop: hp(18), // Replacing moderateScale(150)
    padding: wp(3), // Replacing scale(10)
    margin: wp(3), // Replacing scale(10)
    borderWidth: 0.3,
    borderColor: "grey",
    borderRadius: wp(1.5), // Adjusted to be responsive
  },
  additionalText2ndContainer: {
    flexDirection: "column",
    marginTop: hp(1.5), // Replacing moderateScale(10)
    padding: wp(3), // Replacing scale(10)
    margin: wp(3), // Replacing scale(10)
    borderWidth: 0.3,
    borderColor: "grey",
    borderRadius: wp(1.5), // Adjusted to be responsive
  },
  additionalTextView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  additionalButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: hp(3), // Replacing moderateScale(25)
  },
  additionalText: {
    fontSize: RFValue(12), // Replacing scale(12)
    marginRight: "auto", // Push the text to the end of the row
    fontWeight: "bold",
  },
  ProfileIcon: {
    marginRight: wp(2), // Replacing moderateScale(5)
    paddingRight: wp(3), // Replacing moderateScale(10)
    color: color.background,
  },
  ChatIcon: {
    marginRight: wp(2), // Replacing moderateScale(5)
    paddingRight: wp(3), // Replacing moderateScale(10)
    color: color.background,
  },
});

// Export the styles object as default
export default styles;
