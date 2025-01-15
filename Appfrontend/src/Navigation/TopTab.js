import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import navigationStrings from '../constants/navigationStrings';
import  Services  from '../Screens/Services/Services';
import  Information  from '../Screens/Information/Information';
import  Reviews  from '../Screens/Reviews/Reviews';
import { NavigationContainer } from '@react-navigation/native';
import color from "../constants/color";
import { Image} from "react-native";
import imagePath from "../constants/imagePath";
import SalonReviews from '../Screens/SalonReviews/SalonReviews';


const topTab = createMaterialTopTabNavigator();

export default function TopTab({services, onSelect,selected,shopData}) {

 
   
  return (
   

    
    <topTab.Navigator
    screenOptions={{
       
        
        headerShown: false,
        tabBarActiveTintColor: color.background,
        tabBarInactiveTintColor: "grey",
        tabBarIndicatorStyle: {
            backgroundColor: color.background,
            height: 3
          },
         
        
      }}
    
    >
     
     <topTab.Screen
        name={navigationStrings.SERVICES}
        children={() => (
          <Services services={services} selected={selected} onSelect={onSelect} />
        )}
      />

<topTab.Screen
        name={navigationStrings.INFORMATION}
        children={() => (
          <Information shopData={shopData} />
        )}
      />
      <topTab.Screen
        name={navigationStrings.SALONREVIEWS}
        children={() => (
          <SalonReviews shopData={shopData} />
        )}
      />
     
    </topTab.Navigator>

  
   
  );
}