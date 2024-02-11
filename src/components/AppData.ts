import _ from 'lodash';
// import {dayjs, formatNumber} from "../utils/utils";

import { Model } from './base/Model';
import {
	FormErrors,
	IAppState,
	IProductItem,
	IOrder,
	IOrderForm,
} from '../types';

export type CatalogChangeEvent = {
	catalog: ProductItem[];
};

export class ProductItem extends Model<IProductItem> {
	description: string;
	id: string;
	image: string;
	title: string;
	category: string;
	price: number;
}

export class AppState extends Model<IAppState> {
	basket: ProductItem[] = [];
	catalog: IProductItem[];
	loading: boolean;

	order: IOrder = {
		email: '',
		phone: '',
		items: [],
		total: 0,
		payment: '',
		address: '',
	};
	preview: string | null;
	formErrors: FormErrors = {};

	clearOrder() {
		this.order = {
			email: '',
			phone: '',
			items: [],
			total: 0,
			payment: '',
			address: '',
		};
		this.emitChanges('order:changed', this.order);
		this.emitChanges('payment:changed', this.order);
	}

	clearBasket() {
		this.basket = [];
		this.order.items = [];
		this.updateBasket();
	}

	addToBasket(item: ProductItem) {
		this.basket.push(item);
		this.updateBasket();
	}

	updateBasket() {
		this.emitChanges('counter:changed', this.basket);
		this.emitChanges('basket:changed', this.basket);
	}

	removeFromBasket(item: ProductItem) {
		this.basket = this.basket.filter((it) => it.id !== item.id);
		this.updateBasket();
	}

	isInBasket(item: ProductItem) {
		return this.basket.find((i) => i === item);
	}

	setCatalog(items: IProductItem[]) {
		this.catalog = items.map((item) => new ProductItem(item, this.events));
		this.emitChanges('items:changed', { catalog: this.catalog });
	}

	setPreview(item: ProductItem) {
		this.preview = item.id;
		this.emitChanges('preview:changed', item);
	}

	setOrderField(field: keyof IOrderForm, value: string) {
		this.order[field] = value;
		console.log(this.order);
		if (this.validateOrder()) {
			this.events.emit('order:ready', this.order);
		}
	}

	setContactsField(field: keyof IOrderForm, value: string) {
		this.order[field] = value;
		console.log(this.order);
		if (this.validateContacts()) {
			this.events.emit('order:ready', this.order);
		}
	}

	setTotal(total: number) {
		this.order.total = total;
	}

	setItems(items: string[]) {
		this.order.items = items;
	}

	setPayment(value: string) {
		this.order.payment = value;
	}

	validateContacts() {
		const errors: typeof this.formErrors = {};
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		const phoneRegex = /^\+(?:[0-9] ?){6,14}[0-9]$/;

		if (!this.order.email) {
			errors.email = 'Необходимо указать email';
		}
		if (!this.order.phone) {
			errors.phone = 'Необходимо указать телефон';
		}

		if (!emailRegex.test(this.order.email)) {
			errors.email =
				'Пожалуйста, введите действительный адрес электронной почты.';
		}

		if (!phoneRegex.test(this.order.phone)) {
			errors.phone = 'Пожалуйста, введите действительный номер телефона.';
		}

		this.formErrors = errors;
		this.events.emit('formErrorsContacts:change', this.formErrors);
		return Object.keys(errors).length === 0;
	}

	validateOrder() {
		const errors: typeof this.formErrors = {};
		const addressRegex = /^[a-zA-Z0-9\s,.'-]+$/;

		if (!this.order.payment) {
			errors.address = 'Необходимо указать способ оплаты';
		}

		if (!this.order.address) {
			errors.address = 'Необходимо указать адрес';
		}

		if (!addressRegex.test(this.order.address)) {
			errors.address = 'Некорректный адрес';
		}

		this.formErrors = errors;
		this.events.emit('formErrors:change', this.formErrors);
		return Object.keys(errors).length === 0;
	}
}
