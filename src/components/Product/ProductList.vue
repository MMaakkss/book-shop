<script setup lang="ts">
import ProductCard from '@/components/Product/ProductCard.vue';

const props = defineProps<{
	title: string;
}>();
</script>

<template>
	<div>
		<h3 class="headline">
			<slot />
			{{ title }}
		</h3>
		<div class="products-list">
			<product-card v-for="n in 5" :key="n" />
		</div>
	</div>
</template>

<style scoped lang="scss">
.headline {
	display: flex;
	gap: 12px;
	font-family: 'Unica One', cursive;
	font-size: 36px;
	margin-bottom: 52px;
}

.products-list {
	display: flex;
	flex-wrap: nowrap;
	gap: 75px;
	padding-bottom: 4px;

	&::-webkit-scrollbar {
		height: 4px;
	}

	&::-webkit-scrollbar-track {
		background: #dadddd;
		border-radius: 10px;
	}

	&::-webkit-scrollbar-thumb {
		background: $blue;
		border-radius: 10px;
	}
}
</style>
