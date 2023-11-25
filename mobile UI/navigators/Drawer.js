import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../components/Home';
import Notification from '../components/Notification';
import Settings from '../components/Settings';
const Drawer = createBottomTabNavigator();

function DrawerNavigator() {
  return (
    <Drawer.Navigator
      useLegacyImplementation
      screenOptions={{
        headerShown: false, // Hide the header for all screens by default
      }}>
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="Settings" component={Settings} />
      <Drawer.Screen name="Notification" component={Notification} />
    </Drawer.Navigator>
  );
}

export default DrawerNavigator;
