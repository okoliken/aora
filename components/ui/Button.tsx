import { TouchableOpacity, Text, ActivityIndicator } from "react-native";
import React from "react";

interface Props {
  title: string;
  handlePress: () => void;
  containerStyles?: string;
  textStyles?: string;
  isLoading?: boolean;
}

export default function Button({
  title,
  handlePress,
  containerStyles,
  textStyles,
  isLoading = false,
}: Props) {
  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.7}
      disabled={isLoading}
      className={`bg-secondary-200 rounded-xl min-h-[62px] flex flex-row justify-center items-center ${containerStyles} ${
        isLoading ? "opacity-50" : ""
      }`}
    >
      {isLoading ? (
        <ActivityIndicator color="#fff" size="small" />
      ) : (
        <Text
          className={`text-primary font-psemibold text-lg ${textStyles}`}
        >
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
}
