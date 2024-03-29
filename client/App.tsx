import { StatusBar } from 'expo-status-bar';
import { LogBox, AppRegistry } from 'react-native';
import globalStyles from './src/styles/globalStyles';
import * as eva from '@eva-design/eva';
import { ApolloProvider } from '@apollo/client';
import { ApplicationProvider, Layout, Text} from '@ui-kitten/components';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Auth from './src/pages/Auth/Auth';
import Home from './src/pages/Home/Home';
import client from './src/services/apollo-client';
import { Provider } from 'react-redux';
import store from './src/store';
import appThemeCoolors from './src/styles/ThemePalette6'; 

const Stack = createNativeStackNavigator();

// Ignore specific UI Kitten warnings
LogBox.ignoreLogs(['@ui-kitten/components', '@eva-design/eva']);

// Ignore all React Native logs
LogBox.ignoreAllLogs();

export default function App() {
  return (
    <Provider store={store}>
    <ApolloProvider client={client}>
    <ApplicationProvider {...eva} theme={appThemeCoolors}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Auth" component={Auth} />
          <Stack.Screen name="Home" component={Home} />
        </Stack.Navigator>
      </NavigationContainer>
    </ApplicationProvider>
    </ApolloProvider>
    </Provider>
  );
}

AppRegistry.registerComponent('MyApplication', () => App);
