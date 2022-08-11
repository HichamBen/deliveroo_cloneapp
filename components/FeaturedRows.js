import React, { useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";
import { ArrowRightIcon } from "react-native-heroicons/solid";
import RestaurantCard from "./ReastaurantCard";
import sanityClient from "../sanity";


export default function FeaturedRows({ id, title, description }) {
    const [restaurants, setRestaurants] = useState([]);

    useEffect(() => {
        sanityClient.fetch(`
        *[_type== "featured" && _id == $id]
            {...,
                restaurants[]->
            {...,
                dishes[]->,
                type-> {
                    name
                } 
            },
        }[0]`,{id})
            .then(data => {

                setRestaurants(data?.restaurants)
            })
    }, [id])

    return (
        <View>
            <View className="px-4">
                <View className="flex-row justify-between items-center">
                    <Text className="font-bold text-black text-lg">{title}</Text>
                    <ArrowRightIcon size={24} color="#00CCBB" />
                </View>
                <Text>{description}</Text>
            </View>
            <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                    paddingHorizontal: 15,
                    paddingVertical: 10,
                }}
                data={restaurants}
                renderItem={({ item }) => (
                    <RestaurantCard
                        key={item._id}
                        title={item.name}
                        imgUrl={item.image}
                        rating={item.rating}
                        genre={item.type?.name}
                        address={item.address}
                        short_description={item.short_description}
                        dishes={item.dishes}
                        long={item.long}
                        lat={item.lat}
                    />)
                }

            />
        </View>
    )

}