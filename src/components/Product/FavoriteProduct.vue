<script setup lang="ts">
import { useFavoriteStore } from '@/store/favorite.ts';

const props = defineProps<{
	image: string;
	id: string;
}>();

const favorite = useFavoriteStore();

const deleteItem = () => {
	favorite.removeFromFavorite(props.id);
};
</script>

<template>
	<div class="product">
		<router-link :to="{ name: 'product', params: { id: id } }">
			<div class="product__image">
				<img :src="image" alt="book">
			</div>
		</router-link>
		<div class="product__delete">
			<div class="button" @click="deleteItem">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="32"
					height="32"
					viewBox="0 0 32 32"
					fill="none"
				>
					<path
						d="M27 7H5"
						stroke="white"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
					<path
						d="M13 13V21"
						stroke="white"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
					<path
						d="M19 13V21"
						stroke="white"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
					<path
						d="M25 7V26C25 26.2652 24.8946 26.5196 24.7071 26.7071C24.5196 26.8946 24.2652 27 24 27H8C7.73478 27 7.48043 26.8946 7.29289 26.7071C7.10536 26.5196 7 26.2652 7 26V7"
						stroke="white"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
					<path
						d="M21 7V5C21 4.46957 20.7893 3.96086 20.4142 3.58579C20.0391 3.21071 19.5304 3 19 3H13C12.4696 3 11.9609 3.21071 11.5858 3.58579C11.2107 3.96086 11 4.46957 11 5V7"
						stroke="white"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
				</svg>
			</div>
		</div>
	</div>
</template>

<style scoped lang="scss">
.product {
	height: fit-content;
	position: relative;

	&:hover {
		.product__delete {
			height: 80px;
		}
	}

	&__image {
		width: 200px;
		height: 298px;
		background-image: url('@/assets/images/COVER_BOOK.png');

		img {
			width: 100%;
			height: 100%;
			object-fit: fill;
			border-radius: 10px;
			box-shadow: 10px 12px 10px -6px rgba(61, 60, 60, 0.36);
		}

		@media (max-width: 460px) {
			width: 244px;
			height: 355px;
		}
	}

	&__delete {
		height: 0;
		overflow: hidden;
		display: grid;
		place-content: center;
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		background-color: $orange;
		border-radius: 10px;
		opacity: 0.8;
		transition: 0.2s ease-in-out;

		.button {
			cursor: pointer;
		}
	}
}
</style>
