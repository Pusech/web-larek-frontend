# Проектная работа "Веб-ларек"

Стек: HTML, SCSS, TS, Webpack

Структура проекта:

- src/ — исходные файлы проекта
- src/components/ — папка с JS компонентами
- src/components/base/ — папка с базовым кодом

Важные файлы:

- src/pages/index.html — HTML-файл главной страницы
- src/types/index.ts — файл с типами
- src/index.ts — точка входа приложения
- src/styles/styles.scss — корневой файл стилей
- src/utils/constants.ts — файл с константами
- src/utils/utils.ts — файл с утилитами

## Установка и запуск

Для установки и запуска проекта необходимо выполнить команды

```
npm install
npm run start
```

или

```
yarn
yarn start
```

## Сборка

```
npm run build
```

или

```
yarn build
```

# Описание данных:

Базовый код

abstract class Model
/\*\*

- Абстрактный класс, представляющий базовую модель данных.
- Используется для отличия от простых объектов с данными и обеспечивает функционал уведомления об изменениях.
  \*/

class Api
/\*\*

- Класс для выполнения HTTP-запросов к API.
- Предоставляет методы для отправки GET и POST запросов.
  \*/

abstract class Component

- Базовый компонент для работы с DOM элементами.
- Предоставляет методы для управления отображением, классами, текстом и состоянием DOM элементов.

class EventEmitter Брокер событий, классическая реализация

/\*\*

- Классическая реализация брокера событий.
- Предоставляет методы для подписки на события, отписки от событий и инициирования событий.
  \*/

## Типы данных:

```
interface IAppState {
	catalog: IProductItem[];
	basket: string[];
	preview: string | null;
	order: IOrder | null;
	loading: boolean;
}
```

### Объект продукта IProductItem

```
   id: string; - id продукта
   description?: string; - описание продукта
   image: string; - картинка продукта
   title: string; - название продукта
   category: string; - категория продукта
   price:number; - цена

```

### Массив из продуктов IProductList

```
   total:number; - количество продуктов в массиве
   items:IProductItem[]; - массив продуктов

```

### Заказ продукта IOrder

```
interface IOrderForm {
	payment: string; - способ оплаты
	email: string; - почта
	phone: string; - телефон
	address: string; - адрес
}
```

```
interface IOrder extends IOrderForm {
	total: number; - количество товаров
	items: string[]; - массив из товаров
}
```

### Результат заказа

```
interface IOrderResult
    id:string; - номер заказа
    total:number; - цена корзины

interface IOrderResultError
    error:string; - Строка описывающая ошибку
```

### Отображение массива карточек ICardList

```
interface ICard extends IProduct {
	index?: string;
	buttonTitle?: string;
}
```

## Модели данных

class AppState
/\*\*

- Класс для управления состоянием приложения.
- Расширяет базовую модель `Model` и предоставляет методы для работы с корзиной, каталогом, заказом и предпросмотром товаров,
- а также для валидации данных заказа и контактной информации.
  \*/

