import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux'
import { getTotalePrice, selectedItem } from '../reduxThings/basketSlice'
import currencyFormatter from "currency-formatter";
import { useNavigation } from '@react-navigation/native';

export default function BasketIcon() {
    const items = useSelector(selectedItem);
    const totalePrice = useSelector(getTotalePrice);
    const navigation = useNavigation();

    if (items.length === 0) return null;

    return (
        <TouchableOpacity
            onPress={() => navigation.navigate("Basket")}
            className="px-2 w-full absolute bottom-5 z-10">
            <View className="flex-row justify-between p-3 items-center rounded w-full bg-[#00CCBB]">
                <Text className="text-lg font-bold text-white px-3 py-2 rounded bg-green-900/50">{items.length}</Text>
                <Text className="text-lg text-white font-bold">View Basket</Text>
                <Text className="text-lg text-white font-bold">{currencyFormatter.format(totalePrice, { locale: 'en-GB' })}</Text>
            </View>
        </TouchableOpacity>
    )
}