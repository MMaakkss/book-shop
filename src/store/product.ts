import { defineStore } from 'pinia';
import { db } from '@/firebase';
import { collection, where, query, documentId, onSnapshot } from 'firebase/firestore';
import { IProduct } from '@/Models/Product.ts';

export const useProductStore = defineStore('product', () => {
	const productData = ref<IProduct | undefined>();

	const router = useRouter();

	function getProductData(id: string): void {
		const booksCollectionsRef = collection(db, 'productsList');
		const booksCollectionsQuery = query(booksCollectionsRef, where(documentId(), '==', id));

		onSnapshot(booksCollectionsQuery, (querySnapshot) => {
			if (!querySnapshot.docs.length) {
				router.push('/');
				return;
			}

			querySnapshot.forEach((doc) => {
				const book: IProduct = {
					id: doc.id,
					...doc.data()
				};

				productData.value = book;
			});
		});
	}

	function clearState(): void {
		productData.value = [];
	}

	return { productData, getProductData, clearState };
});
