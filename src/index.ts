import './scss/styles.scss';
import { EventEmitter } from './components/base/events';
import { cloneTemplate, createElement, ensureElement } from './utils/utils';
import { ShopAPI } from './components/shopAPI';
import { API_URL, CDN_URL } from './utils/constants';
import {
	AppState,
	CatalogChangeEvent,
	ProductItem,
} from './components/AppData';
import { Page } from './components/Page';
import { Modal } from './components/common/Modal';
import { CardItem } from './components/Card';
import { Basket } from './components/common/Basket';
import { Contacts, Order } from './components/Order';
import { Success } from './components/common/Success';
import { IOrderForm } from './types';

const events = new EventEmitter();
const api = new ShopAPI(CDN_URL, API_URL);

// Чтобы мониторить все события, для отладки
events.onAll(({ eventName, data }) => {
	console.log(eventName, data);
});

// Все шаблоны
const cardCatalogTemplate = ensureElement<HTMLTemplateElement>('#card-catalog');
const cardPreviewTemplate = ensureElement<HTMLTemplateElement>('#card-preview');
const cardBasketTemplate = ensureElement<HTMLTemplateElement>('#card-basket');
const basketTemplate = ensureElement<HTMLTemplateElement>('#basket');
const orderTemplate = ensureElement<HTMLTemplateElement>('#order');
const successTemplate = ensureElement<HTMLTemplateElement>('#success');
const contactsTemplate = ensureElement<HTMLTemplateElement>('#contacts');

// // Модель данных приложения
const appData = new AppState({}, events);

// // Глобальные контейнеры
const page = new Page(document.body, events);
const modal = new Modal(ensureElement<HTMLElement>('#modal-container'), events);
const basket = new Basket(cloneTemplate(basketTemplate), events);
const order = new Order(cloneTemplate(orderTemplate), events);
const contacts = new Contacts(cloneTemplate(contactsTemplate), events);

// Получаем продукты с сервера
api
	.getProductList()
	.then(appData.setCatalog.bind(appData))
	.catch((err) => {
		console.error(err);
	});

// Изменились элементы каталога
events.on<CatalogChangeEvent>('items:changed', () => {
	page.catalog = appData.catalog.map((item) => {
		const card = new CardItem(cloneTemplate(cardCatalogTemplate), {
			onClick: () => events.emit('card:select', item),
		});
		return card.render({
			title: item.title,
			description: item.description,
			image: item.image,
			price: item.price,
			category: item.category,
		});
	});
});

// открыть продукт
events.on('card:select', (item: ProductItem) => {
	appData.setPreview(item);
});

// Блокируем прокрутку страницы если открыта модалка
events.on('modal:open', () => {
	page.locked = true;
});

// ... и разблокируем
events.on('modal:close', () => {
	page.locked = false;
});

///
// Выбран способ оплаты и введен адрес
events.on('order:submit', () => {
	modal.render({
		content: contacts.render({
			phone: '',
			email: '',
			valid: false,
			errors: [],
		}),
	});
});
//финальный сабмит
events.on('contacts:submit', () => {
	api
		.orderProducts(appData.order)
		.then((result) => {
			const success = new Success(cloneTemplate(successTemplate), {
				onClick: () => {
					modal.close();
					appData.clearBasket();
				},
			});
			success.total = appData.order.total;
			modal.render({
				content: success.render({}),
			});
			appData.clearOrder();
		})
		.catch((err) => {
			console.error(err);
		});
});

// // Изменилось состояние валидации формы
events.on('formErrorsContacts:change', (errors: Partial<IOrderForm>) => {
	const { email, phone } = errors;
	contacts.valid = !email && !phone;
	contacts.errors = Object.values({ phone, email })
		.filter((i) => !!i)
		.join('; ');
});

events.on('formErrors:change', (errors: Partial<IOrderForm>) => {
	const { address } = errors;
	order.valid = !address;
	order.errors = Object.values({ address })
		.filter((i) => !!i)
		.join('; ');
});

// // Изменилось одно из полей
//изменение в полях выбора оплаты и адреса
events.on(
	/^order\..*:change/,
	(data: { field: keyof IOrderForm; value: string }) => {
		appData.setOrderField(data.field, data.value);
	}
);

//изменения в полях модального окна контакты
events.on(
	/^contacts\..*:change/,
	(data: { field: keyof IOrderForm; value: string }) => {
		console.log('changes');
		appData.setContactsField(data.field, data.value);
	}
);

//изменение способа оплаты
events.on(
	'payment:change',
	(data: { field: keyof IOrderForm; value: string }) => {
		appData.setPayment(data.value);
		order.payment = data.value;
		appData.setOrderField(data.field, data.value);
	}
);

// Открыть форму заказа
events.on('order:open', () => {
	if (appData.basket.length > 0) {
		modal.render({
			content: order.render({
				address: '',
				valid: false,
				errors: [],
			}),
		});
	}
});

// открыть корзину
events.on('basket:open', () => {
	modal.render({
		content: createElement<HTMLElement>('div', {}, [basket.render()]),
	});
});

//открытие карточки
events.on('preview:changed', (item: ProductItem) => {
	const card = new CardItem(cloneTemplate(cardPreviewTemplate), {
		onClick: () => {
			card.buttonTitle = appData.isInBasket(item) //изменение текста на кнопке карточки
				? 'В корзину'
				: 'Удалить из корзины';
			events.emit('product:changed', item);
		},
	});

	modal.render({
		content: card.render({
			title: item.title,
			description: item.description,
			image: item.image,
			price: item.price,
			category: item.category,
			buttonTitle: appData.isInBasket(item)
				? 'Удалить из корзины'
				: 'В корзину',
		}),
	});
});

// срабатывает при добавлении удалении товара в корзину
events.on('product:changed', (item: ProductItem) => {
	if (!appData.isInBasket(item)) {
		appData.addToBasket(item);
	} else {
		appData.removeFromBasket(item);
	}
});

//любое изменение в корзине
events.on('basket:changed', (items: ProductItem[]) => {
	console.log('basket changed');
	page.counter = appData.basket.length;
	basket.items = appData.basket.map((item) => {
		const card = new CardItem(cloneTemplate(cardBasketTemplate), {
			onClick: () => events.emit('product:changed', item),
		});

		return card.render({
			index: (appData.basket.indexOf(item) + 1).toString(),
			title: item.title,
			price: item.price,
		});
	});

	let total = items.reduce((acc, item) => acc + item.price, 0);
	basket.total = total;
	let itemsIds = items.map((item) => item.id);
	appData.setItems(itemsIds);
	appData.setTotal(total);

	if (appData.basket.length > 0) {
		basket.buttonIsDisabled(false);
	} else {
		basket.buttonIsDisabled(true);
	}
});
