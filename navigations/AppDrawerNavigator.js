import { createDrawerNavigator } from '@react-navigation/drawer';
import Settings from '../components/AppDrawer';

const Drawer = createDrawerNavigator();

export default function AppDrawerNavigator() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Settings" component={Settings} />
    </Drawer.Navigator>
  );
}