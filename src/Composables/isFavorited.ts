import { ComputedRef } from 'vue';
import { useFavoriteStore } from '@/store/favorite.ts';
import { storeToRefs } from 'pinia';

export const isAdded = (id: string) => {
	const favorite = useFavoriteStore();
	const { favoriteProductsId } = storeToRefs(favorite);

	const isBookFavorited: ComputedRef<boolean> = computed(() => favoriteProductsId.value.includes(id));

	return isBookFavorited.value;
};