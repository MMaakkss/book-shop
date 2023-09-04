<script setup lang="ts">
import TheCounter from '@/components/UI/TheCounter.vue';
</script>

<template>
	<div class="item">
		<div class="item__image" />
		<div class="item__info">
			<h4 class="item__title">
				Book name
			</h4>
			<p>Author name</p>
			<the-counter :amount="1" :max-value="2" />
		</div>
		<div class="item__price">
			<div>$30,00</div>
			<img src="@/assets/images/icons/TRASH.svg" alt="delete">
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
