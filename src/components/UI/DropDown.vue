<script setup lang="ts">
import { onClickOutside } from '@vueuse/core';

interface IProps {
	title: string;
	value?: string;
	itemsList: string[];
}

const props = withDefaults(defineProps<IProps>(), {
	value: ''
});

const emit = defineEmits<{
	handleFilter: [value: string];
}>();

const contentWrapRef = ref<HTMLDivElement>(null);
const contentInnerRef = ref<HTMLUListElement>(null);
const placeholderRef = ref<HTMLUListElement>(null);

let isToggled = ref<boolean>(false);
let selectedValue = ref<string>(props.value);

const toggleDropDown = (): void => {
	if (!isToggled.value) {
		openDropDown();
	} else {
		closeDropDown();
	}
};

const openDropDown = (): void => {
	contentWrapRef.value.style.height = contentInnerRef.value.offsetHeight + 'px';
	isToggled.value = true;
};

const closeDropDown = (): void => {
	contentWrapRef.value.style.height = '0';
	isToggled.value = false;
};

const selectValue = (value: string): void => {
	if (value !== selectedValue.value) {
		selectedValue.value = value;
	} else {
		selectedValue.value = "";
	}

	emitSelectedValue();
};

const emitSelectedValue = (): void => {
	emit("handleFilter", selectedValue.value);
	closeDropDown();
}

onClickOutside(contentInnerRef, () => closeDropDown(), { ignore: [placeholderRef] });
</script>

<template>
	<div class="drop-down">
		<div ref="placeholderRef" class="drop-down__placeholder" @click="toggleDropDown">
			<div class="label" :class="{ active: isToggled }">
				{{ title }}
				<div class="icon">
					<img src="@/assets/images/icons/CARET_DOWN.svg" alt="arrow">
				</div>
			</div>
			<span class="decor" />
		</div>
		<div ref="contentWrapRef" class="drop-down__content-wrap">
			<ul ref="contentInnerRef" class="drop-down__content">
				<li
					v-for="item in itemsList"
					:key="item"
					class="item"
					:class="{ selected: selectedValue === item }"
					@click="selectValue(item)"
				>
					{{ item }}
				</li>
			</ul>
		</div>
	</div>
</template>

<style scoped lang="scss">
.drop-down {
	width: 100%;
	position: relative;

	&__placeholder {
		.label {
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 15px 20px 15px 30px;
			border-radius: 20px;
			border: 2px solid $dark;
			background-color: #ffffff;
			position: relative;
			z-index: 2;
			cursor: pointer;
			transition: 0.2s ease-in-out;

			&:hover {
				background-color: $yellow;
			}

			&.active {
				background-color: $yellow;

				.icon {
					transform: rotate(180deg);
				}
			}

			.icon {
				transition: 0.3s ease-in-out;
			}
		}

		.decor {
			position: absolute;
			top: 7px;
			left: 6px;
			width: 100%;
			height: 100%;
			background-color: $orange;
			border-radius: 20px;
			z-index: -1;
		}
	}

	&__content-wrap {
		height: 0;
		overflow: hidden;
		position: absolute;
		left: 0;
		right: 0;
		top: 22px;
		border-radius: 0 0 20px 20px;
		border: 2px solid $dark;
		background-color: #ffffff;
		transition: 0.3s ease-in-out;
	}

	&__content {
		padding-top: 35px;

		.item {
			height: 45px;
			padding: 0 30px;
			display: flex;
			align-items: center;
			cursor: pointer;
			text-transform: capitalize;

			&.selected {
				border-top: 2px solid $dark;
				border-bottom: 2px solid $dark;
				background-color: $blue;
			}
		}
	}
}
</style>
