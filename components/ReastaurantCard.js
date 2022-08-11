import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { LocationMarkerIcon } from "react-native-heroicons/outline";
import { StarIcon } from "react-native-heroicons/solid";
import { urlFor } from "../sanity";

export default function RestaurantCard({
    imgUrl,
    title,
    rating,
    genre,
    address,
    short_description,
    dishes,
    long,
    lat
}
) {

    const navigation = useNavigation();

    return (
        <TouchableOpacity
            onPress={() => navigation.navigate("Restaurant",
                {
                    imgUrl,
                    title,
                    rating,
                    genre,
                    address,
                    short_description,
                    dishes,
                    long,
                    lat
                }
            )}
            className="rounded shadow mr-2">
            <Image className="w-64 h-36 rounded-t"
                source={{ uri: urlFor(imgUrl).url() }} />

            <View className="py-2 px-3">

                <Text className="mb-1 text-black font-bold">{title}</Text>

                <View className="mb-1 flex-row space-x-1 items-center">
                    <StarIcon size={22} color="green" opacity={0.5} />
                    <Text>
                        <Text className="text-green-600 mr-2">
                            {rating}
                        </Text> &#8226; {genre}
                    </Text>
                </View>
                <View className="flex-row space-x-1 items-center pb-4">
                    <LocationMarkerIcon size={22} color="gray" />
                    <Text>
                        Nearby &#8226; {address}
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    )

}