import { defineStore } from 'pinia';
import { db } from '@/firebase';
import { collection, getDocs, FirestoreDataConverter, PartialWithFieldValue, QueryDocumentSnapshot, DocumentData } from 'firebase/firestore';
import {IProduct, IProductInfo} from "@/Models/Product.ts";

export const useCatalogStore = defineStore('catalog', () => {
	const booksCatalog = ref<IProduct[]>([]);

	const converter = <T>(): FirestoreDataConverter<T> => ({
		toFirestore: (data: PartialWithFieldValue<T>) => data as DocumentData,
		fromFirestore: (snap: QueryDocumentSnapshot<DocumentData>) =>
			snap.data() as T,
	});

	async function getCatalogData(): Promise<void> {
		const querySnapshot = await getDocs(collection(db, 'productsList').withConverter( converter<IProductInfo>()));

		let queryData: IProduct[] = [];

		querySnapshot.forEach((doc): void => {
			const data = doc.data();

			queryData.push({
				id: doc.id,
				...data
			});
		});

		booksCatalog.value = queryData;
	}

	return { booksCatalog, getCatalogData };
});
