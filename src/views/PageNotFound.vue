<script setup lang="ts">
import TheButton from '@/components/UI/TheButton.vue';
</script>

<template>
	<div class="page">
		<div class="page__container">
			<div class="gif">
				<img src="../assets/images/gifs/notFound.gif" alt="page not found">
			</div>
			<h1>Something wend wrong</h1>
			<h2>Please, refresh the page or try again later</h2>
			<the-button tag-name="router-link" link="home">
				<template #title>
					Go back to Home
				</template>
			</the-button>
		</div>
	</div>
</template>

<style scoped lang="scss">
.page {
	position: fixed;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	background-color: #ffffff;
	z-index: 5;

	&__container {
		height: 100%;
		max-width: 450px;
		display: grid;
		place-content: center;
		text-align: center;
		margin: auto;

		.gif {
			max-width: 360px;
			margin: auto;

			img {
				width: 100%;
			}
		}

		h1 {
			font-family: 'Unica One', cursive;
		}

		h2 {
			font-size: 24px;
			color: $grey;
			margin: 22px 0;
		}
	}
}
</style>
