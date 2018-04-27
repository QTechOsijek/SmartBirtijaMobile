import React, { Component } from 'react';
import {
  AppRegistry,
  FlatList,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Button as Butt,
  Alert,
  Dimensions
} from 'react-native';
import { connect } from 'react-redux';
import { Header } from 'react-navigation';
import _ from 'lodash';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Feather';
import { clearUp } from '../redux/actions'


export class Cart extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerLeft: (
        <Icon.Button
          onPress={() => navigation.navigate('DrawerOpen')}
          name='menu'
          color="black"
          iconStyle={{ marginLeft: 8 }}
          size={20}
          backgroundColor="#fff"
        />
      ),
    }
  };
  constructor(props) {
    super(props)
    console.log(props)
    console.log(Icon)
    this.renderItem = this.renderItem.bind(this);
    this.sendData = this.sendData.bind(this);
    this.calculatePrice = this.calculatePrice.bind(this);
  }
  calculatePrice() {
    const { cart, catalog } = this.props;
    const keys = _.keys(cart);
    const cat = _.keys(catalog);
    let price = 0;
    for (var i = 0; i < cat.length; i++) {
      for (var j = 0; j < keys.length; j++) {
        console.log(keys[j], cat[i]);
        price += (catalog[cat[i]][keys[j]] || 0) * (_.get(cart, keys[j]) || 0);
        console.log(price)
      }
    }
    return price;
  }
  sendData() {
    console.log(this.calculatePrice())
    fetch('http://www.smartbirtija.com/api/orders',
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          table: 1,
          items: this.props.cart,
          price: this.calculatePrice(),
        })
      })

      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson)
        this.props.clearUp()
        Alert.alert("Your order will be completed soon")
      })
      .catch((err) => console.err('E, jebiga ' + err));
  }
  pressed(prop) {
    console.log(this.props)
  }
  renderItem = (item) => {
    console.log(item)
    return (
      <View style={{ width: Dimensions.get("screen").width, alignItems: 'center', marginVertical: 5 }}>
        <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'space-between', width: Dimensions.get("screen").width * 0.9, marginBottom: 2 }}>
          <Text style={styles.item}>{item[0]}</Text>
          <Text style={[styles.item, { justifyContent: 'flex-end' }]}>{item[1]}</Text>
        </View>
        <View
          style={{
            borderBottomColor: 'black',
            borderBottomWidth: 1,
            width: Dimensions.get("screen").width
          }}
        />
      </View>
    );
  }
  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={_.toPairs(this.props.cart)}
          renderItem={({ item }) => this.renderItem(item)}
        />
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 35, marginBottom: 35, width: Dimensions.get("screen").width * 0.9 }}>
          <Text style={{ fontSize: 22 }}>Price: </Text>
          <Text style={{ fontSize: 22 }}>{this.calculatePrice()}</Text>
        </View>
        <TouchableOpacity onPress={this.sendData}>
          <View style={{ width: Dimensions.get("screen").width * 0.6, alignItems: 'center', backgroundColor: '#2196F3', marginBottom: 50, }}>
            <Text style={[styles.item, { color: '#fff' }]}>Order</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22,
    alignItems: 'center'
  },
  item: {
    padding: 10,
    fontSize: 20,
    fontWeight: "500",
    height: 44,
  },
})

const mapStateToProps = (state) => {
  console.log(state)
  return state
};

const mapDispatchToProps = {
  clearUp
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
