import React, { useEffect, useState } from "react";
import { FlatList } from "react-native";
import CategoriesCard from "./CategoriesCard";
import sanityClient from "../sanity";


export default function Categories() {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        sanityClient.fetch(`*[_type== "category"]`)
            .then(data => {
                setCategories(data)
            })
    }, [])

    return (
        <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
                paddingHorizontal: 15,
                paddingVertical: 10,
            }}
            data={categories}
            renderItem={({ item }) => (
                <CategoriesCard key={item._id} title={item.name} imgUrl={item.image} />
            )
            }

        />
    )
}