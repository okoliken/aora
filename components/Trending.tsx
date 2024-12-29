import {
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  ImageBackground,
} from "react-native";
import React, { useState } from "react";
import { useEvent } from 'expo';
import { useVideoPlayer, VideoView } from 'expo-video';
import * as Animatable from "react-native-animatable";
import { Post } from "@/lib/appwrite";

import { icons } from "../constants";

interface Props {
  posts: Post[];
}

Animatable.initializeRegistryWithDefinitions({
  zoomIn: {
    0: {
      transform: [{ scale: 0.9 }],
    },
    1: {
      transform: [{ scale: 1.1 }],
    },
  },
  zoomOut: {
    0: {
      transform: [{ scale: 1.1}],
    },
    1: {
      transform: [{ scale: 0.9 }],
    },
  },
});

const TrendingItem = ({
  activePost,
  item,
}: {
  activePost: Post;
  item: Post;
}) => {
  console.log('activePost', activePost.Video);
  const [play, setPlay] = useState(false);
  const player = useVideoPlayer(activePost.Video, player => {
    player.loop = true;
    player.play();
  });

  const { isPlaying } = useEvent(player, 'playingChange', { isPlaying: player.playing });
  return (
    <Animatable.View
      className="mr-5"
      animation={activePost.$id === item.$id ? "zoomIn" : "zoomOut"}
    >
      <VideoView
          player={player}
          className="w-52 h-72 rounded-[33px] mt-3 bg-white/10"
          nativeControls
          allowsPictureInPicture
        />
      {isPlaying ? (
        <></>
      ) : (
        <TouchableOpacity
          className="relative flex justify-center items-center"
          activeOpacity={0.7}
          onPress={() => {
            console.log('isPlaying', isPlaying);
            if (isPlaying) {
              player.pause();
            } else {
              player.play();
            }
          }}
        >
          <ImageBackground
            source={{
              uri: item.Thumbnail,
            }}
            className="w-52 h-72 rounded-[14px] my-5 overflow-hidden shadow-lg shadow-black/40"
            resizeMode="cover"
          />

          <Image
            source={icons.play}
            className="w-12 h-12 absolute"
            resizeMode="contain"
          />
        </TouchableOpacity>
      )}
    </Animatable.View>
  );
};

export default function Trending({ posts }: Props) {
  const [activePost, setActivePost] = useState(posts[1]);
  return (
    <FlatList
      data={posts}
      renderItem={({ item }) => (
        <TrendingItem activePost={activePost} item={item} />
      )}
      horizontal
      contentOffset={{ x: 170, y: 0 }}
      onViewableItemsChanged={({ viewableItems }) => {
        if (viewableItems.length > 0) {
          setActivePost(viewableItems[0].item);
        }
      }}
      viewabilityConfig={{
        itemVisiblePercentThreshold: 70,
      }}
    />
  );
}

const styles = StyleSheet.create({});
