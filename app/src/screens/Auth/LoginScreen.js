import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ENDPOINTS } from "../../api/Endpoints";
import axios from "axios";
import { COLORS } from "../../theme"; // Importing your theme
import { Login } from "../../services/auth";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    // Basic Validation
    if (!email || !password) {
      alert("Please enter both email and password");
      return;
    }

    setLoading(true);

    try {
      const data = await Login(email, password);
      console.log("Login successful:", data);

      alert("Welcome back!");

      if (data.user.role === "instructor") {
        navigation.replace("InstructorPanel");
      } else if (data.user.role === "student") {
        navigation.replace("StudentPanel");
      } else if (data.user.role === "admin") {
        navigation.replace("AdminPanel");
      }

    } catch (error) {
      console.error("Login error:", error);
      const errorMessage =
        error.response?.data?.message ||
        "Invalid credentials. Please try again.";
      alert(errorMessage);
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
        <View style={styles.inner}>
          {/* Header Section */}
          <View style={styles.header}>
            <Text style={styles.title}>Welcome Back</Text>
            <Text style={styles.subtitle}>
              Log in to continue your learning
            </Text>
          </View>

          {/* Input Section */}
          <View style={styles.form}>
            <TextInput
              placeholder="Email Address"
              placeholderTextColor={COLORS.placeholder}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              editable={!loading}
            />

            <TextInput
              placeholder="Password"
              placeholderTextColor={COLORS.placeholder}
              secureTextEntry
              style={styles.input}
              value={password}
              onChangeText={setPassword}
              editable={!loading}
            />

            <TouchableOpacity style={styles.forgotContainer} disabled={loading}>
              <Text style={styles.forgotText}>Forgot Password?</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, loading && { opacity: 0.8 }]}
              onPress={handleLogin}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color={COLORS.surface} />
              ) : (
                <Text style={styles.buttonText}>Login</Text>
              )}
            </TouchableOpacity>
          </View>

          {/* Footer Section */}
          <TouchableOpacity
            style={styles.footer}
            onPress={() => navigation.navigate("Register")}
            disabled={loading}
          >
            <Text style={styles.footerText}>
              Don't have an account? <Text style={styles.link}>Register</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  inner: {
    padding: 24,
    flex: 1,
    justifyContent: "center",
  },
  header: {
    marginBottom: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: "800",
    color: COLORS.textPrimary,
    marginBottom: 8,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.textSecondary,
    textAlign: "center",
  },
  form: {
    width: "100%",
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
  forgotContainer: {
    alignItems: "flex-end",
    marginBottom: 24,
  },
  forgotText: {
    color: COLORS.primary,
    fontWeight: "600",
    fontSize: 14,
  },
  button: {
    backgroundColor: COLORS.primary,
    padding: 18,
    borderRadius: 12,
    alignItems: "center",
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
  footer: {
    marginTop: 30,
  },
  footerText: {
    textAlign: "center",
    color: COLORS.textSecondary,
    fontSize: 15,
  },
  link: {
    color: COLORS.secondary,
    fontWeight: "700",
  },
});
