import React, { Component } from 'react';
import {
  AppRegistry,
  FlatList,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Button as Butt
} from 'react-native';
import { connect } from 'react-redux';
import { Header } from 'react-navigation';
import _ from 'lodash';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Entypo';


export class Cart extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerLeft: (
        <Button
          onPress={() => navigation.navigate('DrawerOpen')}
          icon={
            <Icon
              name='menu'
              size={25}
              color="#000"
            />
          }
          iconLeft
          color="white"
          buttonStyle={{
            backgroundColor: "#fff"
          }}
        />
      ),
    }
  };
  constructor(props){
    super(props)
    console.log(props)
    this.renderItem = this.renderItem.bind(this);
    this.sendData = this.sendData.bind(this);
    this.calculatePrice = this.calculatePrice.bind(this);
  }
  calculatePrice(){
    const { cart, catalog } = this.props;
    const keys = _.keys(cart);
    const cat = _.keys(catalog);
    let price = 0;
    for(var i = 0; i < cat.length; i++){
      for(var j = 0; j < keys.length; j++){
        console.log(keys[j], cat[i]);
        price += (catalog[cat[i]][keys[j]] || 0) * (_.get(cart, keys[j]) || 0);
        console.log(price)
      }
    }
    return price;
  }
  sendData(){
    console.log(this.calculatePrice())
    fetch('http://192.168.102.45:3001/api/orders',
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
    })
    .catch((err) => console.err('E, jebiga ' + err));
  }
  pressed(prop){
    console.log(this.props)
  }
  renderItem = (item) => {
    console.log(item)
    return (
      <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'space-between'}}>
        <Text style={styles.item}>{item[0]}</Text>
        <Text style={[styles.item, { justifyContent: 'flex-end'}]}>{item[1]}</Text>
      </View>
    );
  }
  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={_.toPairs(this.props.cart)}
          renderItem={({item}) => this.renderItem(item)}
        />
        <Butt onPress={this.sendData} title="Order" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
   flex: 1,
   paddingTop: 22
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
})

const mapStateToProps = (state) => {
  console.log(state)
  return state
};

export default connect(mapStateToProps)(Cart)
