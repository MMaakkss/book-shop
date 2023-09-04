import { defineStore } from 'pinia';
import { ComputedRef } from 'vue';
import { IProduct } from '@/Models/Product.ts';

export const useFavoriteStore = defineStore('favorite', () => {
	const favoriteProducts = ref<IProduct[]>([]);
	const favoriteAmount: ComputedRef<number> = computed((): number => favoriteProducts.value.length);
	const favoriteProductsId: ComputedRef<string[]> = computed((): string[] => {
		return favoriteProducts.value.reduce((acc: string[], book: IProduct) => [...acc, book.id], []);
	});

	//check if there are favorites books
	const storedData: string | null = localStorage.getItem('favorite');
	if (typeof storedData === 'string') {
		favoriteProducts.value = JSON.parse(storedData);
	}

	function addToFavorite(product: IProduct): void {
		if (favoriteProductsId.value.includes(product.id)) {
			removeFromFavorite(product.id);
		} else {
			pushToFavourite(product);
		}
	}

	function removeFromFavorite(id: string): void {
		const newArr: IProduct[] = favoriteProducts.value.filter((book: IProduct) => book.id !== id);

		storeData(newArr);
	}

	const pushToFavourite = (product: IProduct): void => {
		let newArr: IProduct[] = [...favoriteProducts.value, product];
		newArr = [...new Set(newArr)];

		storeData(newArr);
	};

	const storeData = (array: IProduct[]): void => {
		favoriteProducts.value = array;
		localStorage.setItem('favorite', JSON.stringify(array));
	};

	return { favoriteProducts, favoriteAmount, favoriteProductsId, addToFavorite, removeFromFavorite };
});
