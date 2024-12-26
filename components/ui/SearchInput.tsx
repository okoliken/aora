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
  
  
  export default function SearchInput({
    value,
    onBlur,
    customStyles,
    keyboardType,
    placeholder,
    onChangeText,
    errorMessage
  }: {
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
        <View className="w-full h-16 bg-black-100 rounded-lg flex-row items-center">
          <TextInput
            className="w-full h-full text-base text-white font-normal rounded-lg p-4 tracking-[0.2px] leading-[22.4px] focus:outline-none border-2 border-black-200 focus:border-2 focus:border-secondary font-pregular"
            placeholder={placeholder}
            value={value}
            autoCapitalize="none"
            autoCorrect={false}
            autoComplete="off"
            autoFocus={false}
            onChangeText={onChangeText}
            onBlur={onBlur}
            placeholderTextColor="#CDCDE0"
            keyboardType={keyboardType}
            cursorColor={"#FF9C01"}
            selectionColor={"#FF9C01"}
          />  
         <TouchableOpacity
              className="absolute right-4 top-5.5"
              activeOpacity={0.6}
              onPress={() => setShowPassword(!showPassword)}
            >
              <Image
                source={icons.search}
                className="w-5 h-5"
                resizeMode="contain"
              />
            </TouchableOpacity>
  
        </View>
          <Text className="text-xs text-red-600 font-pmedium absolute top-0 right-0">{errorMessage}</Text>
      </View>
    );
  }
  