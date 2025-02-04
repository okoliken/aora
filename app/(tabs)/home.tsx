import {
  Text,
  View,
  FlatList,
  Image,
  RefreshControl,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useEffect } from "react";
import { images } from "@/constants";
import SearchInput from "@/components/ui/SearchInput";
import Trending from "@/components/Trending";
import EmptyState from "@/components/EmptyState";
import useFetchPost from "../../hooks/useFetchPost";
import { getAllPosts, getLatestPosts } from "../../lib/appwrite";
import VideoCard from "@/components/ui/VideoCard";
export default function Home() {
  const [refreshing, setRefreshing] = React.useState(false);
  const { data, refetch } = useFetchPost({ fetchPosts: getAllPosts });
  const { data: trendingPosts } = useFetchPost({
    fetchPosts: getLatestPosts,
  });

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  }, []);

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={data}
        renderItem={({ item }) => <VideoCard video={item} />}
        keyExtractor={(item) => item.$id}
        ListHeaderComponent={() => (
          <View className="my-6 px-6 gap-y-5">
            <View className="flex-row items-center justify-between h-[3.25rem]">
              <View>
                <Text className="font-bold text-gray-100 font-pmedium ">
                  Welcome Back
                </Text>
                <Text className="text-2xl font-semibold font-psemibold text-white">
                  JsMastery
                </Text>
              </View>
              <View>
                <Image
                  source={images.logoSmall}
                  className="w-9 h-19 rounded-full"
                  resizeMode="contain"
                />
              </View>
            </View>

            <SearchInput
              value=""
              onChangeText={(text: string) => {}}
              placeholder="Search for a video topic"
            />
            <View className="flex-row items-center justify-between">
              <Text className="font-pregular text-gray-100 text-sm">
                Latest Videos
              </Text>
            </View>

            <Trending posts={trendingPosts} />
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No Videos Found"
            description="Be the first to upload a video"
          />
        )}
        refreshControl={
          <RefreshControl
            tintColor="#fff"
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
      />
    </SafeAreaView>
  );
}
