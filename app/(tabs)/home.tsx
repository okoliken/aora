import { Text, View, FlatList, Image, RefreshControl } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React from "react";
import { images } from "@/constants";
import SearchInput from "@/components/ui/SearchInput";
import Trending from "@/components/Trending";
import EmptyState from "@/components/EmptyState";

export default function Home() {
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);
  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={[
          {
            id: 1,
          }
        ]}
        renderItem={({ item }) => <Text className="text-white">{item.id}</Text>}
        keyExtractor={(item) => item.id.toString()}
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
            <View className="flex-row items-center justify-between pt-[2.25rem]">
              <Text className="font-pregular text-gray-100 text-sm">
                Trending Videos
              </Text>
            </View>

            <Trending posts={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]} />
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No Videos Found"
            description="Be the first to upload a video"
          />
        )}
        refreshControl={
          <RefreshControl tintColor="#fff" refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </SafeAreaView>
  );
}
