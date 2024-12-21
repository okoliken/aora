import { Text, TouchableOpacity } from "react-native";
import React from "react";

interface Props {
  title: string;
  handlePress?: () => void;
  containerStyles?: string;
  isLoading?: boolean;
  textStyles?: string;
}

export default function Button({
  title,
  handlePress,
  containerStyles,
  textStyles,
  isLoading,
}: Props) {
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      className={`bg-secondary rounded-xl min-h-[58px] flex items-center justify-center text-white w-[327px] ${containerStyles}
      ${isLoading ? "opacity-50" : ""}
      `}
      onPress={handlePress}
      disabled={isLoading}
    >
      <Text className={`font-psemibold font-bold ${textStyles}`}>{title}</Text>
    </TouchableOpacity>
  );
}
