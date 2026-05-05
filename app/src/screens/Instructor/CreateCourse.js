import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import * as VideoThumbnails from "expo-video-thumbnails"; // New import
import axios from "axios";
import { COLORS } from "../../theme";
import { ENDPOINTS } from "../../api/Endpoints";
import { getToken } from "../../utils/storage";
import TabComponent from "../../components/TabComponent";


const CreateCourse = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [videoThumbnail, setVideoThumbnail] = useState(null);
  const [courseData, setCourseData] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    thumbnail: null,
    promoVideo: null,
  });

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 1,
    });

    if (!result.canceled) {
      setCourseData({ ...courseData, thumbnail: result.assets[0].uri });
    }
  };

  const pickVideo = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      const videoUri = result.assets[0].uri;
      setCourseData({ ...courseData, promoVideo: videoUri });
      generateVideoThumbnail(videoUri);
    }
  };

  // Function to generate a thumbnail from the selected video
  const generateVideoThumbnail = async (videoUri) => {
    try {
      const { uri } = await VideoThumbnails.getThumbnailAsync(videoUri, {
        time: 2000, // Take thumbnail at 2 seconds
      });
      setVideoThumbnail(uri);
    } catch (e) {
      console.warn("Thumbnail generation failed", e);
    }
  };

  const handlePublish = async () => {
    if (!courseData.title || !courseData.price) {
      Alert.alert("Error", "Please fill in the course title and price.");
      return;
    }

    setLoading(true);
    try {
      const token = await getToken();
      
      // Note: If your backend expects a File/FormData for images/videos, 
      // you'll need to wrap courseData in a FormData object here.
      const response = await axios.post(ENDPOINTS.CREATE_COURSE, courseData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      Alert.alert("Success", "Course submitted for review!");
      navigation.goBack();
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Failed to publish course. Please try again.");
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
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color={COLORS.textPrimary} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Create New Course</Text>
          <View style={{ width: 24 }} />
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.form}
        >
          {/* Thumbnail Section */}
          <Text style={styles.label}>Course Thumbnail</Text>
          <TouchableOpacity
            style={styles.uploadPlaceholder}
            onPress={pickImage}
          >
            {courseData.thumbnail ? (
              <Image
                source={{ uri: courseData.thumbnail }}
                style={styles.previewImage}
              />
            ) : (
              <>
                <Ionicons
                  name="image-outline"
                  size={40}
                  color={COLORS.textSecondary}
                />
                <Text style={styles.uploadText}>Upload Cover Image</Text>
              </>
            )}
          </TouchableOpacity>

          {/* Title and Category */}
          <Text style={styles.label}>Course Title</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g. Master React Native in 30 Days"
            value={courseData.title}
            onChangeText={(val) => setCourseData({ ...courseData, title: val })}
          />

          <View style={styles.row}>
            <View style={{ flex: 1, marginRight: 10 }}>
              <Text style={styles.label}>Price ($)</Text>
              <TextInput
                style={styles.input}
                placeholder="49.99"
                keyboardType="numeric"
                value={courseData.price}
                onChangeText={(val) =>
                  setCourseData({ ...courseData, price: val })
                }
              />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.label}>Category</Text>
              <TextInput
                style={styles.input}
                placeholder="Development"
                value={courseData.category}
                onChangeText={(val) =>
                  setCourseData({ ...courseData, category: val })
                }
              />
            </View>
          </View>

          {/* Description */}
          <Text style={styles.label}>Description</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="What will students learn?"
            multiline
            numberOfLines={4}
            textAlignVertical="top"
            value={courseData.description}
            onChangeText={(val) =>
              setCourseData({ ...courseData, description: val })
            }
          />

          {/* Video Section with Preview */}
          <Text style={styles.label}>Promo Video</Text>
          <TouchableOpacity 
            style={[styles.videoPicker, courseData.promoVideo && styles.videoActive]} 
            onPress={pickVideo}
          >
            {videoThumbnail ? (
              <View style={styles.videoPreviewContainer}>
                <Image source={{ uri: videoThumbnail }} style={styles.videoThumbnail} />
                <View style={styles.videoOverlay}>
                  <Ionicons name="play-circle" size={30} color="#FFF" />
                  <Text style={styles.videoChangeText}>Change Video</Text>
                </View>
              </View>
            ) : (
              <>
                <Ionicons
                  name="videocam-outline"
                  size={20}
                  color={COLORS.textSecondary}
                />
                <Text style={styles.videoPickerText}>Select Intro Video</Text>
              </>
            )}
          </TouchableOpacity>

          {/* Publish Button with Loader */}
          <TouchableOpacity
            style={[styles.publishButton, loading && styles.disabledButton]}
            onPress={handlePublish}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color={COLORS.surface} />
            ) : (
              <Text style={styles.publishButtonText}>Publish Course</Text>
            )}
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
      <TabComponent activeTab="createcourse" setActiveTab={() => {}} />
    </SafeAreaView>
  );
};
 
export default CreateCourse;

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
    borderBottomWidth: 1,
    borderColor: COLORS.border,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: COLORS.textPrimary,
  },
  form: {
    padding: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.textPrimary,
    marginBottom: 8,
    marginTop: 15,
  },
  input: {
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 12,
    padding: 15,
    fontSize: 16,
    color: COLORS.textPrimary,
  },
  textArea: {
    height: 120,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  uploadPlaceholder: {
    height: 180,
    backgroundColor: COLORS.toggleTrack,
    borderRadius: 16,
    borderStyle: "dashed",
    borderWidth: 2,
    borderColor: COLORS.border,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  previewImage: {
    width: "100%",
    height: "100%",
  },
  uploadText: {
    marginTop: 10,
    color: COLORS.textSecondary,
    fontSize: 14,
  },
  videoPicker: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.surface,
    padding: 15,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderStyle: "dashed",
    minHeight: 60,
  },
  videoActive: {
    padding: 0,
    borderStyle: 'solid',
    overflow: 'hidden',
  },
  videoPreviewContainer: {
    width: '100%',
    height: 120,
    position: 'relative',
  },
  videoThumbnail: {
    width: '100%',
    height: '100%',
  },
  videoOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  videoChangeText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: '600',
    marginTop: 4,
  },
  videoPickerText: {
    marginLeft: 10,
    color: COLORS.textSecondary,
    fontWeight: "500",
  },
  publishButton: {
    backgroundColor: COLORS.primary,
    padding: 18,
    borderRadius: 16,
    alignItems: "center",
    marginTop: 30,
    marginBottom: 40,
    height: 60, // Fixed height to prevent jump when loader appears
    justifyContent: 'center',
  },
  disabledButton: {
    opacity: 0.7,
  },
  publishButtonText: {
    color: COLORS.surface,
    fontSize: 16,
    fontWeight: "700",
  },
});