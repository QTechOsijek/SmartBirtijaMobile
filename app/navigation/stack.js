import { StackNavigator } from 'react-navigation';
import ListOfCategories from '../screens/listOfCategories';
import ListOfItems from '../screens/listOfItems'

export const Stack = StackNavigator({
  Menu: {
    screen: ListOfCategories,
    navigationOptions: {
     title: 'Menu',
   },
  },
  Items: {
    screen: ListOfItems,
    navigationOptions: ({ navigation }) => ({
      title: `${navigation.state.params.name}`,
    }),
  }
},
{
  initialRouteName: 'Menu'
})
