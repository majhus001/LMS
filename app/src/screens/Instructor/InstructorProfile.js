import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
  Alert,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../../theme";
import { getUser, saveUser, clearStorage } from "../../utils/storage";

const { width } = Dimensions.get("window");

const InstructorProfile = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState({
    name: "",
    email: "",
    bio: "",
    specialty: "",
    profileImage: "https://ui-avatars.com/api/?name=Instructor&background=6366f1&color=fff&size=512",
  });

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      const storedUser = await getUser();
      if (storedUser) {
        setUser((prev) => ({ ...prev, ...storedUser }));
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setLoading(true);
    await saveUser(user);
    setIsEditing(false);
    setLoading(false);
    Alert.alert("Profile Updated", "Your changes have been saved successfully.");
  };

  if (loading && !isEditing) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      {/* --- CUSTOM TOP BAR --- */}
      <View style={styles.topBar}>
        <TouchableOpacity style={styles.iconBtn} onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color={COLORS.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Profile</Text>
        <TouchableOpacity 
          style={[styles.editActionBtn, isEditing && styles.saveActionBtn]} 
          onPress={() => (isEditing ? handleSave() : setIsEditing(true))}
        >
          <Text style={[styles.editActionText, isEditing && { color: COLORS.surface }]}>
            {isEditing ? "Save" : "Edit"}
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
        
        {/* --- PROFILE HEADER CARD --- */}
        <View style={styles.profileHeader}>
          <View style={styles.imageWrapper}>
            <Image source={{ uri: user.profileImage }} style={styles.profileImage} />
            {isEditing && (
              <TouchableOpacity style={styles.cameraBadge}>
                <Ionicons name="camera" size={18} color={COLORS.surface} />
              </TouchableOpacity>
            )}
          </View>
          <Text style={styles.userName}>{user.name || "Instructor Name"}</Text>
          <Text style={styles.userTag}>{user.specialty || "Expert Educator"}</Text>

          {/* QUICK STATS */}
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>1.2k</Text>
              <Text style={styles.statLabel}>Students</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>12</Text>
              <Text style={styles.statLabel}>Courses</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>4.9</Text>
              <Text style={styles.statLabel}>Rating</Text>
            </View>
          </View>
        </View>

        {/* --- INFO SECTION --- */}
        <View style={styles.formCard}>
          <Text style={styles.sectionTitle}>Account Information</Text>
          
          <InputField 
            label="Full Name" 
            value={user.name} 
            editable={isEditing} 
            icon="person-outline"
            onChangeText={(t) => setUser({...user, name: t})} 
          />
          
          <InputField 
            label="Email Address" 
            value={user.email} 
            editable={false} 
            icon="mail-outline"
            isLocked 
          />

          <InputField 
            label="Specialty" 
            value={user.specialty} 
            editable={isEditing} 
            icon="ribbon-outline"
            onChangeText={(t) => setUser({...user, specialty: t})} 
          />

          <InputField 
            label="About Me" 
            value={user.bio} 
            editable={isEditing} 
            icon="document-text-outline"
            multiline
            onChangeText={(t) => setUser({...user, bio: t})} 
          />
        </View>

        {/* --- LOGOUT BUTTON --- */}
        {!isEditing && (
          <TouchableOpacity style={styles.logoutBtn} onPress={() => clearStorage()}>
            <Ionicons name="log-out-outline" size={20} color="#FF3B30" />
            <Text style={styles.logoutText}>Sign Out</Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

// Reusable Input Component for cleaner code
const InputField = ({ label, value, editable, icon, isLocked, multiline, onChangeText }) => (
  <View style={styles.inputContainer}>
    <View style={styles.labelRow}>
      <Ionicons name={icon} size={16} color={COLORS.textSecondary} style={{ marginRight: 6 }} />
      <Text style={styles.label}>{label}</Text>
    </View>
    <TextInput
      style={[
        styles.input, 
        !editable && styles.inputDisabled, 
        multiline && { height: 80, textAlignVertical: 'top' }
      ]}
      value={value}
      editable={editable}
      multiline={multiline}
      onChangeText={onChangeText}
      placeholderTextColor={COLORS.textSecondary}
    />
    {isLocked && !editable && <Ionicons name="lock-closed" size={14} color={COLORS.border} style={styles.lockIcon} />}
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F8F9FE" },
  loaderContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: COLORS.surface,
  },
  iconBtn: {
    padding: 8,
    borderRadius: 12,
    backgroundColor: "#F0F2F5",
  },
  headerTitle: { fontSize: 18, fontWeight: "700", color: COLORS.textPrimary },
  editActionBtn: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
  saveActionBtn: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  editActionText: { color: COLORS.primary, fontWeight: "600" },

  profileHeader: {
    alignItems: "center",
    paddingVertical: 30,
    backgroundColor: COLORS.surface,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
  },
  imageWrapper: {
    position: "relative",
    marginBottom: 16,
  },
  profileImage: {
    width: 110,
    height: 110,
    borderRadius: 55,
    borderWidth: 3,
    borderColor: COLORS.primary + "30",
  },
  cameraBadge: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: COLORS.primary,
    padding: 8,
    borderRadius: 20,
    borderWidth: 3,
    borderColor: COLORS.surface,
  },
  userName: { fontSize: 22, fontWeight: "800", color: COLORS.textPrimary },
  userTag: { fontSize: 14, color: COLORS.textSecondary, marginTop: 4 },

  statsRow: {
    flexDirection: "row",
    marginTop: 25,
    width: "80%",
    justifyContent: "space-between",
    alignItems: "center",
  },
  statItem: { alignItems: "center" },
  statValue: { fontSize: 18, fontWeight: "700", color: COLORS.textPrimary },
  statLabel: { fontSize: 12, color: COLORS.textSecondary },
  divider: { width: 1, height: 20, backgroundColor: COLORS.border },

  formCard: {
    margin: 20,
    backgroundColor: COLORS.surface,
    borderRadius: 24,
    padding: 20,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.03,
  },
  sectionTitle: { fontSize: 16, fontWeight: "700", color: COLORS.textPrimary, marginBottom: 20 },
  inputContainer: { marginBottom: 20, position: 'relative' },
  labelRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  label: { fontSize: 13, fontWeight: "600", color: COLORS.textSecondary },
  input: {
    backgroundColor: "#F9FAFB",
    borderRadius: 12,
    padding: 14,
    fontSize: 15,
    color: COLORS.textPrimary,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  inputDisabled: {
    backgroundColor: "transparent",
    borderColor: "transparent",
    paddingLeft: 0,
    color: COLORS.textSecondary,
  },
  lockIcon: { position: 'absolute', right: 0, bottom: 18 },

  logoutBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 20,
    padding: 16,
    borderRadius: 16,
    backgroundColor: "#FFF5F5",
    borderWidth: 1,
    borderColor: "#FFE0E0",
  },
  logoutText: { marginLeft: 10, color: "#FF3B30", fontWeight: "700", fontSize: 15 },
});

export default InstructorProfile;