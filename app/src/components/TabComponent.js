import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Animated } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../theme";

const TabComponent = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: "mycourses", label: "My Courses", icon: "book" },
    { id: "create", label: "Create", icon: "add-circle" },
    { id: "profile", label: "Profile", icon: "person" },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.tabWrapper}>
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <TouchableOpacity
              key={tab.id}
              style={[styles.tabButton, isActive && styles.activeTabButton]}
              onPress={() => setActiveTab(tab.id)}
              activeOpacity={0.7}
            >
              <Ionicons
                name={isActive ? tab.icon : `${tab.icon}-outline`}
                size={20}
                color={isActive ? COLORS.primary : COLORS.textSecondary}
              />
              <Text style={[styles.tabLabel, isActive && styles.activeTabLabel]}>
                {tab.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

export default TabComponent;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: COLORS.background,
  },
  tabWrapper: {
    flexDirection: "row",
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    padding: 6,
    borderWidth: 1,
    borderColor: COLORS.border,
    // Soft shadow
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  tabButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    borderRadius: 12,
    gap: 6,
  },
  activeTabButton: {
    backgroundColor: COLORS.primary + "10", // Very light orange tint
  },
  tabLabel: {
    fontSize: 13,
    fontWeight: "600",
    color: COLORS.textSecondary,
  },
  activeTabLabel: {
    color: COLORS.primary,
  },
});