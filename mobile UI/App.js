import { Text, SafeAreaView, StyleSheet } from 'react-native';

// You can import supported modules from npm
import { Card } from 'react-native-paper';
import DrawerNavigator from './navigators/Drawer'
import { NavigationContainer } from '@react-navigation/native';

// or any files within the Snack
import Home from './components/Home';

export default function App() {
  return (
    <NavigationContainer>
      <DrawerNavigator />
    </NavigationContainer>
  );
}
