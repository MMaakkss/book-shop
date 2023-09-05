<script setup lang="ts">
import CartItem from '@/components/Cart/CartItem.vue';
import TheButton from '@/components/UI/TheButton.vue';

import { IProductCart } from '@/Models/Product.ts';

import { storeToRefs } from 'pinia';
import { useCartStore } from '@/store/cart.ts';

const cart = useCartStore();

const { cartProducts, cartAmount } = storeToRefs(cart);

const closeCart = () => {
	cart.toggleCartWindow();
};

const cartPrice = computed((): number => {
	return cartProducts.value.reduce((acc: number, elem: IProductCart) => acc + elem.price, 0).toFixed(2);
});

const amountOfProducts = computed(() => {
	return cartAmount.value < 10 ? '0' + cartAmount.value : cartAmount.value;
});

watch(cartAmount, () => {
	if (cartAmount.value === 0) closeCart();
});
</script>

<template>
	<div class="cart">
		<div class="cart__container">
			<div class="cart__headline">
				<img src="@/assets/images/icons/CARET_LEFT.svg" alt="arrow" @click="closeCart">
				<h3>Your Cart <span>({{ amountOfProducts }} items)</span></h3>
			</div>
			<h3 v-if="!cartProducts.length" class="cart__empty">
				Cart is empty
			</h3>
			<div v-else class="cart__products">
				<cart-item
					v-for="item in cartProducts"
					:key="item.id"
					:data="item"
				/>
			</div>
			<div class="cart__total">
				<div class="cart__total-title">
					<div class="label">
						Subtotal:
					</div>
					<div class="price">
						${{ cartPrice }}
					</div>
				</div>
				<the-button font-size="24px" hover-color="#fdbf0f" back-color="#F9784B">
					<template #title>
						Pay with stripe
					</template>
				</the-button>
			</div>
		</div>
		<div class="cart__background" @click="closeCart" />
	</div>
</template>

<style scoped lang="scss">
.cart {
	&__container {
		position: fixed;
		top: 0;
		bottom: 0;
		right: 0;
		z-index: 10;
		display: flex;
		flex-direction: column;
		width: 486px;
		padding-top: 50px;
		background-color: #ffffff;
	}

	&__background {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: $grey;
		opacity: 0.3;
	}

	&__headline {
		display: flex;
		align-items: center;
		gap: 12px;
		padding: 0 20px;
		margin-bottom: 33px;

		span {
			color: $blue;
		}

		img {
			cursor: pointer;
		}
	}

	&__empty {
		flex: 1;
		font-size: 24px;
		text-align: center;
		margin-top: 40px;
	}

	&__products {
		flex: 1;
		display: flex;
		flex-direction: column;
		gap: 14px;
		padding: 0 35px 33px;
	}

	&__total {
		padding: 30px;
		border-radius: 20px 0px 0px 0px;
		border-top: 2px solid $dark;
		border-left: 2px solid $dark;
	}

	&__total-title {
		display: flex;
		align-items: center;
		justify-content: space-between;
		font-size: 24px;
		margin-bottom: 38px;

		.price {
			padding: 10px 33px;
			border: 2px solid $dark;
			border-radius: 20px;
			background-color: $yellow;
		}
	}
}
</style>
