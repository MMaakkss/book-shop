<script setup lang="ts">
import ToolBar from '@/components/Catalog/ToolBar.vue';
import EmptyPage from '@/components/UI/EmptyPage.vue';

const route = useRoute();

const searchValue = ref<string>('');

if (typeof route.query.search === 'string') {
	searchValue.value = route.query.search;
}
</script>

<template>
	<div class="container">
		<tool-bar :search-string="searchValue" />

		<div class="products-list">
			<empty-page title="Favorite some book :)" />
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
