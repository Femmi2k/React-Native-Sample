import { View, Text, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import CategoryCard from "./CategoryCard";
import sanityClient, { urlFor } from "../sanity";

const Categories = () => {
	const [categories, setCategories] = useState([]);
	useEffect(() => {
		sanityClient.fetch(`*[_type == "category"]`).then((response) => {
			setCategories(response);
		});
	}, []);

	return (
		<ScrollView
			horizontal
			showsHorizontalScrollIndicator={false}
			contentContainerStyle={{ paddingHorizontal: 15, paddingTop: 10 }}
		>
			{/* Category Card */}
			{categories.map((each) => (
				<CategoryCard key={each._id} imgUrl={each.image} title={each.name} />
			))}
		</ScrollView>
	);
};

export default Categories;
