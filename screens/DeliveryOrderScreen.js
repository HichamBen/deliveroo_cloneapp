import { View, Text, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { XIcon } from 'react-native-heroicons/solid';
import { useNavigation } from '@react-navigation/native';
import * as Progress from 'react-native-progress';
import { useSelector } from 'react-redux';
import { restaurantBasket } from '../reduxThings/restarantSlice';
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';

export default function DeluveryOrderScreen() {
    const navigation = useNavigation();
    const restaurant = useSelector(restaurantBasket);

    return (
        <SafeAreaView className="flex-1 bg-[#00CCBB]">
            <View className="p-4">
                <View className="flex-1 flex-row items-center">

                    <TouchableOpacity
                        onPress={() => navigation.navigate("Home")}
                        className="flex-1"
                    >
                        <XIcon size={34} color="white" />
                    </TouchableOpacity>

                    <TouchableOpacity>
                        <Text className="text-white text-lg">Order Help</Text>
                    </TouchableOpacity>
                </View>

                <View className="bg-white p-4 rounded mt-5">
                    <Text>Estimated Arrival</Text>

                    <View className="flex-row items-center">
                        <View className="my-4 flex-1">
                            <Text className="text-lg text-black mb-2">45-55 minutes</Text>
                            <Progress.Bar size={32} indeterminate={true} color="#00CCBB" />
                        </View>
                        <Image className="w-20 h-20" source={{ uri: "https://links.papareact.com/fls" }} />
                    </View>

                    <Text className="flex-1 mt-4 text-center">Your order at {restaurant.title} is being prepared</Text>
                </View>
            </View>
            <View className="relative flex-1 bg-white">
                <MapView
                    style={{ flex: 1 }}
                    initialRegion={{
                        latitude: restaurant.lat,
                        longitude: restaurant.long,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}

                >
                    <Marker
                        coordinate={{ latitude: restaurant.lat, longitude: restaurant.long }}
                        title={restaurant.title}
                        description={restaurant.short_description}
                    />

                </MapView>

                <View className="absolute bottom-2 flex-row items-cente bg-white rounded p-4">
                    <View className="flex-row space-x-2 items-center flex-1">
                        <Image className="w-10 h-10" source={{uri:"https://links.papareact.com/wru"}}/>
                        <View>
                            <Text>H.BEN</Text>
                            <Text className="text-lg text-black">Your Rider</Text>
                        </View>
                    </View>
                    <TouchableOpacity>
                        <Text className="text-lg text-[#00CCBB]" >Call</Text>
                    </TouchableOpacity>

                </View>
            </View>

        </SafeAreaView>
    )
}