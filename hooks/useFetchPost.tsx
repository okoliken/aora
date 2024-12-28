import { useEffect, useState } from "react";
import { getAllPosts, type Post } from "../lib/appwrite";
import { Alert } from "react-native";
import { Models } from 'react-native-appwrite'




const useFetchPost = ({fetchPosts}: {fetchPosts: () => Promise<Models.Document[]>}) => {
  const [data, setData] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(false);


  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetchPosts();
      setData(response as Post[]);
    } catch (error) {
      Alert.alert("Error", error as string);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const refetch = () => fetchData()

  return { data, loading, refetch };
};

export default useFetchPost;
