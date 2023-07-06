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
// import FontAwesome from "@expo/vector-icons/FontAwesome";
import Cart from "./Cart";
import ProductData from "./ProductData";
import Ionicons from "react-native-vector-icons/Ionicons";

// export default function App() {
class App extends Component {
  constructor(props) {
    super(props);
    // Navigation.events().bindComponent(this);
  }

  state = {
    password: "",
    username: "",
    HomeModal: false,
    CartModal: false,
    Name: "",
    ProductList: [],
    Balance: 0,
  };

  componentDidMount() {
    // this.fetchProducts();
    console.log("hello");
  }

  fetchProducts = () => {
    console.log(
      JSON.stringify({
        UserName: this.state.username,
        Password: this.state.password,
      })
    );
    return fetch("http://192.168.1.28/flowerstore/fetchProducts.php", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        UserName: this.state.username,
        Password: this.state.password,
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        if (responseJson.status == true) {
          this.setState({
            ProductList: responseJson.Products,
            HomeModal: true,
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

  login = () => {
    console.log(
      JSON.stringify({
        UserName: this.state.username,
        Password: this.state.password,
      })
    );

    if (this.state.username.trim() == "") {
      Alert.alert(null, "Please enter your Username.");
      this.userTextInput.focus();
      return;
    }

    if (this.state.password == "") {
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
        UserName: this.state.username,
        Password: this.state.password,
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        if (responseJson.status == true) {
          this.setState(
            {
              UserID: responseJson.UserID,
              Name: responseJson.Name,
              Balance: responseJson.Balance,
              HomeModal: true,
            },
            () => this.fetchProducts()
          );
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
      this.setState({ selectedprod });
    });

    return selectedprod;
  };

  addToCart = () => {
    console.log(
      JSON.stringify({
        ProductIDs: this.getProdID(this.state.ProductSelected),
        UserID: this.state.UserID,
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
        ProductIDs: this.getProdID(this.state.ProductSelected),
        UserID: this.state.UserID,
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        if (responseJson.status == true) {
          this.setState({
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

  logout = () => {
    Alert.alert("Log Out", "Are you sure you want to Log out?", [
      {
        text: "Yes",
        onPress: () => {
          this.setState({
            HomeModal: false,
            username: "",
            password: "",
            Name: "",
          });
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
        this.setState({ selectedprod });
      }
    });

    return selectedprod;
  };

  render() {
    return (
      <KeyboardAvoidingView style={{ flex: 1 }}>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.HomeModal}
          onRequestClose={() => this.setState({ HomeModal: false })}
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
                <TouchableOpacity onPress={() => this.logout()}>
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
                <TouchableOpacity
                  onPress={() =>
                    this.setState({ CartModal: true }, () =>
                      console.log(this.state.CartModal)
                    )
                  }
                >
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
                  color: "#2f2d6f",
                  fontWeight: "bold",
                  fontSize: 20,
                  alignSelf: "center",
                  paddingBottom: 10,
                }}
              >
                Good Day, {this.state.Name}
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
                  onPress={() => this.addToCart()}
                  // disabled={!authenticated}
                />
              </View>
              <FlatList
                keyboardShouldPersistTaps={true}
                data={this.state.ProductList}
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
                      var ProductList = this.state.ProductList;
                      ProductList[index].isSelected =
                        !ProductList[index].isSelected;
                      this.setState({
                        ProductSelected: this.selected(ProductList),
                      });
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
          visible={this.state.CartModal}
          onRequestClose={() => this.setState({ CartModal: false })}
        >
          <Cart
            Money={this.state.Balance}
            UserID={this.state.UserID}
            onBack={() =>
              this.setState(
                {
                  CartModal: false,
                },
                () => this.fetchProducts()
              )
            }
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
              value={this.state.username}
              style={styles.TextInput}
              onChangeText={(text) => this.setState({ username: text })}
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
              value={this.state.password}
              style={styles.TextInput}
              onChangeText={(text) => this.setState({ password: text })}
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
              // onPress={() => console.log(this.state.password)}
              onPress={() => this.login()}
              // disabled={!authenticated}
            />
          </View>
          <StatusBar style="auto" />
        </View>
      </KeyboardAvoidingView>
    );
  }
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
