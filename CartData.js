import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";

class ProductData extends Component {
  render() {
    return (
      <TouchableOpacity
        onPress={() => {
          this.props.onPress();
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
            borderColor: this.props.isSelected ? "#0081FF" : "white",
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
                uri: this.props.Photo,
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
                  {this.props.ProdName}
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
                  ${this.props.Price}
                </Text>
              </View>
            </View>
          </View>
          {/*  {this.props.isSelected ? (
            <View
              style={{
                alignSelf: "center",
                flexDirection: "column",
                height: Sizing.x40,
                width: Sizing.x40,
                justifyContent: "center",
                backgroundColor: Colors.secondaryColor,
                borderRadius: borderRadius.max,
                alignItems: "center",
              }}
            >
              <Icon2
                size={Sizing.x20}
                name="check"
                color={Colors.neutral.white}
              />
            </View>
          ) : (
            <View />
          )} */}
        </View>
      </TouchableOpacity>
    );
  }
}

export default ProductData;
