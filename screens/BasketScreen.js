import { View, Text, SafeAreaView, TouchableOpacity, Image, FlatList, ScrollView } from 'react-native'
import React, { useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getTotalePrice, removeFromBasket, selectedItem } from '../reduxThings/basketSlice'
import { restaurantBasket } from '../reduxThings/restarantSlice';
import { PlusSmIcon } from 'react-native-heroicons/solid';
import { useNavigation } from '@react-navigation/native';
import currencyFormatter from "currency-formatter";


export default function BasketScreen() {

  const items = useSelector(selectedItem);
  const restaurant = useSelector(restaurantBasket);
  const totalePrice = useSelector(getTotalePrice);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const dishesPicked = useMemo(() => {
    const pickedItem = items.reduce((results, item) => {

      (results[item.id] = results[item.id] || []).push(item);

      return results;
    }, {});
    return pickedItem;
  }, [items])


  return (
    <SafeAreaView className="flex-1">
      <View className="bg-white relative py-4 justify-center items-center">
        <View>
          <Text className="text-center text-lg text-black font-bold">Basket</Text>
          <Text className="text-center">{restaurant?.title}</Text>
        </View>
        <TouchableOpacity
          onPress={navigation.goBack}
          className="p-2 bg-[#00CCBB] rounded-full absolute right-4">
          <PlusSmIcon size={32} color="white" />
        </TouchableOpacity>
      </View>

    

        <View className="bg-white flex-row items-center mt-4 p-4">
          <View className="flex-1 flex-row space-x-2">
            <Image className="w-7 h-7 bg-gray-300 rounded-full" source={{ uri: "https://links.papareact.com/wru" }} />
            <Text>Deliver in 50-75 min</Text>
          </View>
          <TouchableOpacity>
            <Text className="text-[#00CCBB]">Change</Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          className="divide-y-2 divide-gray-300 mt-4"
        >
          {Object.entries(dishesPicked).map(([key, dishes]) => (
            <View key={key} className="bg-white flex-row p-4 items-center">

              <View className="flex-1 flex-row items-center space-x-2">
                <Text>{dishes?.length} x</Text>
                <Image className="w-10 h-10 rounded-full" source={{ uri: dishes[0].imgUrl }} />
                <Text className="flex-1">{dishes[0].title}</Text>
              </View>

              <View className="flex-row space-x-2">
                <Text>{currencyFormatter.format(dishes[0].price, { locale: 'en-GB' })}</Text>
                <TouchableOpacity
                  onPress={() => dispatch(removeFromBasket({ id: key }))}
                >
                  <Text className="text-[#00CCBB]">Remove</Text>
                </TouchableOpacity>
              </View>

            </View>

          ))
          }

        </ScrollView>

        <View className="bg-white p-4 mt-8">
          <View className="pb-4 flex-row items-center justify-between">
            <Text>Subtotal</Text>
            <Text>{currencyFormatter.format(totalePrice, { locale: 'en-GB' })}</Text>
          </View>

          <View className="pb-4 flex-row items-center justify-between">
            <Text>Delivery fee</Text>
            <Text>{currencyFormatter.format(5.4, { locale: 'en-GB' })}</Text>
          </View>

          <View className="pb-4 flex-row items-center justify-between">
            <Text className="text-black text-lg font-bold">Order Total</Text>
            <Text className="text-black text-lg font-extrabold">{currencyFormatter.format(totalePrice + 5.4, { locale: 'en-GB' })}</Text>
          </View>

          <TouchableOpacity 
          onPress={() => navigation.navigate("PreparingOrder")}
          className="bg-[#00CCBB] rounded py-2"
          >
            <Text className="text-lg text-white font-bold text-center">Place Order</Text>
          </TouchableOpacity>
        </View>


    </SafeAreaView>
  )

}

