import  TopTab from "./TopTab";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import navigationStrings from "../constants/navigationStrings";
import { Booking, Home, NearBy, Profile } from  '../Screens'; 
import { Image} from "react-native";
import imagePath from "../constants/imagePath";
import color from "../constants/color";

const Tab = createBottomTabNavigator();
export default function TabRoutes({allSalons,permissionStatus,setPermissionStatus,

  location,setLocation,address,setAddress,categories,onSignIn, setLogin,login
}) {
  
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: color.textColor,
        tabBarInactiveTintColor: "grey",
      }}
    >
      
     
      <Tab.Screen name={navigationStrings.HOME}
      options={{
        tabBarIcon: ({ focused }) => {
          return (
            <Image
              style={{ tintColor: focused ? color.textColor : "grey" }}
              source={imagePath.home}
            />
          );
        },
      }}
      >
          {(props) => <Home {...props} allSalons={allSalons} categories={categories}
          
          permissionStatus={permissionStatus} setPermissionStatus={setPermissionStatus}
          location={location} setLocation = {setLocation} address ={address} setAddress={setAddress}
          />}
        </Tab.Screen>
        <Tab.Screen name={navigationStrings.NEARBY}
      options={{
        tabBarIcon: ({ focused }) => {
          return (
            <Image
              style={{ tintColor: focused ? color.textColor : "grey" }}
              source={imagePath.nearby}
            />
          );
        },
      }}
      >
          {(props) => <NearBy {...props} allSalons={allSalons} permissionStatus={permissionStatus} setPermissionStatus={setPermissionStatus}
           location={location} setLocation = {setLocation} address = {address} setAddress={setAddress}
           />}
        </Tab.Screen>
      
     
      <Tab.Screen
        name={navigationStrings.BOOKING}
        options={{
          tabBarIcon: ({ focused }) => {
            return <Image 
            style={{ tintColor: focused ? color.textColor : "grey" }}
            source={imagePath.booking} />;
          },
        }}
        component={Booking}
      />
      <Tab.Screen
        name={navigationStrings.PROFILE}
        
        options={{
         
          
          tabBarIcon: ({ focused }) => {
            return <Image 
            style={{ tintColor: focused ? color.textColor : "grey" }}
            source={imagePath.profile} />;  
          
          },
        }}
      
        
      >
          {(props) => <Profile {...props}  onSignIn={onSignIn} setLogin={setLogin} login={login}
          />}
        

      </Tab.Screen>
    </Tab.Navigator>
  );
}
