<script setup lang="ts">
import FavoriteButton from '@/components/UI/FavoriteButton.vue';
import TheButton from '@/components/UI/TheButton.vue';
import TheCounter from '@/components/UI/TheCounter.vue';

import { storeToRefs } from 'pinia';
import { useProductStore } from '@/store/product.ts';
import { useFavoriteStore } from '@/store/favorite.ts';
import { useCartStore } from '@/store/cart.ts';
import { isAdded } from '@/Composables/isFavorited.ts';

const route = useRoute();

const product = useProductStore();
const favorite = useFavoriteStore();
const cart = useCartStore();

const { productData } = storeToRefs(product);

product.clearState();

let productAmount = ref<boolean>(1);

const addToFavorite = (): void => {
	favorite.addToFavorite(productData.value);
};

const addToCart = (): void => {
	cart.addToCart(productData.value, productAmount.value);
};

onMounted(() => {
	product.getProductData(route.params.id);
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
		<!--		<product-list title="view more">-->
		<!--			<img src="@/assets/images/icons/PATH.svg" alt="path">-->
		<!--		</product-list>-->
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
				}
			}
		}

		.button {
			max-width: 260px;
			margin-left: auto;
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
		}
	}
}
</style>