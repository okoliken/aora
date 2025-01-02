import React from "react";
import { Text, View, Image } from "react-native";
import { Link, router } from "expo-router";
import Button from "@/components/ui/Button";
import { images } from "@/constants";
import { useForm, Controller } from "react-hook-form";
import FormField from "@/components/ui/FormField";
import { ScreenLayout } from "@/components/layouts/ScreenLayout";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from '@/lib/appwrite'
import * as z from "zod";
import { Ionicons } from "@expo/vector-icons";

export default function SignIn() {
  const formSchema: z.ZodType<{ email: string; password: string }> = z.object({
    email: z.string().email({ message: "Invalid email address" }),
    password: z
      .string()
      .min(8, { message: "Must be 8 or more characters long" }),
  });

  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");

  React.useEffect(() => {
    let timerId: NodeJS.Timeout;
    if (errorMessage) {
      timerId = setTimeout(() => {
        setErrorMessage("");
      }, 4000);
    }
    return () => {
      if (timerId) clearTimeout(timerId);
    };
  }, [errorMessage]);

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

  const handleSignIn = async (data: { email: string; password: string }) => {
    setErrorMessage("");
    setIsSubmitting(true);
    try {
      await signIn(data.email, data.password);
      router.replace("/home");
      reset();
    } catch (error) {
      const errorMessage = error instanceof Error 
        ? error.message 
        : "An unexpected error occurred during sign in";
      
      const friendlyErrorMessage = (() => {
        if (errorMessage.includes("Invalid credentials")) {
          return "The email or password you entered is incorrect. Please try again.";
        }
        if (errorMessage.includes("user not found")) {
          return "No account found with this email. Please sign up or check your email.";
        }
        if (errorMessage.includes("network")) {
          return "Connection error. Please check your internet and try again.";
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
            Log in to Area
          </Text>

          {errorMessage && (
            <View className="bg-red-100 border border-red-400 rounded-md px-3 py-1 mb-4 flex-row items-center">
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
                isLoading={isSubmitting}
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
