import React from 'react'
import { Platform, StyleSheet, Text, View } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import PlacesList from '../screens/PlacesList';
import AddPlace from '../screens/AddPlace';
import PlaceDetails from '../screens/PlaceDetails';
import MapDetails from '../screens/MapDetails';
import Color from '../Color/Color';
import { NavigationContainer } from '@react-navigation/native';

const Stack = createNativeStackNavigator();

const NativeNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{
                headerStyle: {
                    backgroundColor: Platform.OS === "android" ? Color.primaryColor : "white"
                },
                headerTintColor: Platform.OS === "android" ? "white" : Color.primaryColor
            }}>
                <Stack.Screen name="PlaceListed" component={PlacesList} />
                <Stack.Screen name="AddPlace" component={AddPlace} />
                <Stack.Screen name="PlaceDetails" component={PlaceDetails} />
                <Stack.Screen name="MapDetails" component={MapDetails} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default NativeNavigator

const styles = StyleSheet.create({})
