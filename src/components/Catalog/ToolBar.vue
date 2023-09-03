<script setup lang="ts">
import DropDown from '@/components/UI/DropDown.vue';
import SearchInput from '@/components/UI/SearchInput.vue';

interface IProps {
	searchString?: string;
}

const props = withDefaults(defineProps<IProps>(), {
	searchString: ''
});

const route = useRoute();
const router = useRouter();

let searchValue = ref<string>(props.searchString);

const handleSearch = (value: string): void => {
	const searchValue: string = value.replace(/ +/g, ' ').trim();

	if (searchValue.length < 3) {
		router.push({});
		return;
	}

	router.push({ query: { search: searchValue } });
};

watch(
	route,
	() => {
		const routeQuery = route.query.search;

		if (typeof routeQuery === 'string') {
			searchValue.value = routeQuery;
		} else {
			searchValue.value = '';
		}
	},
	{ immediate: true }
);
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
				<drop-down />
			</div>
			<div class="sorting">
				<drop-down />
			</div>
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
</style>
