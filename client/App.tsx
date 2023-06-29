import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import globalStyles from './src/styles/globalStyles';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, Layout, Text} from '@ui-kitten/components';
import {default as theme} from './src/styles/custom-theme-2.json';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
    <ApplicationProvider {...eva} theme={{...eva.light, ...theme}}>
    <Layout style={[globalStyles.container]}>
      <Text>Open up App.tsx to start working on your app!</Text>
      <StatusBar style="auto" />
    </Layout>
    </ApplicationProvider>
    </Stack.Navigator>
    </NavigationContainer>
  );
}
