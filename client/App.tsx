import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import globalStyles from './src/styles/globalStyles';

export default function App() {
  return (
    <View style={[globalStyles.colorPrimary2, globalStyles.container]}>
      <Text>Open up App.tsx to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}
