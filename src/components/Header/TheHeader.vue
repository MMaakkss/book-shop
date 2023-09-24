<script setup lang="ts">
import HeaderNav from '@/components/Header/HeaderNav.vue';
</script>

<template>
	<header class="header">
		<div class="container">
			<router-link class="header__logo" :to="{ name: 'home' }">
				<img src="@/assets/images/icons/BOOK_OPEN.svg" alt="logo">
				<span>
					BookStore
				</span>
			</router-link>
			<header-nav />
		</div>
	</header>
</template>

<style lang="scss" scoped>
.header {
	height: 154px;

	.container {
		height: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 24px;
	}

	&__logo {
		display: flex;
		align-items: center;
		gap: 12px;
		font-size: 20px;

		@media (max-width: 320px) {
			span {
				display: none;
			}
		}
	}
}
</style>