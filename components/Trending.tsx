import {
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  ImageBackground,
  View,
  Button,
} from "react-native";
import React, { useEffect, useState } from "react";
import { ResizeMode, Video } from "expo-av";
import { useVideoPlayer, VideoView } from 'expo-video';
import * as Animatable from "react-native-animatable";
import { Post } from "@/lib/appwrite";

import { icons } from "../constants";
import { useEvent } from "expo";

interface Props {
  posts: Post[];
}

Animatable.initializeRegistryWithDefinitions({
  zoomIn: {
    0: {
      transform: [{ scale: 0.9 }],
    },
    1: {
      transform: [{ scale: 1 }],
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
  const [play, setPlay] = useState(false);
  const player = useVideoPlayer(item.Video, player => {
    player.loop = false;
    player.pause()
  });

  const { isPlaying } = useEvent(player, 'playingChange', { isPlaying: player.playing });

  return (
    <Animatable.View
      className="mr-5 py-1"
      animation={activePost.$id === item.$id ? "zoomIn" : "zoomOut"}
    >
      {play ? (
        <View>
          <VideoView
            style={{
              width: 208,
              height: 288,
              borderRadius: 33,
            }}
            className="rounded-[33px] mt-3 bg-white/10"
            player={player}
            onPointerEnter={() => { 
              setPlay(true);
              if (isPlaying) {
                player.pause();
              } else {
                player.play();
              }
            }}
            contentFit="cover"
            contentPosition={{ dx: 0.5, dy: 0.5 }}
            nativeControls={false}
          />
          <Button
            title="Stop Video"
            onPress={() => {
              player.pause();
              setPlay(false);
            }}
          />
        </View>
      ) : (
        <TouchableOpacity
          className="relative flex justify-center items-center"
          activeOpacity={0.7}
          onPress={() => {
            setPlay(true);
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
            className="w-52 h-72 rounded-[33px] my-5 overflow-hidden shadow-lg shadow-black/40"
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
      keyExtractor={(item) => item.$id}
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
