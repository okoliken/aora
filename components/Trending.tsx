import { StyleSheet, Text, View, FlatList } from 'react-native'
import React from 'react'

interface Props {
    posts: Array<number>   
}

export default function Trending({ posts }: Props) {
  return (
    <FlatList
      data={posts}
      renderItem={({ item }) => <Text className='text-white'>Trending {item}</Text>}
      horizontal
    />
  )
}

const styles = StyleSheet.create({})