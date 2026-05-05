import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../../theme";
import { getUser } from "../../utils/storage";
import TabComponent from "../../components/TabComponent";
import { ENDPOINTS } from "../../api/Endpoints";
import axios from "axios";

const InstructorPanel = ({ navigation }) => {
  const [user, setUser] = useState(null);
  const [courses, setCourses] = useState([]); // Initialize as empty array
  const [loading, setLoading] = useState(true);

  // Helper to get stats based on fetched courses
  const stats = [
    { id: "1", title: "Courses", value: courses.length, icon: "book-outline" },
    { id: "2", title: "Students", value: "120", icon: "people-outline" },
    { id: "3", title: "Revenue", value: "₹850", icon: "cash-outline" },
  ];

  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = async () => {
    try {
      setLoading(true);
      const userData = await getUser();
      setUser(userData);

      const response = await axios.get(ENDPOINTS.GET_COURSES);

      const formattedCourses = response.data.map((item, index) => {
        // Create a dummy curriculum for each course
        const dummyCurriculum = [
          { id: "L1", title: "Introduction to the Course", duration: "05:20" },
          { id: "L2", title: "Understanding the Basics", duration: "12:45" },
          { id: "L3", title: "Advanced Techniques & Tools", duration: "25:10" },
          {
            id: "L4",
            title: "Practical Project Walkthrough",
            duration: "45:00",
          },
          { id: "L5", title: "Summary and Next Steps", duration: "08:15" },
        ];

        return {
          id: item._id,
          title: item.title,
          description:
            item.description || "No description provided for this course.",
          price: item.price ? `$${item.price}` : "Free",

          // --- ADDED DUMMY DATA ---
          students: Math.floor(Math.random() * 500) + 10, // Random students between 10-510
          rating: (Math.random() * (5.0 - 3.8) + 3.8).toFixed(1), // Random rating between 3.8 and 5.0
          progress: Math.floor(Math.random() * 100),
          duration: "4h 35m",
          lessons: dummyCurriculum.length,
          curriculum: dummyCurriculum,

          // Use backend image if exists, otherwise cycle through a few high-quality placeholders
          image: item.image || `https://picsum.photos/seed/${item._id}/400/300`,
        };
      });

      setCourses(formattedCourses);
    } catch (error) {
      console.log("Error loading dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />

      {/* --- FIXED TOP SECTION --- */}
      <View style={styles.fixedHeaderContainer}>
        <View style={styles.headerContent}>
          <View>
            <Text style={styles.welcomeText}>
              Hello, {user?.name || "Instructor"} 👋
            </Text>
            <Text style={styles.subtitle}>Dashboard Overview</Text>
          </View>
          <TouchableOpacity style={styles.profileBtn}>
            <Ionicons
              name="notifications-outline"
              size={24}
              color={COLORS.textPrimary}
            />
            <View style={styles.notificationDot} />
          </TouchableOpacity>
        </View>

        <View style={styles.overviewRow}>
          {stats.map((item) => (
            <View key={item.id} style={styles.statsCard}>
              <View style={styles.statsIconBg}>
                <Ionicons name={item.icon} size={18} color={COLORS.primary} />
              </View>
              <Text style={styles.statsValue}>{item.value}</Text>
              <Text style={styles.statsTitle}>{item.title}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* --- SCROLLABLE CONTENT --- */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollPadding}
      >
        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.actionGrid}>
            <TouchableOpacity
              style={[styles.actionButton, { backgroundColor: COLORS.primary }]}
              onPress={() => navigation.navigate("CreateCourse")}
            >
              <Ionicons
                name="add-circle-outline"
                size={20}
                color={COLORS.surface}
              />
              <Text style={styles.actionText}>Add Course</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.actionButton,
                { backgroundColor: COLORS.secondary },
              ]}
            >
              <Ionicons
                name="help-circle-outline"
                size={20}
                color={COLORS.surface}
              />
              <Text style={styles.actionText}>Create Quiz</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Active Courses */}
        <View style={styles.section}>
          <View style={styles.rowBetween}>
            <Text style={styles.sectionTitle}>My Courses</Text>
            <TouchableOpacity onPress={loadInitialData}>
              <Text style={styles.seeAll}>Refresh</Text>
            </TouchableOpacity>
          </View>

          {loading ? (
            <ActivityIndicator
              size="large"
              color={COLORS.primary}
              style={{ marginTop: 20 }}
            />
          ) : courses.length > 0 ? (
            courses.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={styles.courseCard}
                activeOpacity={0.8}
                onPress={() =>
                  navigation.navigate("CourseDetails", { course: item })
                }
              >
                <Image
                  source={{ uri: item.image }}
                  style={styles.courseImage}
                  resizeMode="cover"
                />
                <View style={styles.courseInfo}>
                  <Text style={styles.courseTitle} numberOfLines={1}>
                    {item.title}
                  </Text>
                  <View style={styles.courseMeta}>
                    <Text style={styles.metaText}>{item.price}</Text>
                    <Text style={styles.metaText}>⭐ {item.rating}</Text>
                  </View>
                  <Text style={styles.metaText} numberOfLines={2}>
                    {item.description}
                  </Text>
                </View>
              </TouchableOpacity>
            ))
          ) : (
            <Text style={styles.noDataText}>No courses found.</Text>
          )}
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>

      <TabComponent activeTab="mycourses" setActiveTab={() => {}} />
    </SafeAreaView>
  );
};

