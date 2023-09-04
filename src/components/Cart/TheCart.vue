<script setup lang="ts">
import CartItem from '@/components/Cart/CartItem.vue';
import TheButton from '@/components/UI/TheButton.vue';
</script>

<template>
	<div class="cart">
		<div class="cart__container">
			<div class="cart__headline">
				<img src="@/assets/images/icons/CARET_LEFT.svg" alt="arrow">
				<h3>Your Cart <span>(02 items)</span></h3>
			</div>
			<div class="cart__products">
				<cart-item />
				<cart-item />
			</div>
			<div class="cart__total">
				<div class="cart__total-title">
					<div class="label">
						Subtotal:
					</div>
					<div class="price">
						$60,00
					</div>
				</div>
				<the-button font-size="24px" hover-color="#fdbf0f" back-color="#F9784B">
					<template #title>
						Pay with stripe
					</template>
				</the-button>
			</div>
		</div>
		<div class="cart__background" />
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
