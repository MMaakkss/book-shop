<script setup lang="ts">
import TheHeader from '@/components/Header/TheHeader.vue';
import TheFooter from '@/components/Footer/TheFooter.vue';

const TheCart = defineAsyncComponent(() => import('@/components/Cart/TheCart.vue'));

import { storeToRefs } from 'pinia';
import { useCartStore } from '@/store/cart.ts';

const cart = useCartStore();

const { isCartOpen } = storeToRefs(cart);
</script>

<template>
	<div class="wrapper">
		<the-header />
		<main>
			<router-view />
		</main>
		<the-footer />
	</div>
	<transition name="slide-right">
		<the-cart v-if="isCartOpen" />
	</transition>
</template>

<style scoped lang="scss">
.wrapper {
	min-height: 100vh;
	display: flex;
	flex-direction: column;

	main {
		flex: 1;
		position: relative;
	}
}

.slide-right-enter-active {
	animation: cartAppear 0.4s ease;
}

.slide-right-leave-active {
	animation: cartDisappear 0.4s ease;
}

@keyframes cartAppear {
	0% {
		position: fixed;
		top: 0;
		bottom: 0;
		right: 0;
		transform: translateX(486px);
	}
	100% {
		position: fixed;
		top: 0;
		bottom: 0;
		right: 0;
		transform: translateX(0);
	}
}


@keyframes cartDisappear {
	0% {
		position: fixed;
		top: 0;
		bottom: 0;
		right: 0;
		transform: translateX(0);
	}
	100% {
		position: fixed;
		top: 0;
		bottom: 0;
		right: 0;
		transform: translateX(486px);
	}
}
</style>
