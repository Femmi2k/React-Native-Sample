import { View, Text, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { ArrowRightIcon } from "react-native-heroicons/solid";
import RestaurantCard from "./RestaurantCard";
import sanityClient from "../sanity";

const FeaturedRow = ({ id, title, description }) => {
	const [restaurants, setRestaurants] = useState([]);
	useEffect(() => {
		sanityClient
			.fetch(
				`*[_type == "featured" && _id==$id]{
		...,
		restaurants[]->
	  {...,
		 dishes[]->,
		type->{
		name
	  }
		}
	  }[0]`,
				{ id }
			)
			.then((response) => {
				console.log(response);
				setRestaurants(response?.restaurants);
			});
	}, []);

	return (
		<View>
			<View className="mt-2 flex-row items-center justify-between px-4">
				<Text className="font-bold text-lg">{title}</Text>
				<ArrowRightIcon color={"#00CCBB"} />
			</View>

			<Text className="text-xs text-gray-500 px-4">{description}</Text>

			<ScrollView
				horizontal
				contentContainerStyle={{ paddingHorizontal: 15 }}
				showsHorizontalScrollIndicator={false}
				className="pt-4"
			>
				{/* Restauran Cards */}

				{restaurants.map((each) => (
					<RestaurantCard
						key={each._id}
						id={each._id}
						imgUrl={each.image}
						title={each.name}
						rating={each.rating}
						genre={each.genre}
						address={each.address}
						short_description={each.short_description}
						dishes={each.dishes}
						long={each.long}
						lat={each.lat}
					/>
				))}
			</ScrollView>
		</View>
	);
};
export default FeaturedRow;
