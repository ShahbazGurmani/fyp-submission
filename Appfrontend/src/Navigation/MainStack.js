import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import navigationStrings from "../constants/navigationStrings";
import TabRoutes from "./TabRoutes";
import { Home, Notification, Shop, Categories, MyAccount, Reviews, Confirmation, SearchScreen, TermsOfService, Favourites } from "../Screens";

import { View, Text, Button, TouchableOpacity } from "react-native";
import color from "../constants/color";
import {
  AdjustmentsHorizontalIcon,
  StarIcon,
} from "react-native-heroicons/outline";
import StepperFormScreen from "../Screens/AppointmentModule/StepperFormScreen";

const Stack = createNativeStackNavigator();

export default function MainStack({allSalons,permissionStatus,setPermissionStatus,

  location,setLocation,address,setAddress,categories,onSignIn, setLogin,login
}) {
 
  return (
    <Stack.Navigator>
      
       
      <Stack.Screen  name={navigationStrings.TABROUTES} options={{ headerShown: false }}>

      {(props) => <TabRoutes {...props} allSalons={allSalons}  permissionStatus={permissionStatus}
       setPermissionStatus={setPermissionStatus}
          location={location} setLocation = {setLocation} address ={address} setAddress={setAddress} categories={categories}
          onSignIn={onSignIn} setLogin={setLogin} login={login}
          />}
        </Stack.Screen>

      


      <Stack.Screen
        name={navigationStrings.NOTIFICATION}
        component={Notification}
        options={{
          
          headerShadowVisible: false,

          headerStyle: {
            backgroundColor: color.background,
          },
          headerTintColor: color.foreground,
        }}
      />

      <Stack.Screen
        name={navigationStrings.SHOP}
        component={Shop}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={navigationStrings.CATEGORIES}
        component={Categories}
        // options={{
        //   title: "Search",
        //   headerShadowVisible: false,

        //   headerStyle: {
        //     backgroundColor: color.background,
        //   },
        //   headerTintColor: color.foreground,
        //   headerRight: () => (
        //     <TouchableOpacity>
        //       <AdjustmentsHorizontalIcon size={25} color={color.foreground} />
        //     </TouchableOpacity>
        //   ),
        // }}
        options={{ headerShown: false }}
      />
      {/* //profile Subscreens  */}
      <Stack.Screen
        name={navigationStrings.MYACCONT}
        component={MyAccount}
        options={{
          title: "My Account",
          headerShadowVisible: false,

          headerStyle: {
            backgroundColor: color.background,
          },
          headerTintColor: color.foreground,
        }}
      />

<Stack.Screen
        name={navigationStrings.TERMSOFSERVICES}
        component={TermsOfService}
        options={{
          title: "Terms And Services",
          headerShadowVisible: false,

          headerStyle: {
            backgroundColor: color.background,
          },
          headerTintColor: color.foreground,
        }}
      />
      <Stack.Screen
        name={navigationStrings.FAVOURITES}
        component={Favourites}
        options={{
          title: "Favourites",
          headerShadowVisible: false,

          headerStyle: {
            backgroundColor: color.background,
          },
          headerTintColor: color.foreground,
        }}
      />
       <Stack.Screen name={navigationStrings.STEPPERFORMSCREEN} component={StepperFormScreen}  options={{ headerShown: false }} />
       <Stack.Screen name={navigationStrings.REVIEWS} component={Reviews}  options={{ headerShown: false }} />
       <Stack.Screen name={navigationStrings.CONFIRMATION} component={Confirmation}  options={{ headerShown: false }} />
       <Stack.Screen name={navigationStrings.SEARCHSCREEN} component={SearchScreen}  options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}
