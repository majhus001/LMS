import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const InstructorPanel = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Instructor Dashboard</Text>

      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate("MyCourses")}
      >
        <Text>My Courses</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate("CreateCourse")}
      >
        <Text>Create New Course</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate("QuizManagement")}
      >
        <Text>Create Quiz</Text>
      </TouchableOpacity>
    </View>
  );
};

export default InstructorPanel;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 30,
  },
  card: {
    padding: 20,
    backgroundColor: "#fff",
    marginBottom: 20,
    borderRadius: 10,
  },
});