import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, Pressable } from 'react-native'
import currencyFormatter from "currency-formatter";
import { MinusSmIcon, PlusSmIcon } from "react-native-heroicons/outline";
import { useDispatch, useSelector } from "react-redux";
import { addToBasket, removeFromBasket, selectedItem, selectedItemById } from "../reduxThings/basketSlice";


export default function DishCard(
    { id,
        title,
        description,
        imgUrl,
        price, }
) {

    const [isDishPressed, setIsDishPressed] = useState(false);

    const items = useSelector(selectedItem);
    const privateItem = useSelector((state) => selectedItemById(state, id));

    const dispatch = useDispatch();

    function fillBasket() {
        dispatch(addToBasket({ id, title, description, imgUrl, price }));
    }

    function removeItemFromBasket() {
        if (!items.length > 0) return;
        dispatch(removeFromBasket({ id }));
    }

    return (<>
        <TouchableOpacity
            onPress={() => setIsDishPressed(!isDishPressed)}
            className={`bg-white border border-gray-300 pt-4 px-4 ${isDishPressed ? "border-b-0" : ""}`} >

            <View className="flex-row items-center">
                <View className="flex-1 pr-2">
                    <Text className="text-lg text-black">{title}</Text>
                    <Text className="text-xs">{description}</Text>
                </View>
                <Image className="w-20 h-20 rounded" source={{ uri: imgUrl }} />
            </View>

            <Text className="text-lg text-gray-600">{currencyFormatter.format(price, { locale: 'en-GB' })}</Text>
        </TouchableOpacity>

        {isDishPressed && (
            <View className="p-4 bg-white flex-row items-center space-x-2">

                <TouchableOpacity
                     disabled={!privateItem.length > 0}
                    onPress={removeItemFromBasket}
                    className={`p-2 rounded-full ${!privateItem.length > 0 ? " bg-gray-400" : "bg-teal-500"} `}
                >
                    <MinusSmIcon size={24} color="white" />
                </TouchableOpacity>

                <Text className="text-lg">{privateItem.length}</Text>

                <TouchableOpacity
                    onPress={fillBasket}
                    className="p-2 bg-teal-500 rounded-full"

                >
                    <PlusSmIcon size={24} color="white" />
                </TouchableOpacity>
            </View>
        )}

    </>
    )
}