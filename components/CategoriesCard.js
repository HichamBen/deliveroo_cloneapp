import React from "react";
import { Image, Text, TouchableOpacity } from "react-native";
import { urlFor } from "../sanity";



export default function CategoriesCard({ title, imgUrl }) {

    return (
        <TouchableOpacity className="relative mr-2">
            <Image className="w-32 h-28 rounded object-cover" source={{ uri: urlFor(imgUrl).url() }} />
            <Text className="text-white text-xl capitalize font-bold absolute bottom-4 left-2">{title}</Text>

        </TouchableOpacity>)
}