```
export class AppState extends Model<IAppState> {
   /**
    * Элементы, добавленные в корзину.
    */
   basket: ProductItem[];

   /**
    * Элементы в каталоге.
    */
   catalog: IProductItem[];

   /**
    * Флаг загрузки данных.
    */
   loading: boolean;

   /**
    * Информация о заказе.
    */
   order: IOrder;

   /**
    * Идентификатор предпросматриваемого товара.
    */
   preview: string | null;

   /**
    * Ошибки формы заказа и контактной информации.
    */
   formErrors: FormErrors;

   /**
    * Очищает информацию о заказе и уведомляет об изменениях.
    */
   clearOrder(): void;

   /**
    * Очищает корзину и уведомляет об изменениях.
    */
   clearBasket(): void;

   /**
    * Добавляет элемент в корзину и обновляет состояние.
    * @param item Элемент для добавления в корзину.
    */
   addToBasket(item: ProductItem): void;

   /**
    * Обновляет состояние корзины.
    */
   updateBasket(): void;

   /**
    * Удаляет элемент из корзины и обновляет состояние.
    * @param item Элемент для удаления из корзины.
    */
   removeFromBasket(item: ProductItem): void;

   /**
    * Проверяет, содержится ли указанный элемент в корзине.
    * @param item Элемент для проверки.
    * @returns true, если элемент содержится в корзине, в противном случае false.
    */
   isInBasket(item: ProductItem): boolean;

   /**
    * Устанавливает элементы каталога и уведомляет об изменениях.
    * @param items Элементы каталога.
    */
   setCatalog(items: IProductItem[]): void;

   /**
    * Устанавливает предпросматриваемый товар.
    * @param item Предпросматриваемый товар.
    */
   setPreview(item: ProductItem): void;

   /**
    * Устанавливает значение поля заказа и проверяет его валидность.
    * @param field Название поля заказа.
    * @param value Значение поля.
    */
   setOrderField(field: keyof IOrderForm, value: string): void;

   /**
    * Устанавливает значение поля контактной информации и проверяет его валидность.
    * @param field Название поля контактной информации.
    * @param value Значение поля.
    */
   setContactsField(field: keyof IOrderForm, value: string): void;

   /**
    * Устанавливает общую стоимость заказа.
    * @param total Общая стоимость заказа.
    */
   setTotal(total: number): void;

   /**
    * Устанавливает элементы заказа.
    * @param items Элементы заказа.
    */
   setItems(items: string[]): void;

   /**
    * Устанавливает способ оплаты.
    * @param value Способ оплаты.
    */
   setPayment(value: string): void;

   /**
    * Проверяет валидность контактной информации.
    * @returns true, если контактная информация валидна, в противном случае false.
    */
   validateContacts(): boolean;

   /**
    * Проверяет валидность данных заказа.
    * @returns true, если данные заказа валидны, в противном случае false.
    */
   validateOrder(): boolean;
}

```

class ShopAPI

/\*\*

- Класс для взаимодействия с API магазина.
- Расширяет базовый класс `Api` и реализует интерфейс `IShopAPI`.
  \*/

```
xport class ShopAPI extends Api implements IShopAPI {
   /**
    * Базовый URL для загрузки статических ресурсов.
    */
   readonly cdn: string;

   /**
    * Создает экземпляр класса ShopAPI.
    * @param cdn Базовый URL для загрузки статических ресурсов.
    * @param baseUrl Базовый URL API магазина.
    * @param options Настройки запроса по умолчанию.
    */
   constructor(cdn: string, baseUrl: string, options?: RequestInit);

   /**
    * Получает информацию о товаре по его идентификатору.
    * @param id Идентификатор товара.
    * @returns Promise с информацией о товаре.
    */
   getProductItem(id: string): Promise<IProductItem>;

   /**
    * Получает список товаров.
    * @returns Promise с массивом товаров.
    */
   getProductList(): Promise<IProductItem[]>;

   /**
    * Оформляет заказ на указанные товары.
    * @param order Информация о заказе.
    * @returns Promise с результатом заказа.
    */
   orderProducts(order: IOrder): Promise<IOrderResult>;
}
```

## Компоненты представления

```

class Modal extends Component<IModalData> {
	protected _closeButton: HTMLButtonElement;
	protected _content: HTMLElement;

	set content(value: HTMLElement) {
	}

	open() {
	}

	close() {
	}

	render(data: IModalData): HTMLElement {
	}
```

class Form

```
class Form<T> extends Component<IFormState> {
	protected _submit: HTMLButtonElement;
	protected _errors: HTMLElement;

	constructor(protected container: HTMLFormElement, protected events: IEvents) {
		super(container);

		this._submit = ensureElement<HTMLButtonElement>(
			'button[type=submit]',
			this.container
		);
		this._errors = ensureElement<HTMLElement>('.form__errors', this.container);

		this.container.addEventListener('input', (e: Event) => {
			console.log(this.container);
			const target = e.target as HTMLInputElement;
			const field = target.name as keyof T;
			const value = target.value;
			this.onInputChange(field, value);
		});

		this.container.addEventListener('submit', (e: Event) => {
			e.preventDefault();
			this.events.emit(`${this.container.name}:submit`);
		});
	}

	protected onInputChange(field: keyof T, value: string) {
		this.events.emit(`${this.container.name}.${String(field)}:change`, {
			field,
			value,
		});
	}

	set valid(value: boolean) {
		this._submit.disabled = !value;
	}

	set errors(value: string) {
		this.setText(this._errors, value);
	}

	render(state: Partial<T> & IFormState) {
		const { valid, errors, ...inputs } = state;
		super.render({ valid, errors });
		Object.assign(this, inputs);
		return this.container;
	}
}
```

