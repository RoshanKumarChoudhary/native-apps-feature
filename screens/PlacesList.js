import React, { useEffect, useLayoutEffect } from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import {
  HeaderButton,
  HeaderButtons,
  Item,
} from "react-navigation-header-buttons";
import { useDispatch, useSelector } from "react-redux";
import CustomHeaderButton from "../components/CustomHeaderButton";
import PlaceItem from "../components/PlaceItem";
import { loadPlaces } from "../redux/PlaceAction";

const PlacesList = ({ navigation }) => {
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    dispatch(loadPlaces())
    navigation.setOptions({
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
          <Item
            title="Add Place"
            iconName={Platform.OS === "android" ? "md-add" : "ios-add"}
            onPress={() => navigation.navigate("AddPlace")}
          />
        </HeaderButtons>
      ),
    });
  },[dispatch]);

  const placeData = useSelector(state => state.Place.places);
  
  return (
    <FlatList
      data={placeData}
      keyExtractor={(item) => item.id}
      renderItem={(itemData) => (
        <PlaceItem
          image={itemData.item.imageUri}
          address={itemData.item.address}
          title={itemData.item.value}
          onSelect={() =>
            navigation.navigate("PlaceDetails", {
              title: itemData.item.value,
              id: itemData.item.id,
            })
          }
        />
      )}
    />
  );
};

export default PlacesList;

const styles = StyleSheet.create({});
