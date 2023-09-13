<script setup lang="ts">
import ToolBar from '@/components/Catalog/ToolBar.vue';
import EmptyPage from '@/components/UI/EmptyPage.vue';
import ProductCard from '@/components/Product/ProductCard.vue';
import { IProduct } from '@/Models/Product.ts';

import { storeToRefs } from 'pinia';
import { useCatalogStore } from '@/store/catalog.ts';

const catalog = useCatalogStore();
const route = useRoute();

const { booksCatalog } = storeToRefs(catalog);

let searchValue = ref<string>('');

if (typeof route.query.search === 'string') {
	searchValue.value = route.query.search;
}

const updateSearchString = (newValue: string) => {
	searchValue.value = newValue;
};

const bookList = computed(() => {
	if (searchValue.value) {
		return booksCatalog.value.filter((book: IProduct) => book.title.toLowerCase().includes(searchValue.value.toLowerCase()));
	} else {
		return booksCatalog.value;
	}
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
.search-input {
	max-width: 530px;
	margin: 0 auto 62px;
}

.toolbar {
	display: flex;
	justify-content: space-between;
	align-items: center;
	gap: 24px;
	margin-bottom: 37px;

	&__search {
		font-family: 'Unica One', cursive;
		font-size: 24px;
		text-transform: uppercase;

		span {
			color: $blue;
		}
	}

	&__filters {
		flex: 1;
		display: flex;
		justify-content: flex-end;
		gap: 23px;
		padding-right: 6px;

		.category {
			width: 100%;
			max-width: 302px;
		}

		.sorting {
			width: 100%;
			max-width: 170px;
		}
	}
}

.products-list {
	min-height: 50vh;
	display: flex;
	flex-wrap: wrap;
	gap: 75px;
	padding: 70px 0;
	border-top: $border;
}
</style>