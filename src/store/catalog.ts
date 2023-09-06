import { defineStore } from 'pinia';
import { db } from '@/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { IProduct, IProductInfo } from '@/Models/Product.ts';

export const useCatalogStore = defineStore('catalog', () => {
	const booksCatalog = ref<IProduct[]>([]);

	async function getCatalogData(): Promise<void> {
		const querySnapshot = await getDocs(collection(db, 'productsList'));

		let queryData: IProduct[] = [];

		querySnapshot.forEach((doc) => {
			const data: IProductInfo = doc.data();

			queryData.push({
				id: doc.id,
				...data
			});
		});

		booksCatalog.value = queryData;
	}

	return { booksCatalog, getCatalogData };
});
