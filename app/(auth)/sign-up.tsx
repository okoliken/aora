import { Text, View, Image } from "react-native";
import { images } from "@/constants";
import React from "react";
import FormField from "@/components/ui/FormField";
import Button from "@/components/ui/Button";
import { Link, router } from "expo-router";
import { ScreenLayout } from "@/components/layouts/ScreenLayout";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { createUser } from "@/lib/appwrite";
import { Ionicons } from "@expo/vector-icons";

export default function SignUp() {
  const formSchema: z.ZodType<{ username: string; email: string; password: string }> = z.object({
    username: z
      .string()
      .min(2, { message: "Username must be at least 2 characters" })
      .max(50, { message: "Username must be less than 50 characters" }),
    email: z.string().email({ message: "Invalid email address" }),
    password: z
      .string()
      .min(8, { message: "Password must be 8 or more characters long" }),
  });

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");

  React.useEffect(() => {
    let timerId: NodeJS.Timeout;
    if (errorMessage) {
      timerId = setTimeout(() => {
        setErrorMessage("");
      }, 6000);
    }
    return () => {
      if (timerId) clearTimeout(timerId);
    };
  }, [errorMessage]);

  const handleSignUp = async (data: { username: string; email: string; password: string }) => {
    setErrorMessage("");
    setIsSubmitting(true);
    try {
      await createUser(data.email, data.password, data.username);
      router.replace("/home");
      reset();
    } catch (error) {
      const errorMessage = error instanceof Error 
        ? error.message 
        : "An unexpected error occurred during sign up";
      
      const friendlyErrorMessage = (() => {
        if (errorMessage.includes("Invalid document structure")) {
          return "We're having trouble creating your profile. Please check your information and try again.";
        }
        if (errorMessage.includes("Missing required attribute")) {
          return "Some required information is missing. Please fill out all fields completely.";
        }
        if (errorMessage.includes("email")) {
          return "The email you entered appears to be invalid. Please check and try again.";
        }
        return errorMessage;
      })();
      
      setErrorMessage(friendlyErrorMessage);
    } finally {
      setIsSubmitting(false);
    }
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

          {errorMessage && (
            <View className="bg-red-100 border border-red-400 rounded-md p-3 mb-4 flex-row items-center">
              <Ionicons 
                name="warning" 
                size={20} 
                color="#DC2626" 
                className="mr-3" 
              />
              <Text className="text-red-700 flex-1 font-pregular text-sm">
                {errorMessage}
              </Text>
            </View>
          )}

          <View className="mt-8 gap-y-[1.375rem]">
            <Controller
              name="username"
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <FormField
                  title="Username"
                  placeholder="Enter your username"
                  value={value}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  errorMessage={errors.username?.message}
                />
              )}
            />
            <Controller
              name="email"
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <FormField
                  title="Email"
                  placeholder="Enter your email"
                  keyboardType="email-address"
                  value={value}
                  onBlur={onBlur}
                  onChangeText={onChange}
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
                  onBlur={onBlur}
                  onChangeText={onChange}
                  errorMessage={errors.password?.message}
                />
              )}
            />
          </View>
        </View>
        <View className="w-full">
          <Button
            title="Sign up"
            containerStyles="w-full"
            handlePress={handleSubmit(handleSignUp)}
            isLoading={isSubmitting}
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
