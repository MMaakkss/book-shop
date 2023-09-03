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

export interface IProduct extends IProductInfo{
	id: string;
}


