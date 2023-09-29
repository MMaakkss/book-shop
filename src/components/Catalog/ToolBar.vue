<script setup lang="ts">
import DropDown from '@/components/UI/DropDown.vue';
import SearchInput from '@/components/UI/SearchInput.vue';

import { IFilter } from '@/Models/Product.ts';

interface IProps {
	searchString?: string;
}

const props = withDefaults(defineProps<IProps>(), {
	searchString: ''
});

const emit = defineEmits<{
	updateSearchValue: [value: IFilter];
}>();

const route = useRoute();
const router = useRouter();

let searchValue = ref<string>(props.searchString);

const handleSearch = (value: string): void => {
	const searchValue: string = value.replace(/ +/g, ' ').trim();

	changeRoute({ ...route.query, search: searchValue });
};

const handleFilter = (value: string, sortGroup: string): void => {
	if (sortGroup === 'sort-by') {
		return;
	}

	changeRoute({
		...route.query,
		[sortGroup]: value
	});
};

const changeRoute = (query: Object) => {
	router.push({
		query: query
	});
};

watch(route, () => {
	const routeQuerySearch = route.query.search || '';
	const routeQueryFilter = route.query.categories || '';

	emit('updateSearchValue', {
		search: routeQuerySearch,
		filter: routeQueryFilter
	});

	if (typeof routeQuerySearch === 'string') {
		searchValue.value = routeQuerySearch;
	} else {
		searchValue.value = '';
	}
}, { immediate: true });
</script>

<template>
	<div class="search-input">
		<search-input :search-string="searchValue" @handle-search="handleSearch" />
	</div>
	<div class="toolbar">
		<div v-show="searchValue" class="toolbar__search">
			Results “<span>{{ searchValue }}</span>”
		</div>
		<div class="toolbar__filters">
			<div class="category">
				<drop-down
					title="Categories"
					:value="route.query.categories"
					:items-list="['fiction', 'nonfiction', 'curricula']"
					@handle-filter="handleFilter($event, 'categories')"
				/>
			</div>
			<div class="sorting">
				<drop-down title="Sort By" :items-list="['pages', 'price']" @handle-filter="handleFilter($event, 'sort-by')" />
			</div>
		</div>
	</div>
</template>

<style scoped lang="scss">
.search-input {
	max-width: 530px;
	margin: 0 auto 62px;

	@media (max-width: 830px) {
		margin: 0 auto 30px;
	}
}

.toolbar {
	display: flex;
	justify-content: space-between;
	align-items: center;
	gap: 24px;
	margin-bottom: 37px;
	position: relative;
	z-index: 2;

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
			min-width: 302px;

			@media (max-width: 415px) {
				max-width: unset;
				min-width: 100%;
			}
		}

		.sorting {
			width: 100%;
			max-width: 170px;
			min-width: 170px;
		}

		@media (max-width: 830px) {
			align-self: flex-end;
		}

		@media (max-width: 600px) {
			width: 100%;
			flex-direction: column;
			align-items: flex-end;
		}
	}

	@media (max-width: 830px) {
		flex-direction: column;
		gap: 20px;
		margin-bottom: 34px;
	}
}
</style>