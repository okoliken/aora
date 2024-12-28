import { Image, Text, View, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { Post } from "@/lib/appwrite";
import { icons } from "@/constants";

export default function VideoCard({ video }: { video: Post }) {
  const [play, setPlay] = useState(false);
  return (
    <View className="flex-col items-center px-4 mb-14">
      <View className="flex-row gap-3 items-start">
        <View className="justify-center items-center flex-row flex-1">
          <View className="flex-row items-center w-[46px] h-[46px] rounded-lg border border-secondary">
            <Image
              source={{ uri: video.users.Avatar }}
              className="w-full h-full rounded-lg"
              resizeMode="cover"
            />
          </View>
          <View className="justify-center flex-1 ml-3 gap-y-1">
            <Text
              className="text-white font-psemibold text-sm"
              numberOfLines={1}
            >
              {video.Title}
            </Text>
            <Text
              className="text-gray-100 font-pregular text-xs"
              numberOfLines={1}
            >
              {video.users.Username}
            </Text>
          </View>
        </View>
        <View className="pt-2">
          <Image source={icons.menu} className="w-5 h-5" resizeMode="contain" />
        </View>
      </View>

      {play ? (
        <Text
          onPress={() => setPlay(false)}
          className="text-white font-psemibold text-sm"
        >
          Playing
        </Text>
      ) : (
        <TouchableOpacity
          onPress={() => setPlay(true)}
          activeOpacity={0.6}
          className="w-full h-60 justify-center items-center mt-3 rounded-lg"
        >
          <Image
            source={{ uri: video.Thumbnail }}
            className="w-full h-full rounded-lg mt-3"
            resizeMode="cover"
          />

          <Image
            source={icons.play}
            className="w-12 h-12 absolute"
            resizeMode="contain"
          />
        </TouchableOpacity>
      )}
    </View>
  );
}
