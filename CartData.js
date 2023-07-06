import React, { useState, useEffect, useContext } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";

function CartData(props) {
  return (
    <TouchableOpacity
      onPress={() => {
        props.onPress();
      }}
      style={{ width: "100%" }}
    >
      <View
        style={{
          justifyContent: "center",
          padding: 10,
          margin: 5,
          marginHorizontal: 10,
          borderRadius: 20,
          backgroundColor: "white",
          flexDirection: "row",
          borderWidth: 3,
          borderColor: props.isSelected ? "#0081FF" : "white",
        }}
      >
        <View
          style={{
            marginLeft: -80,
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: 70,
            width: 70,
            borderRadius: 9999,
            borderWidth: 3,
            borderColor: "#9ea6d4",
            backgroundColor: "#9ea6d4",
          }}
        >
          <Image
            source={{
              // uri: "http://192.168.1.28/flowerstore/uploads/sunflower.jpeg",
              uri: props.Photo,
            }}
            style={{
              overflow: "hidden",
              width: "100%",
              height: "100%",
              borderRadius: 9999,
              borderColor: "#9ea6d4",
            }}
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            width: 140,
            alignItems: "center",
          }}
        >
          <View style={{ width: 20, marginTop: 20 }}></View>
          <View
            style={{
              flexDirection: "column",
              width: 140,
            }}
          >
            <View style={[{ alignSelf: "flex-start" }]}>
              <Text
                style={{
                  color: "black",
                  fontWeight: "bold",
                  fontSize: 18,
                  marginTop: -5,
                }}
              >
                {props.ProdName}
              </Text>
            </View>
            <View style={{ alignSelf: "flex-start", flexDirection: "row" }}>
              <Text
                style={{
                  color: "black",
                  fontWeight: "bold",
                  fontSize: 15,
                }}
              >
                {"Price: "}
              </Text>
              <Text
                style={{
                  color: "black",
                  fontWeight: "normal",
                  fontSize: 15,
                }}
              >
                ${props.Price}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default CartData;
