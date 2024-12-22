import React, { ReactNode } from 'react';
import { SafeAreaView, ScrollView, View } from 'react-native';

interface ScreenLayoutProps {
  children: ReactNode;
  className?: string;
}

export const ScreenLayout: React.FC<ScreenLayoutProps> = ({
  children,
  className = '',
}) => {
  return (
    <SafeAreaView className={`bg-primary h-full ${className}`}>
      <ScrollView>
        <View className="flex-1">
          {children}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};