// ... Styles stay mostly the same ...
const styles = StyleSheet.create({
  // Add these new styles or update existing
  container: { flex: 1, backgroundColor: COLORS.background },
  fixedHeaderContainer: {
    backgroundColor: COLORS.surface,
    paddingHorizontal: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderColor: COLORS.border,
    zIndex: 10,
  },
  headerContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
  },
  welcomeText: { fontSize: 22, fontWeight: "800", color: COLORS.textPrimary },
  subtitle: { fontSize: 13, color: COLORS.textSecondary, marginTop: 2 },
  profileBtn: {
    width: 45,
    height: 45,
    backgroundColor: COLORS.toggleTrack,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  notificationDot: {
    position: "absolute",
    top: 12,
    right: 14,
    width: 8,
    height: 8,
    backgroundColor: COLORS.primary,
    borderRadius: 4,
    borderWidth: 1.5,
    borderColor: COLORS.surface,
  },
  overviewRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  statsCard: {
    backgroundColor: COLORS.background,
    padding: 12,
    borderRadius: 16,
    width: "31%",
    alignItems: "center",
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  statsIconBg: {
    padding: 6,
    borderRadius: 8,
    backgroundColor: COLORS.surface,
    marginBottom: 8,
  },
  statsValue: { fontSize: 16, fontWeight: "800", color: COLORS.textPrimary },
  statsTitle: { fontSize: 11, color: COLORS.textSecondary, fontWeight: "500" },
  scrollPadding: { paddingVertical: 20 },
  section: { paddingHorizontal: 20, marginBottom: 25 },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: COLORS.textPrimary,
    marginBottom: 15,
  },
  actionGrid: { flexDirection: "row", justifyContent: "space-between" },
  actionButton: {
    width: "48%",
    padding: 16,
    borderRadius: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  actionText: { color: COLORS.surface, fontWeight: "700", fontSize: 14 },
  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  seeAll: { color: COLORS.secondary, fontWeight: "600" },
  courseCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 20,
    marginBottom: 16,
    flexDirection: "row",
    padding: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  courseImage: {
    width: 85,
    height: 85,
    borderRadius: 12,
    backgroundColor: COLORS.border,
  },
  courseInfo: { flex: 1, marginLeft: 15, justifyContent: "center" },
  courseTitle: { fontSize: 16, fontWeight: "700", color: COLORS.textPrimary },
  courseMeta: { flexDirection: "row", gap: 12, marginTop: 4, marginBottom: 4 },
  metaText: { color: COLORS.textSecondary, fontSize: 12, fontWeight: "500" },
  noDataText: {
    textAlign: "center",
    color: COLORS.textSecondary,
    marginTop: 20,
  },
});

export default InstructorPanel;
