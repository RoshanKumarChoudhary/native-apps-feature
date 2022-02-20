import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import ENV from '../Env'

const MapPreview = (props) => {
    let imagePreviewUrl;
    if (props.location) {
        imagePreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${props.location.latt},${props.location.long}&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7Clabel:A%7C${props.location.latt},${props.location.long}&key=${ENV.googleMapApiKey}`;
    }
    return (
        <TouchableOpacity style={{ ...styles.mapPreview, ...props.style }} onPress={props.onPress}>
            {imagePreviewUrl ? <Image style={styles.image} source={{ uri: imagePreviewUrl }} /> : props.children}
        </TouchableOpacity>
    )
}

export default MapPreview

const styles = StyleSheet.create({
    mapPreview: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
        width: '100%',
        height: '100%'
    }
})
