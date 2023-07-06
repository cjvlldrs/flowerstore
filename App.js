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
// import FontAwesome from "@expo/vector-icons/FontAwesome";
import Cart from "./Cart";
import ProductData from "./ProductData";
import Ionicons from "react-native-vector-icons/Ionicons";

// export default function App() {
function App() {
  const [password, setpassword] = useState("");
  const [username, setusername] = useState("");
  const [HomeModal, setHomeModal] = useState(false);
  const [CartModal, setCartModal] = useState(false);
  const [Name, setName] = useState("");
  const [ProductList, setProductList] = useState([]);
  const [ProductSelected, setProductSelected] = useState([]);
  const [UserID, setUserID] = useState(0);

  useEffect(() => {
    console.log("hello");
  }, []);

  fetchProducts = () => {
    console.log(
      JSON.stringify({
        UserName: username,
        Password: password,
      })
    );
    return fetch("http://192.168.1.28/flowerstore/fetchProducts.php", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        UserName: username,
        Password: password,
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        if (responseJson.status == true) {
          setProductList(responseJson.Products);
          setHomeModal(true);
        } else {
          Alert.alert(null, responseJson.ErrorMessage);
          return;
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  login = () => {
    console.log(
      JSON.stringify({
        UserName: username,
        Password: password,
      })
    );

    if (username.trim() == "") {
      Alert.alert(null, "Please enter your Username.");
      this.userTextInput.focus();
      return;
    }

    if (password == "") {
      Alert.alert(null, "Please enter your Password.");
      this.passTextInput.focus();
      return;
    }
    // return;

    return fetch("http://192.168.1.28/flowerstore/auth_login.php", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        UserName: username,
        Password: password,
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        if (responseJson.status == true) {
          setUserID(responseJson.UserID);
          setName(responseJson.Name);
          setHomeModal(true), fetchProducts();
        } else {
          Alert.alert(null, responseJson.ErrorMessage);
          return;
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  getProdID = (select) => {
    var selectedprod = [];
    select.map((val) => {
      selectedprod.push(val.ProductID);
    });

    return selectedprod;
  };

  addToCart = () => {
    console.log(
      JSON.stringify({
        ProductIDs: getProdID(ProductSelected),
        UserID: UserID,
      })
    );
    // return;
    return fetch("http://192.168.1.28/flowerstore/addToCart.php", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ProductIDs: getProdID(ProductSelected),
        UserID: UserID,
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        if (responseJson.status == true) {
          setCartModal(true);
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

  logout = () => {
    Alert.alert("Log Out", "Are you sure you want to Log out?", [
      {
        text: "Yes",
        onPress: () => {
          setHomeModal(false);
          setusername("");
          setpassword("");
          setName("");
          this.userTextInput.focus();
        },
      },
      {
        text: "No",
        onPress: () => {
          return false;
        },
      },
    ]);
  };

  selected = (select) => {
    var selectedprod = [];
    select.map((val) => {
      if (val.isSelected == true) {
        selectedprod.push({
          ProductID: val.ProductID,
        });
      }
    });

    return selectedprod;
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }}>
      <Modal
        animationType="slide"
        transparent={false}
        visible={HomeModal}
        onRequestClose={() => setHomeModal(false)}
      >
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
              <TouchableOpacity onPress={() => logout()}>
                {/* <Ionicons size={25} name={"exit-outline"} color="#FFFFFF" /> */}
                {/* <FontAwesome name="facebook" size={24} color="black" /> */}
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
                  paddingLeft: 60,
                }}
              >
                SAMPLESTORE.PH
              </Text>
            </View>
            <View
              style={{
                width: "10%",
                justifyContent: "center",
                alignItems: "center",
                height: 50,
              }}
            >
              <TouchableOpacity onPress={() => setCartModal(true)}>
                {/* <Icon size={25} name={"exit-outline"} color="#FFFFFF" /> */}
                <Text
                  style={{
                    color: "#2f2d6f",
                    fontWeight: "bold",
                    fontSize: 30,
                  }}
                >
                  {">> "}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={{ paddingTop: 10, backgroundColor: "#9ea6d4" }}>
            <Text
              style={{
                color: "black",
                fontWeight: "bold",
                fontSize: 20,
                alignSelf: "center",
                paddingBottom: 10,
              }}
            >
              Good Day, {Name}
            </Text>
            <View style={{ backgroundColor: "white" }}>
              <View style={{ flexDirection: "row" }}>
                <Text
                  style={{
                    color: "#2f2d6f",
                    fontWeight: "bold",
                    fontSize: 20,
                    paddingLeft: 20,
                    paddingVertical: 20,
                  }}
                >
                  Flowers
                </Text>
                {/* <Text
                    style={{
                      color: "#2f2d6f",
                      fontWeight: "bold",
                      fontSize: 15,
                      paddingLeft: 90,
                      marginTop: 5,
                      paddingVertical: 20,
                    }}
                  >
                    Remaining Balance: ${this.state.Balance}
                  </Text> */}
              </View>
              <Button
                color="#2f2d6f"
                title="Add to Cart"
                // onPress={() => console.log(this.state.ProductSelected)}
                onPress={() => addToCart()}
                // disabled={!authenticated}
              />
            </View>
            <FlatList
              keyboardShouldPersistTaps={true}
              data={ProductList}
              style={{
                backgroundColor: "#f79f8e",
                paddingTop: 10,
                height: "100%",
                width: "100%",
              }}
              renderItem={({ item, index }) => (
                <ProductData
                  ProdName={item.ProdName}
                  Price={item.Price}
                  Stocks={item.Stocks}
                  Photo={item.Photo}
                  isSelected={item.isSelected}
                  onPress={() => {
                    var ProductLists = ProductList;
                    ProductLists[index].isSelected =
                      !ProductLists[index].isSelected;

                    setProductSelected(selected(ProductLists));
                  }}
                />
              )}
              keyExtractor={({ id }, index) => id}
            />
          </View>
        </SafeAreaView>
      </Modal>

      {/* /////////Cart */}
      <Modal
        animationType="slide"
        transparent={false}
        visible={CartModal}
        onRequestClose={() => setCartModal(false)}
      >
        <Cart
          UserID={UserID}
          onBack={() => {
            setCartModal(false);
            setProductSelected([]);
            fetchProducts();
          }}
        />
      </Modal>

      <View style={styles.container}>
        <View style={{ paddingTop: 130 }}>
          <Text
            style={{
              color: "#2f2d6f",
              fontWeight: "bold",
              fontSize: 25,
              paddingLeft: 40,
            }}
          >
            SAMPLESTORE.PH
          </Text>
          <Text
            style={{
              color: "#2f2d6f",
              fontWeight: "bold",
              fontSize: 20,
              paddingVertical: 10,
              paddingTop: 50,
            }}
          >
            Username
          </Text>
          <TextInput
            value={username}
            style={styles.TextInput}
            onChangeText={(text) => setusername(text)}
            placeholder={"Username"}
            autoCapitalize={"none"}
            autoCorrect={false}
            ref={(input) => {
              this.userTextInput = input;
            }}
            // onPress={() => addToCart(product.id)}
            // disabled={!authenticated}
          />
          <Text
            style={{
              color: "#2f2d6f",
              fontWeight: "bold",
              fontSize: 20,
              paddingTop: 20,
              paddingVertical: 10,
            }}
          >
            Password
          </Text>
          <TextInput
            value={password}
            style={styles.TextInput}
            onChangeText={(text) => setpassword(text)}
            placeholder={"Password"}
            autoCapitalize={"none"}
            autoCorrect={false}
            secureTextEntry={true}
            ref={(input) => {
              this.passTextInput = input;
            }}
          />
          <View style={{ height: 50 }} />
          <Button
            color="#2f2d6f"
            title="LOG IN"
            onPress={() => login()}
            // disabled={!authenticated}
          />
        </View>
        <StatusBar style="auto" />
      </View>
    </KeyboardAvoidingView>
  );
}

export default App;

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
