import React, { Component } from 'react';
import {
  AppRegistry,
  FlatList,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  TouchableOpacity,
  Modal
} from 'react-native';
import { connect } from 'react-redux';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Entypo';
import { addCatalog } from '../redux/actions';
import _ from 'lodash';

export class ListOfCategories extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerLeft: (
        <Button
          onPress={() => navigation.navigate('DrawerOpen')}
          icon={
            <Icon
              name='menu'
              size={15}
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
  constructor(props) {
    super(props)
    console.log(props)
    this.state = {
      modalVisible: false,
    }
    this.renderItem = this.renderItem.bind(this)
  }
  fetchCatalog() {
    fetch('http://www.smartbirtija.com/api/menu')
      .then((response) => response.json())
      .then(responseJson => {
        this.props.addCatalog(responseJson);
      });
  }
  componentDidMount() {
    this.fetchCatalog();
  }
  pressed(prop) {
    console.log(this.props)
    this.props.navigation.navigate('Items', { name: prop })
  }
  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }
  renderItem = (item) => {
    console.log(item)
    return (
      <View style={{ marginHorizontal: 15, marginVertical: 5 }}>
        <TouchableOpacity onPress={this.pressed.bind(this, item)}>
          <Text style={styles.item}>{item}</Text>
        </TouchableOpacity>
      </View>
    );
  }
  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={_.keys(this.props.catalog)}
          renderItem={({ item }) => this.renderItem(item)}
        />
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
  addCatalog,
}

export default connect(mapStateToProps, mapDispatchToProps)(ListOfCategories)
