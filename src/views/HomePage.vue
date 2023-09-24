<script setup lang="ts">
import SearchInput from '@/components/UI/SearchInput.vue';
import TheButton from '@/components/UI/TheButton.vue';
import ProductList from '@/components/Product/ProductList.vue';

import { storeToRefs } from 'pinia';
import { useCatalogStore } from '@/store/catalog.ts';
import { IProduct } from '@/Models/Product.ts';

const router = useRouter();

const catalog = useCatalogStore();

const { booksCatalog } = storeToRefs(catalog);

const handleSearch = (searchString: string = ''): void => {
	if (searchString.length < 3) return;

	router.push({ name: 'catalog', query: { search: searchString } });
};

const navigateToCatalogSection = (catalogSection: string = ''): void => {
	if (catalogSection) {
		router.push({ name: 'catalog', query: { section: catalogSection } });
	} else {
		router.push({ name: 'catalog' });
	}
};

const getFiction = computed(() => {
	return booksCatalog.value.filter((book: IProduct) => book.genre.includes('fiction'));
});
const getNonFiction = computed(() => {
	return booksCatalog.value.filter((book: IProduct) => book.genre.includes('nonfiction'));
});
const getCurricula = computed(() => {
	return booksCatalog.value.filter((book: IProduct) => book.genre.includes('curricula'));
});

onMounted(() => {
	if (booksCatalog.value.length) return;
	catalog.getCatalogData();
});
</script>

<template>
	<div class="container">
		<section class="preview section">
			<div class="preview__info">
				<h1 class="preview__title">
					What book you looking for?
					<img class="gif" src="@/assets/images/gifs/book-gif.gif" alt="book">
				</h1>
				<p class="preview__description">
					Explore our catalog and find your next read.
				</p>
				<search-input @handle-search="handleSearch" />
				<div class="preview__explore">
					<the-button
						radius="10px"
						padding="16px 28px"
						width="fit-content"
						tag-name="router-link"
						link="catalog"
					>
						<template #title>
							Explore
						</template>
						<template #icon>
							<img src="@/assets/images/icons/Binoculars.svg" alt="Binoculars">
						</template>
					</the-button>
					<div class="dash-line" />
				</div>
			</div>
			<div class="preview__image">
				<img src="@/assets/images/homePage/preview.jpg" alt="preview">
			</div>
		</section>

		<section class="section">
			<h3 class="section__title">
				<img src="@/assets/images/icons/FOLDER_NOTCH_OPEN.svg" alt="path">
				Categories
			</h3>
			<div class="categories-list">
				<the-button
					v-for="n in 6"
					:key="n"
					hover-color="#fdbf0f"
					back-color="#ffffff"
					decor-display="block"
					radius="10px"
					padding="26px 10px"
					font-size="24px"
					@handle-click="navigateToCatalogSection"
				>
					<template #title>
						Adventure
					</template>
				</the-button>
			</div>
		</section>

		<section class="section books">
			<product-list title="Fiction" :books-list="getFiction">
				<img src="@/assets/images/icons/PATH.svg" alt="path">
			</product-list>
		</section>
		<section class="section books">
			<product-list title="Non Fiction" :books-list="getNonFiction">
				<img src="@/assets/images/icons/PATH.svg" alt="path">
			</product-list>
		</section>
		<section class="section books">
			<product-list title="Curricula" :books-list="getCurricula">
				<img src="@/assets/images/icons/PATH.svg" alt="path">
			</product-list>
		</section>
	</div>
</template>

<style scoped lang="scss">
.section {
	margin-bottom: 220px;

	&__title {
		display: flex;
		gap: 12px;
		font-family: 'Unica One', cursive;
		font-size: 36px;
		margin-bottom: 75px;

		@media (max-width: 850px) {
			margin-bottom: 32px;
		}
	}

	&.books {
		margin-bottom: 85px;

		&:last-child {
			margin-bottom: 220px;

			@media (max-width: 850px) {
				margin-bottom: 120px;
			}
		}
	}

	@media (max-width: 850px) {
		margin-bottom: 120px;
	}
}

.preview {
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
	align-items: center;
	gap: 62px;

	&__info {
		max-width: 480px;

		@media (max-width: 960px) {
			max-width: unset;
		}

		@media (max-width: 850px) {
			width: 100%;
		}
	}

	&__title {
		font-size: 64px;
		margin-bottom: 18px;
		position: relative;

		.gif {
			width: 141px;
			position: absolute;
			top: 65px;

			@media (max-width: 960px) {
				width: 90px;
				top: 60px;
				right: 20px;
			}

			@media (max-width: 850px) {
				width: 120px;
				top: 0;
			}

			@media (max-width: 760px) {
				width: 80px;
				top: 50px;
			}

			@media (max-width: 635px) {
				width: 90px;
				top: 15px;
			}

			@media (max-width: 590px) {
				width: 70px;
				top: 32px;
				right: 10px;
			}
		}

		@media (max-width: 850px) {
			font-size: 48px;
		}

		@media (max-width: 635px) {
			font-size: 36px;
		}

		@media (max-width: 590px) {
			max-width: 271px;
		}
	}

	&__description {
		color: $grey;
		margin-bottom: 34px;

		@media (max-width: 350px) {
			font-size: 14px;
			margin-bottom: 24px;
		}
	}

	&__explore {
		display: flex;
		align-items: center;
		gap: 24px;
		margin-top: 34px;

		.dash-line {
			flex: 1;
			border: $border;
		}
		
		@media (max-width: 450px) {
			flex-direction: column;

			.button {
				width: 100%;
			}

			.dash-line {
				width: 100%;
			}
		}
	}

	&__image {
		position: relative;
		padding-top: 35px;

		img {
			position: relative;
			border-radius: 0 20px;

			@media (max-width: 1160px) {
				max-width: 320px;
			}
		}

		&:before {
			content: '';
			position: absolute;
			top: 0;
			left: -42px;
			width: 100%;
			height: calc(100% - 35px);
			background-color: $blue;
			border-radius: 0 20px;
		}

		@media (max-width: 960px) {
			display: none;
		}
	}

	@media (max-width: 960px) {
		justify-content: center;
	}
}

.categories-list {
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
	column-gap: 62px;
	row-gap: 50px;

	.button {
		flex: 1 0 30%;

		@media (max-width: 590px) {
			flex: unset;
		}
	}

	@media (max-width: 760px) {
		column-gap: 40px;
		row-gap: 38px;

		.button {
			padding: 18px 10px;
		}
	}
}
</style>
