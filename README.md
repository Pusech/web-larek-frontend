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

## Базовый код

### Abstract class _Model_

- Абстрактный класс, представляющий базовую модель данных.
- Используется для отличия от простых объектов с данными и обеспечивает функционал уведомления об изменениях.

### class Api

- Класс для выполнения HTTP-запросов к API.

- Предоставляет методы для отправки GET и POST запросов.

### abstract class Component

- Базовый компонент для работы с DOM элементами.

- Предоставляет методы для управления отображением, классами, текстом и состоянием DOM элементов.

### class EventEmitter

- Классическая реализация брокера событий.
- Предоставляет методы для подписки на события, отписки от событий и инициирования событий.

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
	index?: string; - индекс карточки
	buttonTitle?: string; - текст кнопки
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
export class AppState extends Model<IAppState>
   basket: ProductItem[]; * Элементы, добавленные в корзину.
   catalog: IProductItem[]; Элементы в каталоге.

    * Флаг загрузки данных.
   loading: boolean;

    * Информация о заказе.
   order: IOrder;


    * Идентификатор предпросматриваемого товара.
   preview: string | null;

    * Ошибки формы заказа и контактной информации.

   formErrors: FormErrors;

    * Очищает информацию о заказе и уведомляет об изменениях.
   clearOrder(): void;


    * Очищает корзину и уведомляет об изменениях.
   clearBasket(): void;

    * Добавляет элемент в корзину и обновляет состояние.
   addToBasket(item: ProductItem): void;

    * Обновляет состояние корзины.
   updateBasket(): void;


    * Удаляет элемент из корзины и обновляет состояние.
   removeFromBasket(item: ProductItem): void;


    * Проверяет, содержится ли указанный элемент в корзине.
   isInBasket(item: ProductItem): boolean;

    * Устанавливает элементы каталога и уведомляет об изменениях.
   setCatalog(items: IProductItem[]): void;

    * Устанавливает предпросматриваемый товар.
   setPreview(item: ProductItem): void;


    * Устанавливает значение поля заказа и проверяет его валидность.

   setOrderField(field: keyof IOrderForm, value: string): void;

    * Устанавливает значение поля контактной информации и проверяет его валидность.

   setContactsField(field: keyof IOrderForm, value: string): void;

    * Устанавливает общую стоимость заказа.
   setTotal(total: number): void;


    * Устанавливает элементы заказа.
   setItems(items: string[]): void;


    * Устанавливает способ оплаты.
   setPayment(value: string): void;


    * Проверяет валидность контактной информации.
   validateContacts(): boolean;

    * Проверяет валидность данных заказа.
   validateOrder(): boolean;


```

### class ShopAPI

- Класс для взаимодействия с API магазина.
- Расширяет базовый класс `Api` и реализует интерфейс `IShopAPI`.

```
class ShopAPI extends Api implements IShopAPI
    * Базовый URL для загрузки статических ресурсов.
   readonly cdn: string;

    * Получает информацию о товаре по его идентификатору.

   getProductItem(id: string): Promise<IProductItem>;


    * Получает список товаров.
   getProductList(): Promise<IProductItem[]>;

    * Оформляет заказ на указанные товары.
   orderProducts(order: IOrder): Promise<IOrderResult>;

```

## Компоненты представления

### Class Modal

- Компонент для отображения модального окна.
- Расширяет базовый класс `Component` и принимает данные типа `IModalData`.

```

class Modal extends Component<IModalData>

     * Кнопка для закрытия модального окна.
    protected _closeButton: HTMLButtonElement;


     * Контент модального окна.
    protected _content: HTMLElement;


     * Устанавливает контент модального окна.
    set content(value: HTMLElement): void;


     * Открывает модальное окно.
    open(): void;


     * Закрывает модальное окно.
    close(): void;

     * Создает DOM-элемент модального окна с учетом переданных данных.
    render(data: IModalData): HTMLElement;

```

### class Form

```
 * Компонент для отображения формы.
 * Расширяет базовый класс `Component` и принимает данные типа `IFormState`.

export class Form<T> extends Component<IFormState>

     * Кнопка отправки формы.
    protected _submit: HTMLButtonElement;

     * Элемент для отображения ошибок формы.
    protected _errors: HTMLElement;

     * Обрабатывает событие изменения ввода.
    protected onInputChange(field: keyof T, value: string): void;

     * Устанавливает состояние валидности формы.
    set valid(value: boolean): void;

     * Устанавливает текст ошибок формы.
    set errors(value: string): void;

     * Создает DOM-элемент формы с учетом переданного состояния.
    render(state: Partial<T> & IFormState): HTMLElement;

