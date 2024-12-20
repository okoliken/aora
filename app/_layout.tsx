
import { Stack } from 'expo-router';
import "../global.css";
import { StatusBar } from 'expo-status-bar';

export default function RootLayout() {
 
  return (
    <>
      <Stack screenOptions={{ headerStyle: { backgroundColor: '#f4f4f4' } }}>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
        {/* <Stack.Screen name="profile" /> */}
      </Stack>
      <StatusBar style="auto" />
    </>
  );
}
