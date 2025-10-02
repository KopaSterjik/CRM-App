import React from "react";
import { Modal, View, Text, Pressable, StyleSheet } from "react-native";

type StatusModalProps = {
  visible: boolean;
  onClose: () => void;
  onSelectStatus: (status: "pending" | "in-progress" | "completed") => void;
};

const StatusModal: React.FC<StatusModalProps> = ({
  visible,
  onClose,
  onSelectStatus,
}) => {
  const statuses: ("pending" | "in-progress" | "completed")[] = [
    "pending",
    "in-progress",
    "completed",
  ];

  return (
    <Modal
      transparent={true}
      visible={visible}
      animationType="fade"
      onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.container}>
          {statuses.map((status) => (
            <Pressable
              key={status}
              style={[styles.button, , { backgroundColor: "green" }]}
              onPress={() => onSelectStatus(status)}>
              <Text style={styles.buttonText}>{status}</Text>
            </Pressable>
          ))}
          <Pressable
            style={[styles.button, { backgroundColor: "#cd0f0fff" }]}
            onPress={onClose}>
            <Text style={[styles.buttonText]}>Cancel</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

export default StatusModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    width: "80%",
    alignItems: "center",
  },
  button: {
    padding: 12,
    marginVertical: 6,
    borderRadius: 6,
    width: "100%",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
