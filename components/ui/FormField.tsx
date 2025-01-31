import {
  Image,
  Text,
  View,
  TextInput,
  KeyboardTypeOptions,
  TouchableOpacity,
  NativeSyntheticEvent,
  TextInputFocusEventData,
} from "react-native";
import { icons } from "@/constants";
import React from "react";


export default function FormField({
  title,
  value,
  onBlur,
  customStyles,
  keyboardType,
  placeholder,
  onChangeText,
  errorMessage
}: {
  title: string;
  value: string;
  onChangeText: (text: string) => void;
  onBlur?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
  customStyles?: string;
  keyboardType?: KeyboardTypeOptions | undefined;
  placeholder?: string;
  errorMessage?: string
}) {
  const [showPassword, setShowPassword] = React.useState(false);

  return (
    <View className={`flex flex-col gap-y-2 relative ${customStyles}`}>
      <Text className="text-base text-gray-100 font-pmedium">{title}</Text>
      <View className="w-full h-16 bg-black-100 rounded-lg flex-row items-center">
        <TextInput
          className="w-full h-full text-base text-white font-semibold rounded-lg p-4 tracking-tighter focus:outline-none border-2 border-black-200 focus:border-2 focus:border-secondary font-pmedium"
          placeholder={placeholder}
          value={value}
          autoCapitalize="none"
          autoCorrect={false}
          autoComplete="off"
          autoFocus={false}
          onChangeText={onChangeText}
          onBlur={onBlur}
          placeholderTextColor="#7B7B8B"
          keyboardType={keyboardType}
          cursorColor={"#FF9C01"}
          selectionColor={"#FF9C01"}
          secureTextEntry={title === "Password" ? !showPassword : false}
        />  
        {title === "Password" && (
          <TouchableOpacity
            className="absolute right-4 top-5.5"
            activeOpacity={0.6}
            onPress={() => setShowPassword(!showPassword)}
          >
            <Image
              source={showPassword ? icons.eyeHide : icons.eye}
              className="w-6 h-6"
              resizeMode="contain"
            />
          </TouchableOpacity>
        )}

      </View>
        <Text className="text-xs text-red-600 font-pmedium absolute top-0 right-0">{errorMessage}</Text>
    </View>
  );
}
