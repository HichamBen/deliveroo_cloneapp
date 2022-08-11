import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { Image, SafeAreaView, ScrollView, Text, TextInput, View } from "react-native";
import { AdjustmentsIcon, ChevronDownIcon, SearchIcon, UserIcon } from "react-native-heroicons/outline";
import Categories from "../components/Categories";
import FeaturedRows from "../components/FeaturedRows";
import sanityClient from "../sanity";

export default function Home() {
    const navigation = useNavigation();
    const [featuredCategory, setFeaturedCategory] = useState([]);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        })
    }, [])

    useEffect(() => {
        sanityClient.fetch(`*[_type== "featured"]{...,restaurants[]->{...,dishes[]-> }}`)
            .then(data => {

                setFeaturedCategory(data)
            })
    }, [])


    return (
        <SafeAreaView className="flex-1 bg-white">
            {/* Header */}
            <View className="flex-row items-center justify-between pt-4 px-4">
                <View className="flex-row space-x-2 items-center">
                    <Image className="w-7 h-7 bg-gray-300 rounded-full" source={{ uri: "https://links.papareact.com/wru" }} />
                    <View>
                        <Text className="font-bold text-gray-400">Deliver Now!</Text>
                        <Text className="text-xl text-black font-bold align-middle">
                            Current Location
                            <ChevronDownIcon size={20} color="#00CCBB" />
                        </Text>
                    </View>
                </View>

                <UserIcon size={30} color="#00CCBB" />
            </View>

            <View className="flex-row items-center space-x-2 px-4 py-3">
                <View className="flex-1 flex-row space-x-2 items-center px-3 bg-gray-300">
                    <SearchIcon color="gray" />
                    <TextInput
                        placeholder="Restaurants and cuisines"
                        keyboardType="default"
                    />
                </View>

                <AdjustmentsIcon size={30} color="#00CCBB" />
            </View>


            <ScrollView
            >
                {/* categories */}
                <Categories />

                {/* featured rows */}
                {/* featured */}

                {featuredCategory?.map(category => (
                    <FeaturedRows
                        key={category._id}
                        id={category._id}
                        title={category.name}
                        description={category.short_description}
                        featuredCategory={[]}
                    />

                ))}

            </ScrollView>


        </SafeAreaView >


    )
}


// https://images.immediate.co.uk/production/volatile/sites/30/2020/12/Noodles-with-chilli-oil-eggs-6ec34e9.jpg