import { Text, View, Image } from "react-native";
import { images } from "@/constants";
import React from "react";
import FormField from "@/components/ui/FormField";
import Button from "@/components/ui/Button";
import { Link } from "expo-router";
import { ScreenLayout } from "@/components/layouts/ScreenLayout";

export default function SignUp() {
  const [form, setForm] = React.useState({
    email: "",
    passWord: "",
    username: "",
  });

  const handleSignUp = () => {
    console.log(form);
  };

  return (
    <ScreenLayout>
      <View className="w-full min-h-[85vh] justify-center gap-y-[2.5rem] py-6 px-4">
        <Image
          source={images.logo}
          className="w-[115px] h-[35px]"
          resizeMode="contain"
        />

        <View className="w-full">
          <Text className="text-3xl text-white font-semibold text-left font-psemibold tracking-[-1px]">
            Create Account
          </Text>

          <View className="mt-8 gap-y-[1.375rem]">
            <FormField
              title="Username"
              placeholder="Enter your username"
              value={form.username}
              handleFieldChange={() => {}}
            />
            <FormField
              title="Email"
              placeholder="Enter your email"
              keyboardType="email-address"
              value={form.email}
              handleFieldChange={() => {}}
            />
            <FormField
              title="Password"
              value={form.passWord}
              placeholder="Enter your password"
              secureTextEntry
              handleFieldChange={() => {}}
            />
          </View>
        </View>
        <View className="flex items-end flex-col">
          <Button
            title="Sign up"
            containerStyles="w-full"
            handlePress={() => handleSignUp()}
          />
        </View>

        <View className="flex-row justify-center items-center leading-[20.3px]">
          <Text className="text-sm text-white font-pregular">
            Already have an account?
          </Text>
          <Link
            href={"/sign-in"}
            className="text-sm text-secondary-200 font-psemibold"
          >
            {""} Signin
          </Link>
        </View>
      </View>
    </ScreenLayout>
  );
}
