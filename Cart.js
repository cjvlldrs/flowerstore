import { StatusBar } from "expo-status-bar";
import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  Alert,
  KeyboardAvoidingView,
  SafeAreaView,
  Modal,
  TouchableOpacity,
  FlatList,
} from "react-native";
import CartData from "./CartData";

// export default function App() {
class Cart extends Component {
  constructor(props) {
    super(props);
    // Navigation.events().bindComponent(this);
  }

  state = {
    password: "",
    username: "",
    CartModal: this.props.OpenCart,
    CartCount: 0,
  };

  backButton = () => {
    this.props.onBack();
  };

  componentDidMount() {
    this.fetchCart();
    console.log("hello");
  }

  fetchCart = () => {
    console.log(
      JSON.stringify({
        UserID: this.props.UserID,
      })
    );
    // return;
    return fetch("http://192.168.1.28/flowerstore/fetchCart.php", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        UserID: this.props.UserID,
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        if (responseJson.status == true) {
          this.setState({
            CartList: responseJson.CartData,
            CartCount: responseJson.CartCount,
            CartModal: true,
          });
        } else {
          Alert.alert(null, responseJson.ErrorMessage);
          return;
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  getCartID = (select) => {
    var selectedcart = [];
    select.map((val) => {
      if (val.isSelected == true) {
        selectedcart.push(val.CartID);
        this.setState({ selectedcart });
      }
    });

    return selectedcart;
  };

  buyCart = () => {
    console.log(
      JSON.stringify({
        CartIDs: this.getCartID(this.state.CartList),
      })
    );
    return fetch("http://192.168.1.28/flowerstore/buyCart.php", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        CartIDs: this.getCartID(this.state.CartList),
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        if (responseJson.status == true) {
          // this.setState({
          //   CartModal: true,
          // });
          Alert.alert("Bought Successfully!", "Thank You for Buying!", [
            {
              text: "Ok",
              onPress: () => {
                this.backButton();
              },
            },
          ]);
        } else {
          Alert.alert(null, responseJson.ErrorMessage);
          return;
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    return (
      <SafeAreaView>
        <View
          style={{
            width: "100%",
            height: 50,
            backgroundColor: "#f79f8e",
            flexDirection: "row",
          }}
        >
          <View
            style={{
              width: "10%",
              justifyContent: "center",
              alignItems: "center",
              height: 50,
            }}
          >
            <TouchableOpacity onPress={() => this.backButton()}>
              {/* <Icon size={25} name={"exit-outline"} color="#FFFFFF" /> */}
              <Text
                style={{
                  color: "#2f2d6f",
                  fontWeight: "bold",
                  fontSize: 30,
                }}
              >
                {" <<"}
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              width: "80%",
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                color: "#2f2d6f",
                fontWeight: "bold",
                fontSize: 25,
                paddingLeft: 110,
              }}
            >
              MY CART
            </Text>
          </View>
        </View>

        <View style={{ alignItems: "center" }}>
          <Text
            style={{
              color: "#2f2d6f",
              fontWeight: "bold",
              fontSize: 20,
              paddingVertical: 20,
            }}
          >
            Items on the Cart: {this.state.CartCount}
          </Text>
        </View>
        <Button
          color="#2f2d6f"
          title="Buy"
          // onPress={() => console.log(this.state.CartSelected)}
          onPress={() => this.buyCart()}
          // disabled={!authenticated}
        />
        <FlatList
          keyboardShouldPersistTaps={true}
          data={this.state.CartList}
          style={{
            backgroundColor: "#f79f8e",
            paddingTop: 10,
            height: "100%",
            width: "100%",
          }}
          renderItem={({ item, index }) => (
            <CartData
              ProdName={item.ProductName}
              Price={item.Price}
              Stocks={item.Stocks}
              Photo={item.Photo}
              isSelected={item.isSelected}
              onPress={() => {
                var CartList = this.state.CartList;
                CartList[index].isSelected = !CartList[index].isSelected;
                this.setState({
                  CartSelected: CartList,
                });
              }}
            />
          )}
          keyExtractor={({ id }, index) => id}
        />
      </SafeAreaView>
    );
  }
}

export default Cart;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#fff',
    backgroundColor: "#f79f8e",
    //lightblue color: #9ea6d4
    //darkblue color: #2f2d6f
    alignItems: "center",
    // justifyContent: "center",
  },
  TextInput: {
    width: 300,
    height: 50,
    borderRadius: 5,
    backgroundColor: "#f0f0f0",
    textAlign: "left",
    fontSize: 15,
    paddingLeft: 20,
  },
});
