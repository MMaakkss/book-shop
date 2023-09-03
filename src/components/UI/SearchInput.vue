<script setup lang="ts">
interface IProps {
	searchString?: string;
}

const emit = defineEmits<{
	handleSearch: [value: string];
}>();

const props = withDefaults(defineProps<IProps>(), {
	searchString: ''
});

let inputValue = ref<string>(props.searchString);
let loading = ref<boolean>(false);

watch(inputValue, () => {
	loading.value = true;

	if (window.timeoutId) {
		window.clearTimeout(timeoutId);
	}

	window.timeoutId = setTimeout(() => {
		emit('handleSearch', inputValue.value);
		loading.value = false;
	}, 1000);
});

watch(() => props.searchString, (first: string) => {
	inputValue.value = first;
});
</script>

<template>
	<div class="input-wrapper">
		<input v-model="inputValue" class="input" placeholder="Type the name of book or author...">
		<div v-show="loading" class="loader-wrap">
			<span class="loader" />
		</div>
		<img
			v-show="!loading"
			class="icon"
			src="@/assets/images/icons/MAGNIFYING_GLASS.svg"
			alt="search"
		>
	</div>
</template>

<style scoped lang="scss">
.input-wrapper {
	position: relative;

	&:before {
		content: '';
		position: absolute;
		top: 10px;
		left: 5px;
		width: 100%;
		height: 100%;
		background-color: $yellow;
		border-radius: 20px;
		z-index: -1;
	}

	.input {
		width: 100%;
		padding: 13px 50px 13px 20px;
		border-radius: 20px;
		border: 2px solid $dark;

		&:focus {
			outline: none;
		}
	}

	.icon, .loader-wrap {
		position: absolute;
		right: 28px;
		top: 50%;
		transform: translateY(-50%);
	}

	.loader-wrap {
		display: flex;

		.loader {
			width: 20px;
			height: 20px;
			border: 1.5px solid $dark;
			border-bottom-color: transparent;
			border-radius: 50%;
			display: inline-block;
			box-sizing: border-box;
			animation: rotation 1s linear infinite;
		}
	}
}

@keyframes rotation {
	0% {
		transform: rotate(0deg);
	}
	100% {
		transform: rotate(360deg);
	}
}
</style>