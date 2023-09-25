<script setup lang="ts">
import FavoriteButton from '@/components/UI/FavoriteButton.vue';
import TheButton from '@/components/UI/TheButton.vue';
import TheCounter from '@/components/UI/TheCounter.vue';
import ProductList from '@/components/Product/ProductList.vue';

import { storeToRefs } from 'pinia';
import { useCatalogStore } from '@/store/catalog.ts';
import { useProductStore } from '@/store/product.ts';
import { useFavoriteStore } from '@/store/favorite.ts';
import { useCartStore } from '@/store/cart.ts';
import { isAdded } from '@/Composables/isFavorited.ts';
import { IProduct } from '@/Models/Product.ts';

const route = useRoute();
const catalog = useCatalogStore();
const product = useProductStore();
const favorite = useFavoriteStore();
const cart = useCartStore();

const { productData } = storeToRefs(product);
const { booksCatalog } = storeToRefs(catalog);

product.clearState();

let productAmount = ref<boolean>(1);

const addToFavorite = (): void => {
	favorite.addToFavorite(productData.value);
};

const addToCart = (): void => {
	cart.addToCart(productData.value, productAmount.value);
};
//
const moreBooks = computed(() => {
	return booksCatalog.value.filter((book: IProduct) => book.id !== route.params.id && book.genre.includes(productData.value.genre[0]))
});

onMounted(() => {
	product.getProductData(route.params.id);

	if (booksCatalog.value.length) return;
	catalog.getCatalogData();
});
</script>

<template>
	<div v-if="productData && Object.keys(productData).length" class="container product">
		<div class="product__info">
			<div class="product__image">
				<img :src="productData.image" :alt="productData.title">
			</div>
			<div class="product__description">
				<h1 class="title">
					{{ productData.title }}
					<favorite-button :is-active="isAdded(productData.id)" @click="addToFavorite" />
				</h1>

				<ul class="details">
					<li class="details__item">
						Author (a): {{ productData.author }}
					</li>
					<li class="details__item">
						Pages: {{ productData.pages }}
					</li>
					<li class="details__item">
						{{ productData.description }}
					</li>
				</ul>

				<div class="product__price">
					<div class="label">
						${{ productData.price.toFixed(2) }}
					</div>
					<the-counter :amount="1" :max-value="productData.quantity" @change-amount="productAmount = $event" />
				</div>
				<the-button
					font-size="20px"
					back-color="#F9784B"
					hover-color="#fdbf0f"
					@click="addToCart"
				>
					<template #title>
						Buy
					</template>
				</the-button>
			</div>
		</div>
		<product-list title="View more" :books-list="moreBooks">
			<img src="@/assets/images/icons/PATH.svg" alt="path">
		</product-list>
	</div>
</template>

<style scoped lang="scss">
.product {
	margin-bottom: 220px;

	&__info {
		display: flex;
		gap: 24px;
		padding: 0 120px;
		margin-bottom: 162px;

		@media (max-width: 900px) {
			flex-direction: column;
			gap: 54px;
		}

		@media (max-width: 815px) {
			padding: 0 80px;
		}

		@media (max-width: 730px) {
			padding: 0;
		}

		@media (max-width: 590px) {
			margin-bottom: 98px;
		}

		@media (max-width: 440px) {
			gap: 36px;
		}
	}

	&__image {
		flex: 1;
		height: fit-content;
		text-align: center;
		padding-top: 24px;
		position: sticky;
		top: 0;

		img {
			max-width: 100%;
			max-height: 450px;
			box-shadow: 10px 12px 10px -6px rgba(61, 60, 60, 0.36);
		}

		@media (max-width: 1135px) {
			flex: 0.5;
		}

		@media (max-width: 900px) {
			padding-top: 0;
			position: static;
		}
	}

	&__description {
		flex: 1;
		height: fit-content;
		position: sticky;
		top: 24px;

		.title {
			display: flex;
			align-items: center;
			justify-content: space-between;
			gap: 16px;
			font-family: 'Unica One', cursive;
			font-size: 36px;
			margin-bottom: 18px;

			.button {
				height: 46px;
			}

			@media (max-width: 900px) {
				flex-direction: column;
				font-size: 24px;
				margin-bottom: 33px;

				.button {
					margin: auto;
				}
			}
		}

		.details {
			padding-right: 10px;

			&__item {
				padding: 23px 26px;
				color: $grey;
				border-radius: 20px;
				border: $border;
				background-color: #ffffff;
				margin-bottom: 24px;
				position: relative;

				&:before {
					content: '';
					position: absolute;
					top: 7px;
					left: 10px;
					width: 100%;
					height: 100%;
					background-color: $grey;
					border-radius: 20px;
					z-index: -1;
				}

				&:last-child {
					margin-bottom: 45px;

					@media (max-width: 900px) {
						margin-bottom: 60px;
					}

					@media (max-width: 590px) {
						font-size: 14px;
					}
				}

				@media (max-width: 900px) {
					margin-bottom: 32px;
				}
				
				@media (max-width: 420px) {
					padding: 20px 18px;
				}
			}
		}

		.button {
			max-width: 260px;
			margin-left: auto;

			@media (max-width: 590px) {
				max-width: unset;
			}
		}
	}

	&__price {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 23px;

		.label {
			font-size: 36px;
			color: $orange;

			@media (max-width: 440px) {
				font-size: 30px;
			}
		}
	}

	@media (max-width: 620px) {
		margin-bottom: 150px;
	}
}
</style>