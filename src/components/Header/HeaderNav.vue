<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useFavoriteStore } from '@/store/favorite';
import { useCartStore } from '@/store/cart';

const favorite = useFavoriteStore();
const { favoriteAmount } = storeToRefs(favorite);

const cart = useCartStore();
const { cartAmount } = storeToRefs(cart);
</script>

<template>
	<nav class="header-nav">
		<ul class="header-nav__list">
			<li>
				<router-link :to="{ name: 'favorite' }">
					<svg xmlns="http://www.w3.org/2000/svg" width="18" height="25" viewBox="0 0 18 25" fill="none">
						<path
							d="M17 24L9 19L1 24V2C1 1.73478 1.10536 1.48043 1.29289 1.29289C1.48043 1.10536 1.73478 1 2 1H16C16.2652 1 16.5196 1.10536 16.7071 1.29289C16.8946 1.48043 17 1.73478 17 2V24Z"
							stroke="#3D3C3C"
							stroke-width="1.5"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
					</svg>
					<span v-show="favoriteAmount" class="products-amount">
						{{ favoriteAmount }}
					</span>
				</router-link>
			</li>
			<li>
				<svg xmlns="http://www.w3.org/2000/svg" width="29" height="26" viewBox="0 0 29 26" fill="none">
					<path
						d="M11.6875 24C11.6875 24.932 10.932 25.6875 10 25.6875C9.06802 25.6875 8.3125 24.932 8.3125 24C8.3125 23.068 9.06802 22.3125 10 22.3125C10.932 22.3125 11.6875 23.068 11.6875 24Z"
						fill="#3D3C3C"
						stroke="#3D3C3C"
						stroke-width="0.125"
					/>
					<path
						d="M24.6875 24C24.6875 24.932 23.932 25.6875 23 25.6875C22.068 25.6875 21.3125 24.932 21.3125 24C21.3125 23.068 22.068 22.3125 23 22.3125C23.932 22.3125 24.6875 23.068 24.6875 24Z"
						fill="#3D3C3C"
						stroke="#3D3C3C"
						stroke-width="0.125"
					/>
					<path
						d="M5.2875 6H27.7125L24.4125 17.55C24.2948 17.9692 24.0426 18.3381 23.6948 18.6001C23.3471 18.862 22.9229 19.0025 22.4875 19H10.5125C10.0771 19.0025 9.65293 18.862 9.30515 18.6001C8.95738 18.3381 8.70524 17.9692 8.5875 17.55L4.0625 1.725C4.0027 1.51594 3.8764 1.33207 3.70271 1.20125C3.52903 1.07042 3.31744 0.999771 3.1 1H1"
						stroke="#3D3C3C"
						stroke-width="1.5"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
				</svg>
				<span v-show="cartAmount" class="products-amount cart">
					{{ cartAmount }}
				</span>
			</li>
		</ul>
	</nav>
</template>

<style scoped lang="scss">
.header-nav {
	&__list {
		display: flex;
		align-items: center;
		gap: 25px;

		li {
			cursor: pointer;
			position: relative;

			.products-amount {
				width: 12px;
				height: 12px;
				border-radius: 100%;
				background-color: $blue;
				font-size: 8px;
				color: #ffffff;
				text-align: center;
				position: absolute;
				top: -4px;
				right: -4px;

				&.cart {
					top: -2px;
					background-color: $orange;
				}
			}

			&:hover {
				path {
					stroke: $blue;
				}
			}

			path {
				transition: 0.2s ease-in-out;
			}
		}
	}
}
</style>