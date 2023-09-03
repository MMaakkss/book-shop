<script setup lang="ts">
interface IProps {
	amount: number;
	maxValue: number;
}

const props = withDefaults(defineProps<IProps>(), {
	amount: 1,
	maxValue: 1
});

const emit = defineEmits<{
	changeAmount: [value: number];
}>();

let productAmount = ref<number>(props.amount);

const getCounterLabel = computed(() => {
	return productAmount.value < 10 ? '0' + productAmount.value : productAmount.value;
});

const minus = (): void => {
	if (productAmount.value <= 1) return;

	productAmount.value--;
};

const plus = (): void => {
	if (productAmount.value >= props.maxValue) return;

	productAmount.value++;
};

watch(productAmount, () => {
	emit('changeAmount', productAmount.value);
});
</script>

<template>
	<div class="counter">
		<div class="counter__item minus" :class="{ active: productAmount > 1 }" @click="minus">
			<span />
		</div>
		<div class="counter__count">
			{{ getCounterLabel }}
		</div>
		<div class="counter__item plus" :class="{ active: productAmount < maxValue }" @click="plus">
			<span />
			<span />
		</div>
	</div>
</template>

<style scoped lang="scss">
.counter {
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 10px;

	&__count {
		width: 44px;
		height: 100%;
		display: grid;
		place-content: center;
		font-size: 20px;
		font-weight: 700;
		border: 2px solid $dark;
		border-radius: 8px;
	}

	&__item {
		width: 24px;
		height: 24px;
		border: 2px solid $dark;
		border-radius: 100%;
		position: relative;

		&.active {
			cursor: pointer;
		}

		span {
			display: block;
			width: 9px;
			height: 2px;
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			background: $dark;
			border-radius: 4px;
		}

		&.plus {
			span:last-child {
				transform: translate(-50%, -50%) rotate(90deg);
			}
		}
	}
}
</style>
