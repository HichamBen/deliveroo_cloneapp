import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect, useLayoutEffect } from "react";
import { View, Text, Image, TouchableOpacity, ScrollView, FlatList } from "react-native";
import { ChevronRightIcon, LocationMarkerIcon, QuestionMarkCircleIcon } from "react-native-heroicons/outline";
import { ArrowLeftIcon, StarIcon } from "react-native-heroicons/solid";
import { urlFor } from "../sanity";
import DishCard from "../components/DishCard";
import BasketIcon from "../components/BasketIcon";
import { useDispatch } from "react-redux";
import { setRestaurant } from "../reduxThings/restarantSlice";


export default function RestaurantScreen() {
    const { params: {
        imgUrl,
        title,
        rating,
        genre,
        address,
        short_description,
        dishes,
        long,
        lat
    } } = useRoute();
    const navigate = useNavigation();

    const dispatch = useDispatch();

    useLayoutEffect(() => {
        navigate.setOptions({
            headerShown: false,
        })
    }, [])

    useEffect(() => {
        dispatch(setRestaurant({
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
        ))
    }, [])

    return (
        <>
            <BasketIcon />
            <ScrollView
                contentContainerStyle={
                    {
                        paddingBottom: 100
                    }
                }
            >
                <View className="relative">
                    <Image className="w-full h-52" source={{ uri: urlFor(imgUrl).url() }} />
                    <TouchableOpacity
                        onPress={navigate.goBack}
                        className="p-4 bg-white rounded-full absolute top-5 left-5">
                        <ArrowLeftIcon size={20} color="#00CCBB" />
                    </TouchableOpacity>
                </View>

                <View className="p-4 bg-white">
                    <Text className="text-black font-bold text-2xl mb-1">{title}</Text>

                    <View className="flex-row space-x-2 items-center mb-4">
                        <View className="flex-row space-x-1 items-center">
                            <StarIcon size={22} color="green" opacity={0.5} />
                            <Text>{rating} &#8226; {genre}</Text>
                        </View>
                        <View className="flex-row space-x-1 items-center">
                            <LocationMarkerIcon size={20} color="gray" />
                            <Text>{address}</Text>
                        </View>
                    </View>
                    <Text>{short_description}</Text>
                </View>

                <TouchableOpacity className="bg-white flex-row justify-between p-4 border border-gray-200">
                    <View className="flex-row space-x-3 items-center">
                        <QuestionMarkCircleIcon size={20} color="gray" />
                        <Text className="text-black">Have a food allergy?</Text>
                    </View>
                    <ChevronRightIcon size={22} color="#00CCBB" />
                </TouchableOpacity>

                <Text className="p-4 text-lg text-black font-bold">Menu</Text>

                {dishes?.map((dish) => (
                    <DishCard
                        key={dish._id}
                        id={dish._id}
                        title={dish.name}
                        description={dish.short_description}
                        imgUrl={urlFor(dish.image).url()}
                        price={dish.price}
                    />

                ))}

            </ScrollView>
        </>
    )
}