import React from "react";
import { Modal, View, Text, TouchableOpacity, StyleSheet } from "react-native";

const statuses = ["pending", "in-progress", "completed"];

export default function StatusModal({
  visible,
  onClose,
  onSelectStatus,
  currentStatus,
}) {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.container}>
          {statuses.map((status) => (
            <TouchableOpacity
              key={status}
              style={[
                styles.button,
                currentStatus === status
                  ? styles.activeButton
                  : styles.inactiveButton,
              ]}
              onPress={() => onSelectStatus(status)}>
              <Text
                style={[
                  styles.buttonText,
                  currentStatus === status
                    ? styles.activeText
                    : styles.inactiveText,
                ]}>
                {status}
              </Text>
            </TouchableOpacity>
          ))}
          <TouchableOpacity
            style={[styles.button, styles.cancelButton]}
            onPress={onClose}>
            <Text style={styles.cancelText}>cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  container: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    width: "80%",
  },
  button: {
    padding: 14,
    borderRadius: 8,
    marginVertical: 6,
    alignItems: "center",
  },
  activeButton: {
    backgroundColor: "#28a745",
  },
  inactiveButton: {
    backgroundColor: "#ccc",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  activeText: {
    color: "white",
  },
  inactiveText: {
    color: "#333",
  },
  cancelButton: {
    backgroundColor: "red",
  },
  cancelText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
