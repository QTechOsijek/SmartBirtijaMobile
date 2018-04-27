import { DrawerNavigator, StackNavigator } from 'react-navigation';
import { Stack } from './stack';
import Cart from '../screens/cart'

const CartS = StackNavigator({
  Cart: {
    navigationOptions: {
     title: 'Cart',
    },
    screen: Cart,
  }
})

const Drawer = DrawerNavigator({
  Menu: {
    screen: Stack,
  },
  Cart: {
    screen: CartS,
    navigationOptions: {
      drawerLabel: "Cart"
    }
  }
});



export default Drawer;
