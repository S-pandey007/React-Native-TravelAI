import 'react-native-gesture-handler';
import Home from "./src/index";
import Detail from "./src/Detail";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
// import { StyleSheet } from 'react-native';



const stack = createStackNavigator();


export default function App() {
  return (
    <NavigationContainer>
      <stack.Navigator 
        screenOptions={{
          headerShown:false
        }}
      >
        <stack.Screen name="Home" component={Home} />
        <stack.Screen name="Detail" component={Detail} />
      </stack.Navigator>
    </NavigationContainer>
  );
}

