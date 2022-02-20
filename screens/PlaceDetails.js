import React, { useLayoutEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'

const PlaceDetails = ({navigation, route}) => {
    useLayoutEffect(() => {
        const title = route.params.title;
        navigation.setOptions({
            headerTitle: title
        })
    })
    return (
        <View>
            <Text>PlaceDetails</Text>
        </View>
    )
}

export default PlaceDetails

const styles = StyleSheet.create({})
