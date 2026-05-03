import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator, // 1. Import ActivityIndicator
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ENDPOINTS } from "../../api/Endpoints";
import axios from "axios";
import { COLORS } from "../../theme";

const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");
  const [loading, setLoading] = useState(false); // 2. Create loading state

  const handleRegister = async () => {
    if (!name || !email || !password) {
      alert("Please fill in all fields");
      return;
    }

    setLoading(true); // 3. Start loading

    try {
      const response = await axios.post(ENDPOINTS.REGISTER, {
        name,
        email,
        password,
        role,
      });
      console.log("Registration successful:", response.data);
      alert("Registration successful!");
      navigation.navigate("Login"); 
    } catch (error) {
      console.error("Registration error:", error);
      alert("An error occurred during registration. Please try again.");
    } finally {
      setLoading(false); 
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.inner}>
          <Text style={styles.title}>Create Account</Text>
          <Text style={styles.subtitle}>Start your learning journey today</Text>

          {/* TOGGLE UI */}
          <View style={styles.toggleContainer}>
            <TouchableOpacity
              style={[
                styles.toggleButton,
                role === "student" && styles.activeToggleButton,
              ]}
              onPress={() => setRole("student")}
              disabled={loading} // Disable during loading
            >
              <Text
                style={[
                  styles.toggleText,
                  role === "student" && styles.activeToggleText,
                ]}
              >
                Student
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.toggleButton,
                role === "instructor" && styles.activeToggleButton,
              ]}
              onPress={() => setRole("instructor")}
              disabled={loading} // Disable during loading
            >
              <Text
                style={[
                  styles.toggleText,
                  role === "instructor" && styles.activeToggleText,
                ]}
              >
                Instructor
              </Text>
            </TouchableOpacity>
          </View>

          {/* INPUT FIELDS */}
          <TextInput
            placeholder="Full Name"
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholderTextColor={COLORS.placeholder}
            editable={!loading} // Disable input while loading
          />

          <TextInput
            placeholder="Email Address"
            style={styles.input}
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
            placeholderTextColor={COLORS.placeholder}
            editable={!loading}
          />

          <TextInput
            placeholder="Password"
            style={styles.input}
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            placeholderTextColor={COLORS.placeholder}
            editable={!loading}
          />

          {/* PRIMARY BUTTON */}
          <TouchableOpacity 
            style={[styles.button, loading && { opacity: 0.7 }]} 
            onPress={handleRegister}
            disabled={loading} // Prevent multiple clicks
          >
            {loading ? (
              <ActivityIndicator color={COLORS.surface} />
            ) : (
              <Text style={styles.buttonText}>Register Now</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity 
             onPress={() => navigation.navigate("Login")}
             disabled={loading}
          >
            <Text style={styles.link}>
              Already have an account?{" "}
              <Text style={{ fontWeight: "700", color: COLORS.secondary }}>
                Login
              </Text>
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default RegisterScreen;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  inner: {
    padding: 24,
    flexGrow: 1,
    justifyContent: "center",
  },
  title: {
    fontSize: 32,
    fontWeight: "800",
    color: COLORS.textPrimary,
    marginBottom: 5,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.textSecondary,
    marginBottom: 30,
    textAlign: "center",
  },
  toggleContainer: {
    flexDirection: "row",
    backgroundColor: COLORS.toggleTrack,
    borderRadius: 14,
    padding: 5,
    marginBottom: 25,
  },
  toggleButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: "center",
    borderRadius: 10,
  },
  activeToggleButton: {
    backgroundColor: COLORS.surface,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  toggleText: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.textSecondary,
  },
  activeToggleText: {
    color: COLORS.primary,
  },
  input: {
    backgroundColor: COLORS.surface,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    fontSize: 16,
    color: COLORS.textPrimary,
  },
  button: {
    backgroundColor: COLORS.primary,
    padding: 18,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 10,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  buttonText: {
    color: COLORS.surface,
    fontWeight: "bold",
    fontSize: 18,
  },
  link: {
    marginTop: 25,
    textAlign: "center",
    color: COLORS.textSecondary,
    fontSize: 15,
  },
});
