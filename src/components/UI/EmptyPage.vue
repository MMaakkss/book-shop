<script setup lang="ts">
const props = defineProps<{
	title: string;
}>();
</script>

<template>
	<div class="container">
		<div class="empty-page">
			<img src="@/assets/images/icons/BookOpen.svg" alt="book">
			{{ title }}
		</div>
	</div>
</template>

<style scoped lang="scss">
.empty-page {
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 45px;
	padding-top: 92px;
	font-size: 36px;
	color: $orange;

	@media (max-width: 680px) {
		flex-direction: column;
		gap: 28px;
		padding-top: 40px;
	}

	@media (max-width: 460px) {
		padding-top: 20px;
		font-size: 24px;

		img {
			width: 124px;
		}
	}
}
</style>