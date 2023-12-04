import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import Home from '../components/Home';
import Notification from '../components/Notification';

const Drawer = createBottomTabNavigator();

function DrawerNavigator() {
  return (
    <Drawer.Navigator
      useLegacyImplementation
      screenOptions={{
        headerShown: false, // Hide the header for all screens by default
      }}>
      <Drawer.Screen name="Home" component={Home} options={{
        tabBarIcon: ({ color, size }) => (
          <Icon name="home" color={color} size={25} />
        ),
      }} />
      <Drawer.Screen name="Notification" component={Notification} options={{
        tabBarIcon: ({ color, size }) => (
          <Icon name="bell" color={color} size={20} />
        ),
      }} />
    </Drawer.Navigator>
  );
}

export default DrawerNavigator;
