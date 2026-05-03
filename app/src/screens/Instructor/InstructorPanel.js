import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  ScrollView,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../../theme";
import { getUser } from "../../utils/storage";
import TabComponent from "../../components/TabComponent";

const InstructorPanel = ({ navigation }) => {
  const [user, setUser] = useState(null);

  const [courses] = useState([
    {
      id: "1",
      title: "React Native Mastery",
      students: 125,
      rating: 4.8,
      progress: 80,
      image: "https://via.placeholder.com/150",
    },
    {
      id: "2",
      title: "UI/UX Design Basics",
      students: 89,
      rating: 4.5,
      progress: 60,
      image: "https://via.placeholder.com/150",
    },
    {
      id: "3",
      title: "Advanced Node.js",
      students: 54,
      rating: 4.9,
      progress: 95,
      image: "https://via.placeholder.com/150",
    },
  ]);

  const stats = [
    { id: "1", title: "Courses", value: courses.length, icon: "book-outline" },
    { id: "2", title: "Students", value: "268", icon: "people-outline" },
    { id: "3", title: "Revenue", value: "$1.2k", icon: "cash-outline" },
  ];

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    const userData = await getUser();
    setUser(userData);
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

        {/* Fixed Overview Stats Row */}
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
            <TouchableOpacity>
              <Text style={styles.seeAll}>See All</Text>
            </TouchableOpacity>
          </View>

          {courses.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.courseCard}
              activeOpacity={0.8}
            >
              <Image source={{ uri: item.image }} style={styles.courseImage} />
              <View style={styles.courseInfo}>
                <Text style={styles.courseTitle}>{item.title}</Text>
                <View style={styles.courseMeta}>
                  <Text style={styles.metaText}>👥 {item.students}</Text>
                  <Text style={styles.metaText}>⭐ {item.rating}</Text>
                </View>
                <View style={styles.progressWrapper}>
                  <View style={styles.progressBg}>
                    <View
                      style={[
                        styles.progressFill,
                        { width: `${item.progress}%` },
                      ]}
                    />
                  </View>
                  <Text style={styles.progressPercent}>{item.progress}%</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Extra space for scrolling past the FAB */}
        <View style={{ height: 100 }} />
      </ScrollView>

      <TabComponent activeTab="mycourses" setActiveTab={() => {}} />
    </SafeAreaView>
  );
};

export default InstructorPanel;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  // Fixed Header Styles
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
  welcomeText: {
    fontSize: 22,
    fontWeight: "800",
    color: COLORS.textPrimary,
  },
  subtitle: {
    fontSize: 13,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
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

  // Overview Stats Section (Fixed)
  overviewRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  statsCard: {
    backgroundColor: COLORS.background,
    padding: 12,
    borderRadius: 16,
    width: "31%", // Fits 3 cards perfectly
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
  statsValue: {
    fontSize: 16,
    fontWeight: "800",
    color: COLORS.textPrimary,
  },
  statsTitle: {
    fontSize: 11,
    color: COLORS.textSecondary,
    fontWeight: "500",
  },

  // Scrollable Body
  scrollPadding: {
    paddingVertical: 20,
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: COLORS.textPrimary,
    marginBottom: 15,
  },

  // Action Buttons
  actionGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  actionButton: {
    width: "48%",
    padding: 16,
    borderRadius: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    elevation: 2,
    shadowColor: COLORS.textPrimary,
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  actionText: {
    color: COLORS.surface,
    fontWeight: "700",
    fontSize: 14,
  },

  // Course Cards
  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  seeAll: {
    color: COLORS.secondary,
    fontWeight: "600",
  },
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
  },
  courseInfo: {
    flex: 1,
    marginLeft: 15,
    justifyContent: "center",
  },
  courseTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: COLORS.textPrimary,
  },
  courseMeta: {
    flexDirection: "row",
    gap: 12,
    marginTop: 4,
  },
  metaText: {
    color: COLORS.textSecondary,
    fontSize: 12,
    fontWeight: "500",
  },

  progressWrapper: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    gap: 8,
  },
  progressBg: {
    flex: 1,
    height: 6,
    backgroundColor: COLORS.toggleTrack,
    borderRadius: 10,
  },
  progressFill: {
    height: "100%",
    backgroundColor: COLORS.primary,
    borderRadius: 10,
  },
  progressPercent: {
    fontSize: 11,
    fontWeight: "700",
    color: COLORS.primary,
  },

  // FAB
  fab: {
    position: "absolute",
    bottom: 30,
    right: 25,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    shadowColor: COLORS.primary,
    shadowOpacity: 0.3,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },
});
