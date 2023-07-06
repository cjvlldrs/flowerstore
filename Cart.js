import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect, useContext } from "react";
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
function Cart(props) {
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [UserID, setUserID] = useState(props.UserID);
  const [CartModal, setCartModal] = useState(props.OpenCart);
  const [CartCount, setCartCount] = useState(0);
  const [CartSelected, setCartSelected] = useState([]);
  const [CartList, setCartList] = useState([]);

  backButton = () => {
    props.onBack();
  };

  useEffect(() => {
    fetchCart();
    console.log("hello");
  }, []);

  fetchCart = () => {
    console.log(
      JSON.stringify({
        UserID: UserID,
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
        UserID: UserID,
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        if (responseJson.status == true) {
          setCartModal(true);
          setCartList(responseJson.CartData);
          setCartCount(responseJson.CartCount);
          setCartModal(true);
          setCartSelected([]);
        } else {
          setCartList([]);
          setCartCount(0);
          setCartSelected([]);

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
      }
    });

    return selectedcart;
  };

  selected = (select) => {
    var selectedcart = [];
    select.map((val) => {
      if (val.isSelected == true) {
        selectedcart.push({
          CartID: val.CartID,
        });
      }
    });

    return selectedcart;
  };

  buyCart = () => {
    console.log(
      JSON.stringify({
        CartIDs: getCartID(CartList),
        UserID: UserID,
      })
    );

    return fetch("http://192.168.1.28/flowerstore/buyCart.php", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        CartIDs: getCartID(CartList),
        UserID: UserID,
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        if (responseJson.status == true) {
          setCartSelected([]);
          fetchCart();

          Alert.alert("Bought Successfully!", "Thank You for Buying!", [
            {
              text: "Ok",
              onPress: () => {
                fetchCart();
              },
            },
          ]);
        } else {
          Alert.alert("Error!", "No Item Selected!", [
            {
              text: "Ok",
            },
          ]);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

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
          <TouchableOpacity onPress={() => backButton()}>
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
          Items on the Cart: {CartCount}
        </Text>
      </View>
      <Button
        color="#2f2d6f"
        title="Buy"
        // onPress={() => console.log(this.state.CartSelected)}
        onPress={() => buyCart()}
        // disabled={}
      />
      <FlatList
        keyboardShouldPersistTaps={true}
        data={CartList}
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
              var CartLists = CartList;
              CartLists[index].isSelected = !CartLists[index].isSelected;
              setCartSelected(selected(CartLists));
            }}
          />
        )}
        keyExtractor={({ id }, index) => id}
      />
    </SafeAreaView>
  );
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
