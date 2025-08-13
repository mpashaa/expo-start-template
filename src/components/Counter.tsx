import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useTranslation } from "react-i18next";
import { Ionicons } from "@expo/vector-icons";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useTheme } from "@/contexts";
import {
  increment,
  decrement,
  incrementByAmount,
  reset,
  selectCounter,
  selectCounterLoading,
} from "@/store/slices/counterSlice";

export default function Counter() {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const dispatch = useAppDispatch();
  const count = useAppSelector(selectCounter);
  const isLoading = useAppSelector(selectCounterLoading);

  const handleIncrement = () => {
    dispatch(increment());
  };

  const handleDecrement = () => {
    dispatch(decrement());
  };

  const handleIncrementByFive = () => {
    dispatch(incrementByAmount(5));
  };

  const handleReset = () => {
    dispatch(reset());
  };

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: colors.surface, shadowColor: colors.shadow },
      ]}
    >
      <Text style={[styles.title, { color: colors.text }]}>Redux Counter</Text>

      <View
        style={[
          styles.counterDisplay,
          { backgroundColor: colors.backgroundSecondary },
        ]}
      >
        <Text style={[styles.counterText, { color: colors.primary }]}>
          {count}
        </Text>
      </View>

      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={[styles.button, styles.decrementButton]}
          onPress={handleDecrement}
          disabled={isLoading}
        >
          <Ionicons name="remove" size={24} color="white" />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.incrementButton]}
          onPress={handleIncrement}
          disabled={isLoading}
        >
          <Ionicons name="add" size={24} color="white" />
        </TouchableOpacity>
      </View>

      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={[styles.button, styles.specialButton]}
          onPress={handleIncrementByFive}
          disabled={isLoading}
        >
          <Text style={styles.buttonText}>+5</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.resetButton]}
          onPress={handleReset}
          disabled={isLoading}
        >
          <Ionicons name="refresh" size={20} color="white" />
          <Text style={styles.buttonText}>Reset</Text>
        </TouchableOpacity>
      </View>

      {isLoading && (
        <Text style={[styles.loadingText, { color: colors.textSecondary }]}>
          {t("common.loading")}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    borderRadius: 12,
    margin: 16,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  counterDisplay: {
    borderRadius: 8,
    padding: 20,
    marginBottom: 20,
    alignItems: "center",
  },
  counterText: {
    fontSize: 48,
    fontWeight: "bold",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 12,
    gap: 12,
  },
  button: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    gap: 8,
  },
  incrementButton: {
    backgroundColor: "#28a745",
  },
  decrementButton: {
    backgroundColor: "#dc3545",
  },
  specialButton: {
    backgroundColor: "#007AFF",
  },
  resetButton: {
    backgroundColor: "#6c757d",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  loadingText: {
    textAlign: "center",
    fontStyle: "italic",
    marginTop: 10,
  },
});
