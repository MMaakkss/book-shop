<script setup lang="ts">
import TheHeader from '@/components/Header/TheHeader.vue';
import TheFooter from '@/components/Footer/TheFooter.vue';
</script>

<template>
	<div class="wrapper">
		<the-header />
		<main>
			<router-view />
		</main>
		<the-footer />
	</div>
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
</style>
