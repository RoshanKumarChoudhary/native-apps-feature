import React from 'react'
import { useEffect } from 'react'
import { ActivityIndicator, Button, StyleSheet, Text, View } from 'react-native'
import * as Location from 'expo-location';
import { useState } from 'react';
import Color from '../Color/Color';
import MapPreview from './MapPreview';

const LocationPicker = (props) => {
    let mapPickedLocation;
    const [isFetching, setIsFetching] = useState(false);
    const [location, setLocation] = useState(null);

    const pickLocationHnadler = () => {
        props.navigation.navigate('MapDetails');
    }
    if (props.route.params) {
        mapPickedLocation = props.route.params.pickedLocation;
    }
    const {onPickedLocation} = props;
    useEffect(() => {
        setLocation(mapPickedLocation);
        onPickedLocation(mapPickedLocation)
    }, [mapPickedLocation, onPickedLocation])

    const getLocation = async () => {
        setIsFetching(true);
        try {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert("Insufficient Permission", "you need location permission to use this", [{ text: "Okay" }]);
                return;
            }
            let currentLocation = await Location.getCurrentPositionAsync({ timeout: 5000 });
            setLocation({
                latt: currentLocation.coords.latitude,
                long: currentLocation.coords.longitude
            })
            props.onPickedLocation({
                latt: currentLocation.coords.latitude,
                long: currentLocation.coords.longitude
            });
        }
        catch (err) {
            Alert.alert("Fetch Location", "Location cannot be fetched. Pls try later.", [{ text: "Okay" }]);
        }
        setIsFetching(false);
    }
    return (
        <View style={styles.mapContainer}>
            <MapPreview style={styles.mapPreview} location={location} onPress={pickLocationHnadler}>
                {isFetching ? <ActivityIndicator size={23} color={Color.primaryColor} /> :
                    <Text>No map Selected !!</Text>}
            </MapPreview>
            <View style={styles.action}>
                <Button title="Get Location" color={Color.primaryColor} onPress={getLocation} />
                <Button title="Pick location on Map" color={Color.primaryColor} onPress={pickLocationHnadler} />
            </View>
        </View>
    )
}

export default LocationPicker

const styles = StyleSheet.create({
    mapContainer: {
        marginBottom: 15
    },
    mapPreview: {
        marginBottom: 10,
        borderColor: '#ccc',
        borderWidth: 1,
        width: '100%',
        height: 150
    },
    action: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%'
    }
})
