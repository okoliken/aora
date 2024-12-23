import React from "react";
import { Text, View, Image } from "react-native";
import { Link, router } from "expo-router";
import Button from "@/components/ui/Button";
import { images } from "@/constants";
import { useForm, Controller } from "react-hook-form";
import FormField from "@/components/ui/FormField";
import { ScreenLayout } from "@/components/layouts/ScreenLayout";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

export default function SignIn() {
  const formSchema: z.ZodType<{ email: string; password: string }> = z.object({
    email: z.string().email({ message: "Invalid email address" }),
    password: z
      .string()
      .min(8, { message: "Must be 8 or more characters long" }),
  });

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSignIn = (data: { email: string; password: string }) => {
    console.log(data);
    reset({
      email: "",
      password: "",
    });
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
            Log in to Area
          </Text>

          <View className="mt-8 gap-y-[1.375rem]">
            <Controller
              name="email"
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <FormField
                  title="Email"
                  keyboardType="email-address"
                  placeholder="Enter your email"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  errorMessage={errors.email?.message}
                />
              )}
            />
            <Controller
              name="password"
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <FormField
                  title="Password"
                  value={value}
                  placeholder="Enter your password"
                  secureTextEntry
                  keyboardType="visible-password"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  errorMessage={errors.password?.message}
                />
              )}
            />

            <View className="flex items-end flex-col">
              <Text className="text-gray-100 text-sm font-pregular">
                Forgot password
              </Text>
              <Button
                title="Sign in"
                containerStyles="mt-8 w-full"
                handlePress={handleSubmit(handleSignIn)}
              />
            </View>

            <View className="flex-row justify-center items-center leading-[20.3px]">
              <Text className="text-sm text-white font-pregular">
                Don't have an account?
              </Text>
              <Link
                href={"/sign-up"}
                className="text-sm text-secondary-200 font-psemibold"
              >
                {""} Signup
              </Link>
            </View>
          </View>
        </View>
      </View>
    </ScreenLayout>
  );
}