```

### class Success

- Компонент для отображения сообщения об успешном оформлении заказа.
- Расширяет базовый класс `Component` и принимает данные типа `ISuccess`.

```
class Success extends Component<ISuccess>
     * Кнопка для закрытия сообщения об успешном действии.
    protected _close: HTMLElement;

```

### class Basket

- Компонент для отображения корзины.
- Расширяет базовый класс `Component` и принимает данные типа `IBasketView`.

```
class Basket extends Component<IBasketView> {

    * Список элементов корзины.
   protected _list: HTMLElement;

    * Общая стоимость товаров в корзине.
   protected _total: HTMLElement;

    * Кнопка для оформления заказа.
   protected _button: HTMLButtonElement;

    * Устанавливает список элементов корзины.
   set items(items: HTMLElement[]): void;

    * Устанавливает общую стоимость товаров в корзине.
   set total(total: number): void;

    * Управляет доступностью кнопки для оформления заказа.
   buttonIsDisabled(isDisabled: boolean): void;
}
```

### class Card

- Компонент для отображения карточки товара.
- Расширяет базовый класс `Component` и принимает данные типа `ICard`.

```
export class Card extends Component<ICard> {

    * Заголовок карточки.
   protected _title: HTMLElement;


    * Изображение товара.
   protected _image?: HTMLImageElement;

    * Описание товара.
   protected _description?: HTMLElement;

    * Кнопка для действия с товаром.
   protected _button?: HTMLButtonElement;

    * Цена товара.
   protected _price: HTMLElement;

    * Категория товара.
   protected _category?: HTMLElement;

    * Индекс товара.
   protected _index?: HTMLElement;

    * Название кнопки.
   protected _buttonTitle: string;



    * Устанавливает идентификатор товара.
   set id(value: string): void;

    * Получает идентификатор товара.
   get id(): string;

    * Устанавливает заголовок карточки.
   set title(value: string): void;

    * Получает заголовок карточки.
   get title(): string;

    * Устанавливает изображение товара.
   set image(value: string): void;

    * Устанавливает описание товара.
   set description(value: string | string[]): void;

    * Устанавливает цену товара.
   set price(value: number | null): void;

    * Получает цену товара.
   get price(): number;

    * Устанавливает категорию товара.
   set category(value: string): void;

    * Получает категорию товара.
   get category(): string;

    * Устанавливает индекс товара.
   set index(value: string): void;

    * Получает индекс товара.
   get index(): string;

    * Устанавливает название кнопки.
   set buttonTitle(value: string): void;
}

```

### class Order

- Компонент для оформления заказа.
- Расширяет базовый класс `Form` и принимает данные типа `IOrderForm`.

```
export class Order extends Form<IOrderForm> {

    * Кнопка для выбора оплаты картой.
   protected _paymentCard: HTMLButtonElement;

    * Кнопка для выбора оплаты наличными.
   protected _paymentCash: HTMLButtonElement;

    * Создает экземпляр класса Order.
   constructor(container: HTMLFormElement, events: IEvents);

    * Устанавливает адрес доставки.
   set address(value: string): void;


    * Устанавливает способ оплаты.
   set payment(value: string): void;


```

### class Contacts

- Компонент для ввода контактной информации.
- Расширяет базовый класс `Form` и принимает данные типа `IOrderForm`.

```
 class Contacts extends Form<IOrderForm>

     * Устанавливает номер телефона.
    set phone(value: string): void;

     * Устанавливает адрес электронной почты.
    set email(value: string): void;

```

### class Page

- Компонент для отображения страницы.
- Расширяет базовый класс `Component` и принимает данные типа `IPage`.

```
class Page extends Component<IPage> {

    * Счетчик товаров в корзине.
   protected _counter: HTMLElement;

    * Контейнер для отображения каталога товаров.
   protected _catalog: HTMLElement;

    * Обертка страницы.
   protected _wrapper: HTMLElement;

    * Контейнер для отображения корзины.
   protected _basket: HTMLElement;


    * Устанавливает количество товаров в корзине.
   set counter(value: number): void;

    * Устанавливает элементы каталога товаров.
   set catalog(items: HTMLElement[]): void;


    * Устанавливает блокировку страницы.
   set locked(value: boolean): void;

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

### Изменения в карточке

```
events.on('preview:changed', (item: ProductItem) => {
});
```

### Срабатывает при добавлении удалении товара в корзину

```
events.on('product:changed', (item: ProductItem) => {
});
```

### Любое изменение в корзине

```
events.on('basket:changed', (items: ProductItem[]) => {
});
```
