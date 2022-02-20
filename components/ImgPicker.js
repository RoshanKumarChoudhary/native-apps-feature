import React, { useState } from 'react'
import { Alert, Button, Image, StyleSheet, Text, View } from 'react-native'
import Color from '../Color/Color'
import * as ImagePicker from 'expo-image-picker'
import * as Permission from 'expo-permissions'

const ImgPicker = props => {
    const [pickedImage, setPickedImage] = useState();
    const verifyPermission = async () => {
        const result = await Permission.askAsync(Permission.CAMERA, Permission.CAMERA_ROLL);
        if(result.status != "granted"){
            Alert.alert("Insufficient Permission", "you need camera permission to use this", [{text: "Okay"}]);
            return false;
        }
        return true;
    }
    const takePhotoHandler = async () => {
        const hasPermission = await verifyPermission();
        if(!hasPermission) return;
        const image = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [16, 9],
            quality: 0.5
        });
        setPickedImage(image);
        props.imageTaken(image.uri);
    }
    return (
        <View style={styles.imagePicker}>
        <View style={styles.imagePreview}>
        {!pickedImage ? 
            <Text>No image Selected</Text> :
            <Image style={styles.image} source={{uri: pickedImage.uri}} />
        }
        </View>
            <Button title="Take Photo" color={Color.primaryColor} onPress={takePhotoHandler} />
        </View>
    )
}

export default ImgPicker

const styles = StyleSheet.create({
    imagePicker:{
        alignItems: 'center',
        marginBottom: 10
    },
    imagePreview: {
        width: '100%',
        height: 200,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 10
    },
    image: {
        width: '100%',
        height: '100%'
    }
})
