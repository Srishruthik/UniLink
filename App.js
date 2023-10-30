import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import SignIn from "./screens/signin";
import SignUp from "./screens/signup";
import Home from './screens/home';
import Inbox from './screens/inbox';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="SignIn" options={{ headerShown: false }} component={SignIn} />
        <Stack.Screen name="SignUp" options={{ headerShown: false }} component={SignUp} />
        <Stack.Screen name="Home" options={{ headerShown: false }} component={Home} />
        <Stack.Screen name="Inbox" options={{headerShown:false}} component={Inbox} />
          
       
      </Stack.Navigator>
    </NavigationContainer>
  );
}
