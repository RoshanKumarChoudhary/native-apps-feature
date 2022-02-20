import React, { useCallback, useState } from 'react'
import { Button, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import { useDispatch } from 'react-redux';
import Color from '../Color/Color';
import ImgPicker from '../components/ImgPicker';
import LocationPicker from '../components/LocationPicker';
import { addPlace } from '../redux/PlaceAction';

const AddPlace = (props) => {
    const [title, setTitle] = useState("");
    const [imageTaken, setImageTaken] = useState();
    const [selectedLocation, setSelectedLocation] = useState();
    const onChangeHandler = (text) => {
        setTitle(text)
    }
    const imageTakenHandler = image => {
        setImageTaken(image);
    }
    const onLocationHandler = useCallback(location => {
        setSelectedLocation(location);
    },[])
    const dispatch = useDispatch();
    const onPresshandler = () => {
        dispatch(addPlace(title, imageTaken, selectedLocation));
        props.navigation.navigate("PlaceListed");
    }
    return (
        <ScrollView>
            <View style={styles.screen}>
                <Text style={styles.title}> Title </Text>
                <TextInput style={styles.textInput} onChangeText = {onChangeHandler} value = {title}/>
                <ImgPicker imageTaken={imageTakenHandler} />
                <LocationPicker navigation={props.navigation} route={props.route} onPickedLocation={onLocationHandler} />
                <Button color={Color.primaryColor} title="Add place" onPress={onPresshandler} />
            </View>
        </ScrollView>
    )
}

export default AddPlace

const styles = StyleSheet.create({
    screen: {
        margin: 30
    },
    title: {
        fontSize: 18,
        marginVertical: 10,
        textAlign: "center",
        fontWeight: 'bold'
    },
    textInput: {
        borderBottomColor: "#ccc",
        borderBottomWidth: 1,
        paddingVertical:4,
        marginBottom: 10
    }

})
