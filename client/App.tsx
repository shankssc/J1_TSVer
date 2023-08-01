import { StatusBar } from 'expo-status-bar';
import { LogBox, AppRegistry } from 'react-native';
import globalStyles from './src/styles/globalStyles';
import * as eva from '@eva-design/eva';
import { ApolloProvider } from '@apollo/client';
import { ApplicationProvider, Layout, Text} from '@ui-kitten/components';
import {default as theme} from './src/styles/custom-theme-2.json';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Auth from './src/pages/Auth/Auth';
import client from './src/services/apollo-client';
import { Provider } from 'react-redux';
import store from './src/store';

const Stack = createNativeStackNavigator();

// Ignore specific UI Kitten warnings
LogBox.ignoreLogs(['@ui-kitten/components', '@eva-design/eva']);

// Ignore all React Native logs
LogBox.ignoreAllLogs();

export default function App() {
  return (
    <Provider store={store}>
    <ApolloProvider client={client}>
    <ApplicationProvider {...eva} theme={{ ...eva.light, ...theme }}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Auth">
          <Stack.Screen name="Auth" component={Auth} />
        </Stack.Navigator>
      </NavigationContainer>
    </ApplicationProvider>
    </ApolloProvider>
    </Provider>
  );
}

AppRegistry.registerComponent('MyApplication', () => App);
