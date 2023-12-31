export interface IProductInfo {
	title: string;
	author: string;
	description: string;
	genre: string;
	image: string;
	pages: number;
	price: number;
	quantity: number;
}

export interface IFilter {
	search: string;
	filter: string;
}

export interface IProduct extends IProductInfo {
	id: string;
}

export interface IProductCart extends IProductInfo {
	id: string;
	amount: number;
}
