import React, { Component } from 'react';
import {
  AppRegistry,
  FlatList,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableHighlight,
  Modal,
  Button,
  Alert
} from 'react-native';
import { connect } from 'react-redux';
import { addItem } from '../redux/actions';
import _ from 'lodash';

export class ListOfItems extends Component {
  constructor(props){
    super(props)
    console.log(props)
    this.state = {
      modalVisible: false,
      item: '',
      quantity: 1,
      disabled: true,
    }
    this.renderItem = this.renderItem.bind(this);
    this.increase = this.increase.bind(this);
    this.decrease = this.decrease.bind(this);
    this.addToCart = this.addToCart.bind(this);
  }
  pressed(prop){
    console.log(prop)
    console.log(this.props)
    this.setState({
      item: prop,
    })
    this.setModalVisible(true)
  }
  addToCart(){
    this.props.addItem(this.state.item, this.state.quantity)
    this.setModalVisible(false)
  }
  setModalVisible(visible){
    this.setState({modalVisible: visible})
  }
  increase(){
    this.setState({
      quantity: this.state.quantity + 1,
      disabled: false,
    })
  }
  decrease(){
    this.setState({
      quantity: this.state.quantity - 1
    })
    if(this.state.quantity == 2){
      this.setState({
        disabled: true,
      })
    }
  }
  renderItem = (item) => {
    console.log(item)
    console.log(this.props.catalog[this.props.navigation.state.params.name][item])
    return (
      <View style={{ justifyContent: 'space-between', flexDirection: 'row', paddingHorizontal: 15, marginVertical: 5 }}>
        <TouchableOpacity onPress={this.pressed.bind(this, item)}>
          <Text style={styles.item}>{item}</Text>
        </TouchableOpacity>
        <Text style={styles.item}>{this.props.catalog[this.props.navigation.state.params.name][item]}</Text>
      </View>
    );
  }
  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={_.keys(this.props.catalog[this.props.navigation.state.params.name])}
          renderItem={({item}) => this.renderItem(item)}
        />
        <Modal
        animationType="slide"
        transparent={false}
        visible={this.state.modalVisible}
        onRequestClose={() => {
          alert('Modal has been closed.');
        }}>
          <View style={{ marginTop: 25, marginBottom: 200, flex: 1, alignItems: 'center' }}>
            <View style={{ justifyContent: 'space-between', alignItems: 'center', flex: 1, width: 250 }}>
              <Text style={{ fontSize: 25 }}>{this.state.item}</Text>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: 100 }}>
                <Button title="-" onPress={this.decrease} disabled={this.state.disabled} color="red" />
                <Text style={{ fontSize: 21 }}>{this.state.quantity}</Text>
                <Button title="+" onPress={this.increase} />
              </View>
              <Button title="Add to your order" onPress={this.addToCart} />
              <TouchableHighlight
                onPress={() => {
                  this.setModalVisible(!this.state.modalVisible);
                }}>
                <Text>Exit</Text>
              </TouchableHighlight>
            </View>
          </View>
        </Modal>
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
    fontSize: 20,
    height: 44,
  },
})

const mapStateToProps = (state) => {
  return state
};

const mapDispatchToProps = {
  addItem,
}
export default connect(mapStateToProps, mapDispatchToProps)(ListOfItems)
