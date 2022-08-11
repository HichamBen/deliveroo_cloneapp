import { View, Text, Image } from 'react-native'
import React, { useEffect } from 'react';
import * as Animatable from 'react-native-animatable';
import * as Progress from 'react-native-progress';
import { useNavigation } from '@react-navigation/native';

export default function PreparingOrderScreen() {
  const navigation = useNavigation();
  useEffect(() => {
    setTimeout(() => {
         navigation.navigate("Delivery")
    }, 4000)
  }, [])

  return (
    <View className="bg-[#00CCBB] flex-1 justify-center items-center">
      <Animatable.Image animation="slideInDown" iterationCount={1} className="w-60 h-56" source={require("../assets/deliveryMotion.gif")} />
      <Animatable.Text animation="slideInUp" iterationCount={1} className="text-white mt-10 text-center">Waiting for Restaurant to accept your order!</Animatable.Text>
      <Progress.Circle size={32} indeterminate={true} color="white" className="mt-8" />
    </View>
  )
}