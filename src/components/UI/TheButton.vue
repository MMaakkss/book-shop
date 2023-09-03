<script setup lang="ts">
import { IProps } from '@/Models/Button.ts';

const emit = defineEmits<{
	(e:'handleClick'): void
}>();

const props = withDefaults(defineProps<IProps>(), {
	backColor: '#fdbf0f',
	radius: '20px',
	padding: '11px 20px',
	width: '100%',
	backDecorColor: '#f9784b',
	hoverColor: '#F9784B',
	decorDisplay: 'none',
	tagName: 'button',
	link: '',
	fontSize: '16px'
});

const handleClick = (): void => {
	if (props.tagName === 'button') {
		emit('handleClick');
	}
};
</script>

<template>
	<component
		:is="tagName"
		:to="{ name: link }"
		class="button"
		@click="handleClick"
	>
		<slot name="title" />
		<slot name="icon" />
	</component>
</template>

<style scoped lang="scss">
.button {
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 24px;
	border: 2px solid $dark;
	position: relative;
	transition: 0.2s ease-in-out;

	width: v-bind(width);
	padding: v-bind(padding);
	font-size: v-bind(fontSize);
	background-color: v-bind(backColor);
	border-radius: v-bind(radius);

	&:hover {
		background-color: v-bind(hoverColor);
	}

	&:before {
		content: '';
		position: absolute;
		top: 14px;
		left: 12.5px;
		z-index: -1;
		width: 100%;
		height: 100%;

		display: v-bind(decorDisplay);
		background-color: v-bind(backDecorColor);
		border-radius: v-bind(radius);
	}
}
</style>