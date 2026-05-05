import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../../theme";
import axios from "axios";
import { ENDPOINTS } from "../../api/Endpoints";
import { getToken } from "../../utils/storage";

const CreateQuiz = ({ route, navigation }) => {
  const { courseId, courseTitle } = route.params;

  const [loading, setLoading] = useState(false);
  const [quizTitle, setQuizTitle] = useState("");
  const [totalMarks, setTotalMarks] = useState("10"); // Default marks
  const [questions, setQuestions] = useState([
    { question: "", options: ["", "", "", ""], correctIndex: 0 },
  ]);

  const addQuestion = () => {
    setQuestions([
      ...questions,
      { question: "", options: ["", "", "", ""], correctIndex: 0 },
    ]);
  };

  const updateQuestionText = (text, qIndex) => {
    const newQuestions = [...questions];
    newQuestions[qIndex].question = text;
    setQuestions(newQuestions);
  };

  const updateOptionText = (text, qIndex, oIndex) => {
    const newQuestions = [...questions];
    newQuestions[qIndex].options[oIndex] = text;
    setQuestions(newQuestions);
  };

  const setCorrectOption = (qIndex, oIndex) => {
    const newQuestions = [...questions];
    newQuestions[qIndex].correctIndex = oIndex;
    setQuestions(newQuestions);
  };

  const handleSaveQuiz = async () => {
    // 1. Validation
    if (!quizTitle) return Alert.alert("Error", "Please enter a quiz title.");

    const isValid = questions.every(
      (q) => q.question && q.options.every((o) => o.trim() !== ""),
    );
    if (!isValid)
      return Alert.alert("Error", "Please fill in all questions and options.");

    setLoading(true);

    try {
      const token = await getToken();

      // 2. Transform data to match Backend Request Structure
      const formattedQuestions = questions.map((q) => ({
        question: q.question,
        options: q.options,
        // Send the actual text of the correct option as 'correctAnswer'
        correctAnswer: q.options[q.correctIndex],
      }));

      const requestBody = {
        courseId: courseId,
        title: quizTitle,
        questions: formattedQuestions,
        totalMarks: parseInt(totalMarks) || 0,
      };

      console.log("quiz ", requestBody)

      // 3. API Call
      const response = await axios.post(ENDPOINTS.CREATE_QUIZ, requestBody, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data) {
        Alert.alert("Success", "Quiz created successfully!");
        navigation.goBack();
      }
    } catch (error) {
      console.error("Quiz Error:", error.response?.data || error.message);
      Alert.alert("Error", "Failed to save quiz. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          disabled={loading}
        >
          <Ionicons name="close" size={28} color={COLORS.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>New Quiz</Text>
        <TouchableOpacity onPress={handleSaveQuiz} disabled={loading}>
          {loading ? (
            <ActivityIndicator size="small" color={COLORS.primary} />
          ) : (
            <Text style={styles.saveText}>Save</Text>
          )}
        </TouchableOpacity>
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <Text style={styles.courseLabel}>Course: {courseTitle}</Text>

          <TextInput
            style={styles.mainInput}
            placeholder="Quiz Title (e.g. Final Assessment)"
            placeholderTextColor={COLORS.textSecondary}
            value={quizTitle}
            onChangeText={setQuizTitle}
          />

          <View style={styles.marksContainer}>
            <Text style={styles.label}>Total Marks:</Text>
            <TextInput
              style={styles.marksInput}
              keyboardType="numeric"
              value={totalMarks}
              onChangeText={setTotalMarks}
            />
          </View>

          {questions.map((q, qIndex) => (
            <View key={qIndex} style={styles.questionCard}>
              <View style={styles.cardHeader}>
                <Text style={styles.questionNumber}>Question {qIndex + 1}</Text>
                {questions.length > 1 && (
                  <TouchableOpacity
                    onPress={() =>
                      setQuestions(questions.filter((_, i) => i !== qIndex))
                    }
                  >
                    <Ionicons name="trash-outline" size={20} color="red" />
                  </TouchableOpacity>
                )}
              </View>

              <TextInput
                style={styles.input}
                placeholder="Enter your question here"
                value={q.question}
                onChangeText={(text) => updateQuestionText(text, qIndex)}
                multiline
              />

              <Text style={styles.label}>Options (Select the correct one)</Text>
              {q.options.map((opt, oIndex) => (
                <View key={oIndex} style={styles.optionRow}>
                  <TouchableOpacity
                    style={[
                      styles.radio,
                      q.correctIndex === oIndex && styles.radioActive,
                    ]}
                    onPress={() => setCorrectOption(qIndex, oIndex)}
                  >
                    {q.correctIndex === oIndex && (
                      <View style={styles.radioInner} />
                    )}
                  </TouchableOpacity>
                  <TextInput
                    style={styles.optionInput}
                    placeholder={`Option ${oIndex + 1}`}
                    value={opt}
                    onChangeText={(text) =>
                      updateOptionText(text, qIndex, oIndex)
                    }
                  />
                </View>
              ))}
            </View>
          ))}

          <TouchableOpacity
            style={styles.addBtn}
            onPress={addQuestion}
            disabled={loading}
          >
            <Ionicons name="add-circle" size={24} color={COLORS.primary} />
            <Text style={styles.addBtnText}>Add Another Question</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    borderBottomWidth: 1,
    borderColor: COLORS.border,
  },
  headerTitle: { fontSize: 18, fontWeight: "700", color: COLORS.textPrimary },
  saveText: { color: COLORS.primary, fontWeight: "800", fontSize: 16 },
  scrollContent: { padding: 20, paddingBottom: 40 },
  courseLabel: { fontSize: 12, color: COLORS.textSecondary, marginBottom: 5 },
  mainInput: {
    fontSize: 22,
    fontWeight: "700",
    color: COLORS.textPrimary,
    marginBottom: 10,
    paddingVertical: 10,
  },
  marksContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    gap: 10,
  },
  marksInput: {
    borderBottomWidth: 1,
    borderColor: COLORS.border,
    color: COLORS.textPrimary,
    width: 50,
    textAlign: "center",
    fontWeight: "700",
  },
  questionCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 15,
    padding: 15,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  questionNumber: { fontWeight: "700", color: COLORS.primary },
  input: {
    backgroundColor: COLORS.background,
    borderRadius: 8,
    padding: 12,
    color: COLORS.textPrimary,
    marginBottom: 15,
  },
  label: {
    fontSize: 13,
    color: COLORS.textSecondary,
    marginBottom: 10,
    fontWeight: "600",
  },
  optionRow: { flexDirection: "row", alignItems: "center", marginBottom: 10 },
  radio: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: COLORS.primary,
    marginRight: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  radioActive: { borderColor: COLORS.primary },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: COLORS.primary,
  },
  optionInput: {
    flex: 1,
    backgroundColor: COLORS.background,
    borderRadius: 8,
    padding: 10,
    color: COLORS.textPrimary,
    fontSize: 14,
  },
  addBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
    gap: 10,
  },
  addBtnText: { color: COLORS.primary, fontWeight: "700", fontSize: 16 },
});

export default CreateQuiz;
