import React from 'react';
import Login from '../screens/Login';

import RegisterScreen from '../screens/RegisterScreen';
import Success from '../screens/Success';
import FirstInput from '../screens/FirstInput';
import HomeScreen from '../screens/HomeScreen';

import Tabs from './TabNavigation';

import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();
const RootNavigation = () => {
   return(
    <Stack.Navigator 
        screenOptions = {{header: ()=>null}}    
    >
        <Stack.Screen
            name="Login" 
            component={Login}
        />
        
        <Stack.Screen
            name="RegisterScreen"
            component={RegisterScreen}
        />
        <Stack.Screen
            name="Success"
            component={Success}
        />
        <Stack.Screen
            name="FirstInput"
            component={FirstInput}
        />

        <Stack.Screen
            name="HomeScreen"
            component={Tabs}
        />

    </Stack.Navigator>
   );
}

export default RootNavigation;