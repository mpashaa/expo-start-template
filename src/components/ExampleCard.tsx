/**
 * ExampleCard - Пример использования дизайн-токенов
 */

import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useTokens } from "@/hooks";

interface ExampleCardProps {
  title: string;
  description: string;
}

export default function ExampleCard({ title, description }: ExampleCardProps) {
  const { colors, spacing } = useTokens();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.surface,
          borderColor: colors.border,
          shadowColor: colors.shadow,
          padding: spacing.lg,
          margin: spacing.md,
        },
      ]}
    >
      <Text
        style={[
          styles.title,
          {
            color: colors.text,
            marginBottom: spacing.sm,
          },
        ]}
      >
        {title}
      </Text>

      <Text style={[styles.description, { color: colors.textSecondary }]}>
        {description}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    borderWidth: 1,
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
    fontWeight: "600",
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
  },
});