class Success
/\*\*

- Компонент для отображения сообщения об успешном оформлении заказа.
- Расширяет базовый класс `Component` и принимает данные типа `ISuccess`.
  \*/

```
class Success extends Component<ISuccess>
    /**
     * Кнопка для закрытия сообщения об успешном действии.
     */
    protected _close: HTMLElement;

```

class Basket

- Компонент для отображения корзины.
- Расширяет базовый класс `Component` и принимает данные типа `IBasketView`.
  \*/

```
class Basket extends Component<IBasketView> {
   /**
    * Список элементов корзины.
    */
   protected _list: HTMLElement;

   /**
    * Общая стоимость товаров в корзине.
    */
   protected _total: HTMLElement;

   /**
    * Кнопка для оформления заказа.
    */
   protected _button: HTMLButtonElement;

   /**
    * Создает экземпляр класса Basket.
    * @param container Контейнер, в котором будет отображаться компонент.
    * @param events Объект для управления событиями.
    */
   constructor(container: HTMLElement, events: EventEmitter);

   /**
    * Устанавливает список элементов корзины.
    * @param items Элементы корзины.
    */
   set items(items: HTMLElement[]): void;

   /**
    * Устанавливает общую стоимость товаров в корзине.
    * @param total Общая стоимость товаров.
    */
   set total(total: number): void;

   /**
    * Управляет доступностью кнопки для оформления заказа.
    * @param isDisabled Если true, кнопка будет отключена, в противном случае - включена.
    */
   buttonIsDisabled(isDisabled: boolean): void;
}
```

class Card
/\*\*

- Компонент для отображения карточки товара.
- Расширяет базовый класс `Component` и принимает данные типа `ICard`.
  \*/

```
export class Card extends Component<ICard> {
   /**
    * Заголовок карточки.
    */
   protected _title: HTMLElement;

   /**
    * Изображение товара.
    */
   protected _image?: HTMLImageElement;

   /**
    * Описание товара.
    */
   protected _description?: HTMLElement;

   /**
    * Кнопка для действия с товаром.
    */
   protected _button?: HTMLButtonElement;

   /**
    * Цена товара.
    */
   protected _price: HTMLElement;

   /**
    * Категория товара.
    */
   protected _category?: HTMLElement;

   /**
    * Индекс товара.
    */
   protected _index?: HTMLElement;

   /**
    * Название кнопки.
    */
   protected _buttonTitle: string;

   /**
    * Создает экземпляр класса Card.
    * @param blockName Имя блока, которое будет использоваться для поиска элементов в контейнере.
    * @param container Контейнер, в котором будет отображаться компонент.
    * @param actions Объект с действиями, которые могут быть выполнены при взаимодействии с компонентом.
    */
   constructor(blockName: string, container: HTMLElement, actions?: ICardActions);

   /**
    * Устанавливает идентификатор товара.
    */
   set id(value: string): void;

   /**
    * Получает идентификатор товара.
    */
   get id(): string;

   /**
    * Устанавливает заголовок карточки.
    */
   set title(value: string): void;

   /**
    * Получает заголовок карточки.
    */
   get title(): string;

   /**
    * Устанавливает изображение товара.
    */
   set image(value: string): void;

   /**
    * Устанавливает описание товара.
    */
   set description(value: string | string[]): void;

   /**
    * Устанавливает цену товара.
    */
   set price(value: number | null): void;

   /**
    * Получает цену товара.
    */
   get price(): number;

   /**
    * Устанавливает категорию товара.
    */
   set category(value: string): void;

   /**
    * Получает категорию товара.
    */
   get category(): string;

   /**
    * Устанавливает индекс товара.
    */
   set index(value: string): void;

   /**
    * Получает индекс товара.
    */
   get index(): string;

   /**
    * Устанавливает название кнопки.
    */
   set buttonTitle(value: string): void;
}

```

class Order
/\*\*

- Компонент для оформления заказа.
- Расширяет базовый класс `Form` и принимает данные типа `IOrderForm`.
  \*/

