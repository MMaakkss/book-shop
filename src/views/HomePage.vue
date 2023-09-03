<script setup lang="ts">
import SearchInput from '@/components/UI/SearchInput.vue';
import TheButton from '@/components/UI/TheButton.vue';
// import ProductList from '@/components/Product/ProductList.vue';

const router = useRouter();

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

		<!--		<section class="section books">-->
		<!--			<product-list title="Romance">-->
		<!--				<img src="@/assets/images/icons/PATH.svg" alt="path">-->
		<!--			</product-list>-->
		<!--		</section>-->
		<!--		<section class="section books">-->
		<!--			<product-list title="Adventure">-->
		<!--				<img src="@/assets/images/icons/PATH.svg" alt="path">-->
		<!--			</product-list>-->
		<!--		</section>-->
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
	}

	&.books {
		margin-bottom: 85px;

		&:last-child {
			margin-bottom: 220px;
		}

		.section__title {
			margin-bottom: 52px;
		}
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
	}

	&__title {
		font-size: 64px;
		margin-bottom: 18px;
		position: relative;

		.gif {
			width: 141px;
			position: absolute;
			top: 65px;
		}
	}

	&__description {
		color: $grey;
		margin-bottom: 34px;
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
	}

	&__image {
		position: relative;
		padding-top: 35px;

		img {
			position: relative;
			border-radius: 0 20px;
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
	}
}
</style>
