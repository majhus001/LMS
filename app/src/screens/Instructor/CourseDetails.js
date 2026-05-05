import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../../theme";
import { SafeAreaView } from "react-native-safe-area-context";

const CourseDetails = ({ route, navigation }) => {
  const { course } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={COLORS.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Course Details</Text>
        <TouchableOpacity>
          <Ionicons name="share-outline" size={24} color={COLORS.textPrimary} />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <Image source={{ uri: course.image }} style={styles.bannerImage} />

        <View style={styles.contentSection}>
          <Text style={styles.title}>{course.title}</Text>

          {/* Quick Stats Badges */}
          <View style={styles.statsRow}>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>⭐ {course.rating}</Text>
            </View>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>
                👥 {course.students} Students
              </Text>
            </View>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>⏱️ {course.duration}</Text>
            </View>
          </View>

          {/* ADD QUIZ ACTION BUTTON */}
          <TouchableOpacity
            style={styles.addQuizBtn}
            activeOpacity={0.8}
            onPress={() =>
              navigation.navigate("CreateQuiz", {
                courseId: course.id,
                courseTitle: course.title,
              })
            }
          >
            <View style={styles.quizIconBg}>
              <Ionicons name="help-circle" size={22} color={COLORS.secondary} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.addQuizTitle}>Course Assessment</Text>
              <Text style={styles.addQuizSub}>
                Create a new quiz for this course
              </Text>
            </View>
            <Ionicons
              name="chevron-forward"
              size={20}
              color={COLORS.textSecondary}
            />
          </TouchableOpacity>

          {/* Course Description */}
          <Text style={styles.sectionHeading}>About this course</Text>
          <Text style={styles.description}>{course.description}</Text>

          {/* Curriculum List */}
          <View style={styles.rowBetween}>
            <Text style={styles.sectionHeading}>Curriculum</Text>
            <Text style={styles.lessonCount}>{course.lessons} Lessons</Text>
          </View>

          {course.curriculum.map((lesson, index) => (
            <View key={lesson.id} style={styles.lessonItem}>
              <View style={styles.lessonNumber}>
                <Text style={styles.lessonNumberText}>{index + 1}</Text>
              </View>
              <View style={styles.lessonInfo}>
                <Text style={styles.lessonTitle}>{lesson.title}</Text>
                <Text style={styles.lessonDuration}>{lesson.duration}</Text>
              </View>
              <Ionicons name="play-circle" size={24} color={COLORS.primary} />
            </View>
          ))}
        </View>

        {/* Bottom Padding for ScrollView */}
        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Footer / Call to Action */}
      <View style={styles.footer}>
        <View>
          <Text style={styles.priceLabel}>Total Price</Text>
          <Text style={styles.priceValue}>{course.price}</Text>
        </View>
        <TouchableOpacity style={styles.manageBtn}>
          <Text style={styles.manageBtnText}>Manage Course</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: COLORS.textPrimary,
  },
  bannerImage: {
    width: "100%",
    height: 220,
  },
  contentSection: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "800",
    color: COLORS.textPrimary,
    marginBottom: 15,
  },
  statsRow: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 25,
  },
  badge: {
    backgroundColor: COLORS.toggleTrack,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  badgeText: {
    fontSize: 12,
    color: COLORS.textSecondary,
    fontWeight: "600",
  },

  // NEW: Add Quiz Button Styles
  addQuizBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.surface,
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 25,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  quizIconBg: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: COLORS.secondary + "15",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  addQuizTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: COLORS.textPrimary,
  },
  addQuizSub: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginTop: 2,
  },

  sectionHeading: {
    fontSize: 18,
    fontWeight: "700",
    color: COLORS.textPrimary,
    marginTop: 10,
    marginBottom: 10,
  },
  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 5,
  },
  lessonCount: {
    fontSize: 13,
    color: COLORS.primary,
    fontWeight: "600",
  },
  description: {
    fontSize: 14,
    color: COLORS.textSecondary,
    lineHeight: 22,
    marginBottom: 10,
  },
  lessonItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.surface,
    padding: 15,
    borderRadius: 15,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  lessonNumber: {
    width: 32,
    height: 32,
    borderRadius: 10,
    backgroundColor: COLORS.primary + "15",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  lessonNumberText: {
    color: COLORS.primary,
    fontWeight: "700",
    fontSize: 14,
  },
  lessonInfo: {
    flex: 1,
  },
  lessonTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.textPrimary,
  },
  lessonDuration: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    backgroundColor: COLORS.surface,
    borderTopWidth: 1,
    borderColor: COLORS.border,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  priceLabel: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },
  priceValue: {
    fontSize: 20,
    fontWeight: "800",
    color: COLORS.primary,
  },
  manageBtn: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 25,
    paddingVertical: 14,
    borderRadius: 14,
  },
  manageBtnText: {
    color: COLORS.surface,
    fontWeight: "700",
    fontSize: 15,
  },
});

export default CourseDetails;
