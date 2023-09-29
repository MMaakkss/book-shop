<script setup lang="ts">
import ToolBar from '@/components/Catalog/ToolBar.vue';
import EmptyPage from '@/components/UI/EmptyPage.vue';
import ProductCard from '@/components/Product/ProductCard.vue';
import { IProduct, IFilter } from '@/Models/Product.ts';

import { storeToRefs } from 'pinia';
import { useCatalogStore } from '@/store/catalog.ts';

const catalog = useCatalogStore();
const route = useRoute();

const { booksCatalog } = storeToRefs(catalog);

let searchValue = ref<string>('');
let filterValue = ref<string>('');

if (typeof route.query.search === 'string') {
	searchValue.value = route.query.search;
}

if (typeof route.query.categories === 'string') {
	filterValue.value = route.query.categories;
}

const updateSearchString = (newValue: IFilter) => {
	searchValue.value = newValue.search;
	filterValue.value = newValue.filter;
};

const bookList = computed(() => {
	let list: IProduct[] = booksCatalog.value;

	if (searchValue.value) {
		list = booksCatalog.value.filter((book: IProduct) => book.title.toLowerCase().includes(searchValue.value.toLowerCase()));
	}

	if (filterValue.value) {
		list = list.filter((book: IProduct) => book.genre.includes(filterValue.value));
	}

	return list;
});

onMounted(() => {
	if (booksCatalog.value?.length) return;
	catalog.getCatalogData();
});
</script>

<template>
	<div class="container">
		<tool-bar :search-string="searchValue" @update-search-value="updateSearchString" />

		<div class="products-list">
			<template v-if="bookList?.length">
				<product-card v-for="book in bookList" :key="book.id" :data="book" />
			</template>
			<empty-page v-else title="Nothing was found :\" />
		</div>
	</div>
</template>

<style scoped lang="scss">
.products-list {
	min-height: 50vh;
	display: flex;
	flex-wrap: wrap;
	gap: 75px;
	padding: 70px 0;
	border-top: $border;

	@media (max-width: 1339.99px) {
		gap: 40px;
		justify-content: center;
	}
	
	@media (max-width: 810px) {
		padding: 44px 0;
	}

	@media (max-width: 460px) {
		.product {
			width: 100%;

			:deep(.product__image) {
				background-image: none;

				img {
					object-fit: contain;
				}
			}
		}
	}
}
</style>