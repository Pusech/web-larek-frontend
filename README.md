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
- src/scss/styles.scss — корневой файл стилей
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

# Описание проекта

Проект написан с использованием архитектуры MVP

-Model (Модель):
Это слой, который содержит бизнес-логику приложения и данные. Модель предоставляет методы для работы с данными и управляет их состоянием.

Основные классы модели:Model,EventEmitter

- View (Представление)
  Это слой, который отвечает за отображение данных пользователю и получение от него входных данных.

Основной класс представления: Component

- Presenter (Презентер):
  Это слой, который служит посредником между моделью и представлением. Презентер получает данные из модели, обрабатывает их и передает в представление для отображения. Он также принимает пользовательский ввод от представления, обрабатывает его и передает соответствующие команды модели.

-Основной класс презентера: Api

# Описание данных:

## Базовый код

### Abstract class _Model_ <T>

Model<T> Является базовым классом представляющим модель данных. Используется для отличия от простых объектов с данными и обеспечивает функционал events - уведомления об изменениях.
Класс является дженериком и принимает тип данных <T> представляющий структуру данных модели

Конструктор принимает следующие параметры:
_ data Данные модели.
_ events Объект для управления событиями.

```
     Сообщает всем подписчикам об изменении модели.
    emitChanges(event: string, payload?: object): void;
```

### class EventEmitter

Реализует паттерн «Наблюдатель» и позволяет подписываться на события и уведомлять подписчиков
о наступлении события.

Конструктор класса EventEmitter инициализирует объект класса. В частности, он создает пустую карту \_events, которая будет использоваться для хранения событий и их обработчиков.

Включает методы:

```
     * Устанавливает подписку для указанного события.
    on<T extends object>(eventName: EventName, callback: (event: T) => void): void;

     * Удаляет подписку для указанного события.
    off(eventName: EventName, callback: Subscriber): void;

     * Инициирует событие с указанными данными.
    emit<T extends object>(eventName: string, data?: T): void;

     * Подписывается на все события.
    onAll(callback: (event: EmitterEvent) => void): void;

     * Отменяет все подписки на события.
    offAll(): void;

    /**
     * Создает триггер, генерирующий событие с указанным названием при вызове.
    trigger<T extends object>(eventName: string, context?: Partial<T>): (event?: object) => void;
}
```

### Component

Component<T> Является базовым классом для работы с DOM элементами и родителем для всех компонентов представления.
Предоставляет методы для управления отображением, классами, текстом и состоянием DOM элементов.
Класс является дженериком и принимает тип данных <T> для отрисовки компонента.

Конструктор принимает следующие параметры:

```
container - Контейнер, в котором будет отображаться компонент.
```

И включает методы:

```
    Переключает указанный класс у элемента.
    toggleClass(element: HTMLElement, className: string, force?: boolean)

    Устанавливает текстовое содержимое указанного элемента.
    setText(element: HTMLElement, value: unknown)

    Устанавливает состояние блокировки указанного элемента.
    setDisabled(element: HTMLElement, state: boolean)

    Скрывает указанный элемент.
    setHidden(element: HTMLElement)

    Показывает указанный элемент.
    setVisible(element: HTMLElement)

    Устанавливает изображение с альтернативным текстом для указанного элемента.
    setImage(element: HTMLImageElement, src: string, alt?: string)

    Рендерит компонент и возвращает его корневой DOM элемент.
    render(data?: Partial<T>): HTMLElement
```

### Api

- Класс для выполнения HTTP-запросов к API.
- Предоставляет методы для отправки GET и POST запросов.

Конструктор принимает следующие параметры:

- baseUrl - Базовый URL API.
- options - Настройки запроса по умолчанию.

И включает методы:

```
     * Обрабатывает ответ от сервера.
handleResponse(response: Response): Promise<object>;

     * Выполняет GET запрос к API.
    get(uri: string): Promise<object>;

     * Выполняет POST запрос к API.
    post(uri: string, data: object, method?: ApiPostMethods): Promise<object>;

```

## Дополнительные Модели данных (Бизнес-логика)

### class AppState

- Класс для управления состоянием приложения.
- Расширяет базовую модель `Model` и предоставляет методы для работы с корзиной, каталогом, заказом и предпросмотром товаров,
- а также для валидации данных заказа и контактной информации.

```
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

### ProductItem

- Класс, представляющий объект продукта.
- Расширяет базовую модель `Model<IProductItem>`.
- Реализует интерфейс `IProductItem`

## Компоненты представления

### Modal

- Компонент для отображения модального окна.
- Расширяет базовый класс `Component` и принимает данные типа `IModalData`.

```
interface IModalData {
	content: HTMLElement;
}
```

```

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

### Form <T>

```
 * Компонент для отображения формы.
 * Расширяет базовый класс `Component` и принимает данные типа `IFormState`.

 дженерик T используется для определения типа данных формы. Это позволяет создавать экземпляры класса Form, работающие с разными типами данных, в зависимости от конкретного использования.

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

### Success

- Компонент для отображения сообщения об успешном оформлении заказа.
- Расширяет базовый класс `Component` и принимает данные типа `ISuccess`.

```
interface ISuccess {
	total: number;
}
```

Элементы:

```
     * Кнопка для закрытия сообщения об успешном действии.
    protected _close: HTMLElement;

```

### Basket

- Компонент для отображения корзины.
- Расширяет базовый класс `Component` и принимает данные типа `IBasketView`.

```
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

### Card

- Компонент для отображения карточки товара.
- Расширяет базовый класс `Component` и принимает данные типа `ICard`.

```

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

Дочерний класс: CardItem

- Создает новый экземпляр элемента карточки.

```
     container HTML-элемент, в котором содержится карточка.
     actions Действия, связанные с карточкой.

    constructor(container: HTMLElement, actions?: ICardActions)
    Вызов конструктора базового класса Card с указанием блока 'card'.
        super('card', container, actions);
```

### Order

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

### Contacts

- Компонент для ввода контактной информации.
- Расширяет базовый класс `Form` и принимает данные типа `IOrderForm`.

```
 class Contacts extends Form<IOrderForm>

     * Устанавливает номер телефона.
    set phone(value: string): void;

     * Устанавливает адрес электронной почты.
    set email(value: string): void;

```

### Page

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

    * Сеттер Устанавливает количество товаров в корзине.
   set counter(value: number): void;

    * Устанавливает элементы каталога товаров.
   set catalog(items: HTMLElement[]): void;

    * Устанавливает блокировку страницы.
   set locked(value: boolean): void;

```

## Компоненты презентера

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

## Ключевые типы данных:

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

## Описание событий

#### Изменились элементы каталога

```
'items:changed'
```

#### Открытие карточки продукта

```
'card:select'
```

#### При открытии модалки

```
'modal:open'
```

#### При закрытии модалки

```
'modal:close'
```

#### Сабмит модалки с выбором оплаты и адресом

```
'order:submit'
```

#### Сабмит заказа

```
'contacts:submit'
```

#### Изменилось состояние валидации формы

```
'formErrorsContacts:change'

'formErrors:change'
```

#### Изменения в инпутах полях окна адреса и оплаты

```
/^order\..*:change/
```

#### Изменения в инпутах полях окна контакты

```
/^contacts\..*:change/
```

#### Изменение способа оплаты

```
	'payment:change',
```

#### Открыть форму заказа

```
'order:open'
```

#### Открыть корзину

```
'basket:open'
```

#### Изменения в карточке

```
'preview:changed'
```

#### Срабатывает при добавлении удалении товара в корзину

```
'product:changed'
```

#### Любое изменение в корзине

```
'basket:changed'
```