```
export class Order extends Form<IOrderForm> {
   /**
    * Кнопка для выбора оплаты картой.
    */
   protected _paymentCard: HTMLButtonElement;

   /**
    * Кнопка для выбора оплаты наличными.
    */
   protected _paymentCash: HTMLButtonElement;

   /**
    * Создает экземпляр класса Order.
    * @param container Контейнер формы оформления заказа.
    * @param events Объект для управления событиями.
    */
   constructor(container: HTMLFormElement, events: IEvents);

   /**
    * Устанавливает адрес доставки.
    * @param value Адрес доставки.
    */
   set address(value: string): void;

   /**
    * Устанавливает способ оплаты.
    * @param value Способ оплаты (card или cash).
    */
   set payment(value: string): void;
}

/**
* Компонент для ввода контактной информации.
* Расширяет базовый класс `Form` и принимает данные типа `IOrderForm`.
*/
export class Contacts extends Form<IOrderForm> {
   /**
    * Создает экземпляр класса Contacts.
    * @param container Контейнер формы ввода контактной информации.
    * @param events Объект для управления событиями.
    */
   constructor(container: HTMLFormElement, events: IEvents);

   /**
    * Устанавливает номер телефона.
    * @param value Номер телефона.
    */
   set phone(value: string): void;

   /**
    * Устанавливает адрес электронной почты.
    * @param value Адрес электронной почты.
    */
   set email(value: string): void;
}
```

class Page
/\*\*

- Компонент для отображения страницы.
- Расширяет базовый класс `Component` и принимает данные типа `IPage`.
  \*/

```
class Page extends Component<IPage> {
   /**
    * Счетчик товаров в корзине.
    */
   protected _counter: HTMLElement;

   /**
    * Контейнер для отображения каталога товаров.
    */
   protected _catalog: HTMLElement;

   /**
    * Обертка страницы.
    */
   protected _wrapper: HTMLElement;

   /**
    * Контейнер для отображения корзины.
    */
   protected _basket: HTMLElement;

   /**
    * Создает экземпляр класса Page.
    * @param container Контейнер, в котором будет отображаться страница.
    * @param events Объект для управления событиями.
    */
   constructor(container: HTMLElement, events: IEvents);

   /**
    * Устанавливает количество товаров в корзине.
    * @param value Количество товаров в корзине.
    */
   set counter(value: number): void;

   /**
    * Устанавливает элементы каталога товаров.
    * @param items Массив элементов каталога товаров.
    */
   set catalog(items: HTMLElement[]): void;

   /**
    * Устанавливает блокировку страницы.
    * @param value Если true, страница будет заблокирована, в противном случае - разблокирована.
    */
   set locked(value: boolean): void;
}
```

## Описание событий

### Изменились элементы каталога

```
events.on<CatalogChangeEvent>('items:changed', () => {
});
```

### Открытие карточки продукта

```
events.on('card:select', (item: ProductItem) => {
});
```

### При открытии модалки

```
events.on('modal:open', () => {});
```

### При закрытии модалки

```
events.on('modal:close', () => {});
```

### Сабмит модалки с выбором оплаты и адресом

```
events.on('order:submit', () => {});
```

### финальный сабмит

```
events.on('contacts:submit', () => {});
```

### Изменилось состояние валидации формы

```
events.on('formErrorsContacts:change', (errors: Partial<IOrderForm>) => {});

events.on('formErrors:change', (errors: Partial<IOrderForm>) => {});
```

### Изменения в инпутах полях окна адреса и оплаты

```
events.on(
/^order\..*:change/,
(data: { field: keyof IOrderForm; value: string }) => {
}
);
```

### Изменения в инпутах полях окна контакты

```
events.on(
	/^contacts\..*:change/,
	(data: { field: keyof IOrderForm; value: string }) => {}
);
```

### Изменение способа оплаты

```
events.on(
	'payment:change',
	(data: { field: keyof IOrderForm; value: string }) => {}
);
```

### Открыть форму заказа

```
events.on('order:open', () => {
});
```

### Открыть корзину

```
events.on('basket:open', () => {
});
```

###Изменения в карточке

```
events.on('preview:changed', (item: ProductItem) => {
});
```

### срабатывает при добавлении удалении товара в корзину

```
events.on('product:changed', (item: ProductItem) => {
});
```

### любое изменение в корзине

```
events.on('basket:changed', (items: ProductItem[]) => {
});
```
