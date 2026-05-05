import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LoginScreen from "../screens/Auth/LoginScreen";
import RegisterScreen from "../screens/Auth/RegisterScreen";
import InstructorPanel from "../screens/Instructor/InstructorPanel";
import CreateCourse from "../screens/Instructor/CreateCourse";
import CourseDetails from "../screens/Instructor/CourseDetails";
import CreateQuiz from "../screens/Instructor/CreateQuiz";
import InstructorProfile from "../screens/Instructor/InstructorProfile";

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="InstructorPanel" component={InstructorPanel} />
        <Stack.Screen name="CreateCourse" component={CreateCourse} />
        <Stack.Screen name="CourseDetails" component={CourseDetails} />
        <Stack.Screen name="CreateQuiz" component={CreateQuiz} />
        <Stack.Screen name="InstructorProfile" component={InstructorProfile} />

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;