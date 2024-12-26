import { StyleSheet, Text, View, Image } from "react-native";
import CustomButton from "./ui/Button";
import { images } from "@/constants";
import React from "react";

export default function EmptyState({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <View className="justify-center items-center px-4">
      <Image
        source={images.empty}
        className="w-[16.875rem] h-[13.438rem]"
        resizeMode="contain"
      />
      <Text className="text-2xl font-semibold font-psemibold text-white text-center mt-2">{title}</Text>
      <Text className="font-bold text-gray-100 font-pmedium text-center">
        {description}
      </Text>

      <CustomButton
        title="Create Video"
        containerStyles="mt-10 w-full"
        handlePress={() => {}}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
