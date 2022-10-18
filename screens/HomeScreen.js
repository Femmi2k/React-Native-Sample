import {
	View,
	Text,
	SafeAreaView,
	Image,
	StatusBar,
	TextInput,
	ScrollView,
} from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {
	ChevronDownIcon,
	UserIcon,
	AdjustmentsVerticalIcon,
	MagnifyingGlassIcon,
} from "react-native-heroicons/outline";

import Categories from "../components/Categories";
import FeaturedRow from "../components/FeaturedRow";
import sanityClient from "../sanity";

const HomeScreen = () => {
	const navigation = useNavigation();
	const [featuredCategories, setFeaturedCategories] = useState([]);
	useLayoutEffect(() => {
		navigation.setOptions({
			headerShown: false,
		});
	}, []);

	useEffect(() => {
		sanityClient
			.fetch(
				`*[_type == "featured"]{
			...,
			restaurants[]->
		  {...,
			 dishes[]->,
			type->{
			name
		  }
			}
		  }`
			)
			.then((response) => {
				setFeaturedCategories(response);
			});
	}, []);

	return (
		<SafeAreaView
			style={{
				flex: 1,
				paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
			}}
			className="bg-white"
		>
			{/* Header */}
			<View className="flex-row pb-3 items-center mx-2 px-2 space-x-2">
				<Image
					source={{
						uri: "https://static.vecteezy.com/system/resources/thumbnails/001/546/003/small/indian-woman-s-face-avatar-free-vector.jpg",
					}}
					className="h-7 w-7 bg-grey-300 p-4 rounded-full"
				/>
				<View className="flex-1">
					<Text className="font-bold text-gray-400 text-xs">Deliver Now</Text>
					<Text className="font-bold text-xl">
						Current Location
						<ChevronDownIcon size={20} color={"#00CCBB"} />
					</Text>
				</View>
				<UserIcon size={35} color="#00CCBB" />
			</View>
			{/* Search */}
			<View className="flex-row items-center space-x-2 pb-2 px-2 mx-2">
				<View className="flex-row space-x-2 bg-gray-200 flex-1 p-1 items-center">
					<MagnifyingGlassIcon color={"gray"} size={20} />
					<TextInput
						placeholder="Restaurants and Cuisines"
						keyboardType="default"
					/>
				</View>
				<AdjustmentsVerticalIcon color={"#00CCBB"} />
			</View>
			<ScrollView className="bg-gray-200">
				{/* Categories */}
				<Categories />
				{/* Featured Rows */}
				{featuredCategories?.map((category) => (
					<FeaturedRow
						key={category._id}
						id={category._id}
						title={category.name}
						description={category.short_description}
					/>
				))}
			</ScrollView>
		</SafeAreaView>
	);
};

export default HomeScreen;
