import { defineStore } from 'pinia';
import { ComputedRef } from 'vue';
import { IProduct, IProductCart } from '@/Models/Product.ts';

export const useCartStore = defineStore('cart', () => {
	const cartProducts = ref<IProductCart[]>([]);
	const isCartOpen = ref<boolean>(false);

	const cartAmount: ComputedRef<number> = computed((): number => cartProducts.value.length);
	const cartProductsId: ComputedRef<string[]> = computed((): string[] => {
		return cartProducts.value.reduce((acc: string[], book: IProductCart) => [...acc, book.id], []);
	});

	//check if there are carts books
	const storedData: string | null = localStorage.getItem('cart');
	if (typeof storedData === 'string') {
		cartProducts.value = JSON.parse(storedData);
	}

	function addToCart(product: IProduct, amount: number): void {
		toggleCartWindow();

		if (cartProductsId.value.includes(product.id)) {
			changeAmount(product.id, amount);
		} else {
			pushToCart({
				...product,
				amount: amount
			});
		}
	}

	function changeAmount(productId: string, amount: number): void {
		const newArr = cartProducts.value.map((book: IProductCart) => {
			if (book.id !== productId) return book;

			let newAmount = book.amount + amount;

			if (newAmount <= book.quantity) {
				book.amount = newAmount;
				
			} else {
				book.amount = book.quantity;
			}

			return book;
		});

		storeData(newArr);
	}

	function removeFromCart(id: string): void {
		const newArr: IProductCart[] = cartProducts.value.filter((book: IProductCart) => book.id !== id);

		storeData(newArr);
	}

	const pushToCart = (product: IProductCart): void => {
		let newArr: IProductCart[] = [...cartProducts.value, product];

		storeData(newArr);
	};

	function toggleCartWindow(): void {
		isCartOpen.value = !isCartOpen.value;
	}

	const storeData = (array: IProductCart[]): void => {
		cartProducts.value = array;
		localStorage.setItem('cart', JSON.stringify(array));
	};

	return { isCartOpen, cartProducts, cartAmount, addToCart, removeFromCart, changeAmount, toggleCartWindow };
});
