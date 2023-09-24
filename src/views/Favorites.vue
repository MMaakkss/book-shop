<script setup lang="ts">
import ToolBar from '@/components/Catalog/ToolBar.vue';
import EmptyPage from '@/components/UI/EmptyPage.vue';
import FavoriteProduct from '@/components/Product/FavoriteProduct.vue';

import { storeToRefs } from 'pinia';
import { useFavoriteStore } from '@/store/favorite.ts';
import { IProduct } from '@/Models/Product.ts';

const route = useRoute();

const searchValue = ref<string>('');

if (typeof route.query.search === 'string') {
	searchValue.value = route.query.search;
}

const favorite = useFavoriteStore();

const { favoriteProducts } = storeToRefs(favorite);

const updateSearchString = (newValue: string) => {
	searchValue.value = newValue;
};

const bookList = computed(() => {
	if (searchValue.value) {
		return favoriteProducts.value.filter((book: IProduct) => book.title.toLowerCase().includes(searchValue.value.toLowerCase()));
	} else {
		return favoriteProducts.value;
	}
});
</script>

<template>
	<div class="container">
		<tool-bar :search-string="searchValue" @update-search-value="updateSearchString" />

		<div class="products-list">
			<template v-if="bookList.length">
				<favorite-product
					v-for="item in bookList"
					:id="item.id"
					:key="item.id"
					:image="item.image"
				/>
			</template>
			<empty-page v-else title="Favorite some book :)" />
		</div>
	</div>
</template>

<style scoped lang="scss">
.products-list {
	min-height: 50vh;
	display: flex;
	flex-wrap: wrap;
	gap: 20px;
	padding: 70px 0;
	border-top: $border;

	@media (max-width: 1339.99px) {
		gap: 40px;
		justify-content: center;
	}

	@media (max-width: 810px) {
		padding: 44px 0;
	}
}
</style>