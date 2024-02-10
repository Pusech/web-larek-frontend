export interface IProductItem {
	id: string;
	description?: string;
	image: string;
	title: string;
	category: string;
	price: number;
}

export type IProduct = IProductItem;

export interface IAppState {
	catalog: IProductItem[];
	basket: string[];
	preview: string | null;
	order: IOrder | null;
	loading: boolean;
}

export interface IProductList {
	total: number;
	items: IProductItem[];
}

export interface IOrderForm {
	payment: string;
	email: string;
	phone: string;
	address: string;
}

export interface IOrder extends IOrderForm {
	total: number;
	items: string[];
}

export interface IOrderResult {
	id: string;
	total: number;
}

export interface IOrderResultError {
	error: string;
}

export type FormErrors = Partial<Record<keyof IOrder, string>>;

export interface ICard extends IProduct {
	index?: string;
	buttonTitle?: string;
}
