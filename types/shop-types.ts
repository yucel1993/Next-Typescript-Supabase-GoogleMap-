export type Product = {
	id: number;
	title: string;
	price: number;
	description: string;
	category: string;
	image: string;
	rating: {
		rate: number;
		count: number;
	};
};

/* Typ Product anlegen und exportieren */

// export type Product = {
// 	id:      	number;
// 	title:   	string;
// 	price:   	number;
// 	description: string;
// 	category:	Category;
// 	image:   	string;
// 	rating:  	Rating;
// }

// export type Category = "men's clothing" | "jewelery" | "electronics" | "women's clothing";

// export type Rating = {
// 	rate:  number;
// 	count: number;
// }
