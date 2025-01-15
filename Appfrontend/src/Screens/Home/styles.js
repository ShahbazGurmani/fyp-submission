import { StyleSheet,Dimensions} from 'react-native'

import {
  scale,
  verticalScale,
  moderateScale,
  moderateVerticalScale,
} from "react-native-size-matters";
import color from '../../constants/color';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize
} from "react-native-responsive-dimensions";
const deviceheight = Dimensions.get('window').height
const deviceWidth = Dimensions.get('window').width
 const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: color.background,
    padding: moderateScale(38),
    borderBottomEndRadius: moderateScale(80),
  },
  headerContent: { flexDirection: 'column' },
  userText: { fontSize: 16, fontWeight: 'bold', color: 'white' },
  banner: {  height: 150, resizeMode: 'cover', marginVertical: 15, width: Dimensions.get('window').width, },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
    paddingHorizontal: 20,
  },
  categoriesContainer: { flexDirection: 'row', justifyContent: 'space-around' },
  categoryButton: { alignItems: 'center', margin: 10 },
  categoryImage: { width: 60, height: 60, marginBottom: 5 },
  categoryText: { textAlign: 'center', fontSize: 14 },
  listContainer: { paddingHorizontal: 16, padding: 10 },
  card: {
   
    borderRadius: 10,
    marginRight: 5,
    width:'100%',
    width: 200, 
    height: 220, 
    elevation: 2,
    backgroundColor: 'white',
    
  },
  image: { width: '100%', height: 120 },
  favoriteIcon: { position: 'absolute', top: 10, right: 10 },
  cardContent: { padding: 10 },
  categories: { fontSize: 12, color: '#888', marginBottom: 4 },
  salonName: { fontSize: 16, fontWeight: 'bold', color: '#333', marginBottom: 4 },
  ratingContainer: { flexDirection: 'row', alignItems: 'center' },
  rating: { marginLeft: 4, fontSize: 14, color: '#333' },
  reviews: { marginLeft: 4, fontSize: 14, color: '#888' },
  bannerContainer:{marginVertical: 10,}
});

  export default styles;