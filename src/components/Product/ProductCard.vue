<script setup lang="ts">
import TheButton from '@/components/UI/TheButton.vue';
import FavoriteButton from '@/components/UI/FavoriteButton.vue';

import { IProduct } from '@/Models/Product.ts';
import { useFavoriteStore } from '@/store/favorite.ts';
import { isAdded } from '@/Composables/isFavorited.ts';

const favorite = useFavoriteStore();

const props = defineProps<{
	data: IProduct;
}>();

const addToTheCart = (): void => {};

const addToFavorite = (): void => {
	favorite.addToFavorite(props.data);
};
</script>

<template>
	<div class="product">
		<div class="product__image" @click="$router.push({ name: 'product', params: { id: data.id } })">
			<img :src="data.image" :alt="data.title">
		</div>
		<router-link :to="{ name: 'product', params: { id: data.id } }" class="product__title">
			{{ data.title }}
		</router-link>
		<div class="product__price">
			<div class="label">
				$ {{ data.price.toFixed(2) }}
			</div>
			<favorite-button :is-active="isAdded(data.id)" @click="addToFavorite" />
		</div>
		<the-button @handle-click="addToTheCart">
			<template #icon>
				<img src="@/assets/images/icons/SHOPPING_CART.svg" alt="add to the cart">
			</template>
		</the-button>
	</div>
</template>

<style scoped lang="scss">
.product {
	display: flex;
	flex-direction: column;
	width: 200px;
	min-width: 200px;

	&__image {
		height: 298px;
		max-width: 100%;
		border-radius: 10px;
		overflow: hidden;
		margin-bottom: 14px;
		cursor: pointer;
		background-image: url('@/assets/images/COVER_BOOK.png');
		transition: 0.15s ease-in-out;

		&:hover {
			box-shadow: 10px 12px 10px -6px rgba(61, 60, 60, 0.36);
		}

		img {
			width: 100%;
			height: 100%;
			object-fit: fill;
		}
	}

	&__title {
		font-size: 20px;
		margin-bottom: 10px;
	}

	&__price {
		flex: 1;
		height: fit-content;
		display: flex;
		align-items: self-end;
		gap: 7px;
		margin-bottom: 10px;

		.label {
			flex: 1;
			font-size: 24px;
			padding: 8px;
			border-radius: 20px;
			border: 2px solid $dark;
		}

		.button {
			height: 49px;
		}
	}
}
</style>
