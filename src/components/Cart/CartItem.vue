<script setup lang="ts">
import TheCounter from '@/components/UI/TheCounter.vue';

import { IProductCart } from '@/Models/Product.ts';
import { useCartStore } from '@/store/cart.ts';

const props = defineProps<{
	data: IProductCart;
}>();

const cart = useCartStore();

const removeItem = () => {
	cart.removeFromCart(props.data.id);
};

const changeAmount = (value: number) => {
	let passedValue: number = 0;

	if (props.data.amount < value) {
		passedValue = 1;
	} else {
		passedValue = -1;
	}

	cart.changeAmount(props.data.id, passedValue);
};
</script>

<template>
	<div class="item">
		<div class="item__image">
			<img :src="data.image" :alt="data.title">
		</div>
		<div class="item__info">
			<h4 class="item__title">
				{{ data.title }}
			</h4>
			<p>{{ data.author }}e</p>
			<the-counter
				:amount="data.amount"
				:max-value="data.quantity"
				@change-amount="changeAmount"
			/>
		</div>
		<div class="item__price">
			<div>$ {{ data.price }}</div>
			<img
				src="@/assets/images/icons/TRASH.svg"
				alt="delete"
				@click="removeItem"
			>
		</div>
	</div>
</template>

<style scoped lang="scss">
.item {
	display: flex;
	gap: 30px;
	padding: 24px;
	border-radius: 20px;
	border: $border;

	&__image {
		width: 100px;
		height: 149px;
		border-radius: 10px;
		overflow: hidden;
		box-shadow: 10px 12px 10px -6px rgba(61, 60, 60, 0.36);
		background-image: url('@/assets/images/COVER_BOOK.png');
		background-size: contain;
		background-repeat: no-repeat;

		img {
			height: 100%;
			width: 100%;
			object-fit: fill;
		}
	}

	&__info {
		flex: 1;
		display: flex;
		flex-direction: column;

		.counter {
			justify-content: flex-start;
			margin-top: auto;
		}
	}

	&__title {
		margin-bottom: 12px;
	}

	&__author {
		font-size: 12px;
	}

	&__price {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: flex-end;
		font-size: 24px;
		color: $orange;

		img {
			height: 32px;
			cursor: pointer;
		}
	}
}
</style>
