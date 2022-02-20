import React, { useLayoutEffect, useState } from 'react'
import { Platform, StyleSheet, Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import MapView, { Marker } from 'react-native-maps'
import Color from '../Color/Color';

const MapDetails = ({navigation}) => {
    const [selectedLocation, setSelectedLocation] = useState();
    let markerCoordinates;
    const mapRegion = {
        latitude: 37.78,
        longitude: -122.43,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
    }
    const selectPlaceHandler= event => {
        setSelectedLocation({
            latt: event.nativeEvent.coordinate.latitude,
            long: event.nativeEvent.coordinate.longitude
        })
    }
    if(selectedLocation){
        markerCoordinates = {
            latitude: selectedLocation.latt,
            longitude: selectedLocation.long
        }
    }
    const savePickedlocationhandler = () => {
        if(!selectedLocation){
            return;
        }
        navigation.navigate('AddPlace',{
            pickedLocation: selectedLocation
        })
    }
    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (<TouchableOpacity onPress={savePickedlocationhandler}><Text style={styles.saveBtn}>Save</Text></TouchableOpacity>)
        })
    })
    return (
        <MapView style={styles.map} navigation = {navigation} region={mapRegion} onPress={selectPlaceHandler}> 
           {markerCoordinates && <Marker title="Picked Location" coordinate={markerCoordinates} />}
        </MapView>
    )
}

export default MapDetails

const styles = StyleSheet.create({
    map: {
        flex: 1
    },
    saveBtn: {
        fontSize: 16,
        color: Platform.OS === 'android'? 'white' : Color.primaryColor
    }
})
