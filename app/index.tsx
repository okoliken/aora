import { View, Text, StyleSheet } from 'react-native';
import { Link } from 'expo-router';


export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text>This app includes example code to help you get.</Text>
      <Link href="/home" style={styles.link}>
        <Text>Go to profile</Text>
      </Link>
      <Text className='text-red-500 text-xl font-pblack'>This app includes example code to help you get started.</Text>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
    color: 'blue',
  },
});

