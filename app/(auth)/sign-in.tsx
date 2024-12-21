import { Text, View, ScrollView, Image } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link } from "expo-router";
import Button from "@/components/ui/Button";
import { images } from "@/constants";
import FormField from "@/components/ui/FormField";

export default function SignIn() {
  const [form, setForm] = React.useState({
    email: "",
    passWord: "",
  });

  const handleSignIn = () => {
    console.log(form)
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="w-full min-h-[85vh] justify-center gap-y-[2.5rem] py-6 px-4">
          <Image
            source={images.logo}
            className="w-[115px] h-[35px]"
            resizeMode="contain"
          />
          <View className="w-full">
            <Text className="text-3xl text-white font-semibold text-left font-psemibold tracking-[-1px]">
              Log in to Area
            </Text>

            <View className="mt-8 gap-y-[1.375rem]">
              <FormField
                title="Email"
                value={form.email}
                keyboardType="email-address"
                placeholder="Enter your email"
                handleFieldChange={(e) => {
                  setForm({ ...form, email: e });
                }}
              />
              <FormField
                title="Password"
                value={form.passWord}
                placeholder="Enter your password"
                secureTextEntry
                keyboardType="visible-password"
                handleFieldChange={(e) => {
                  setForm({ ...form, passWord: e });
                }}
              />

              <View className="flex items-end flex-col">
                <Text className="text-gray-100 text-sm font-pregular">
                  Forgot password
                </Text>
                <Button
                  title="Sign in"
                  containerStyles="mt-8 w-full"
                  handlePress={() => handleSignIn()}
                />
              </View>

              <View className="flex-row justify-center items-center leading-[20.3px]">
                <Text className="text-sm text-white font-pregular">
                  Don't have an account?
                </Text>
                <Link
                  href={'/sign-up'}
                  className="text-sm text-secondary-200 font-psemibold"

                >
                  {""} Signup
                </Link>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
