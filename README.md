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

Описание данных:

Объект продукта
  interface IProductItem {
    id: string; - id продукта
    description?: string; - описание продукта
    image: string; - картинка продукта
    title: string; - название продукта
    category: string; - категория продукта
    price:number; - цена
}

Массив из продуктов
  interface IProductList {
    total:number; - количество продуктов в массиве
    items:IProductItem[]; - массив продуктов
}

Отправка заказа продукта
  interface IOrder {
    payment: string; - способ оплаты
    email: string; - почта
    phone:string; - телефон 
    address: string; - адрес
    total: number;- количество товаров
    items: string[]; - массив из товаров
}

Результат заказа
  interface IOrderResult {
    id:string; - номер заказа
    total:number; - цена корзины
}

Ошибка при заказе
  interface IOrderResultError {
    error:string; - Строка описывающая ошибку
}

Отображение массива карточек
interface ICardList {
    cardList: IProductItem[]; - массив карточек
 
    getCards():IProductItem[]; - получение массива карточек

    set addCards(cards:IProductItem[]); - добавление карточек в массив отображения

    set deleteCards (cards:IProductItem[]); - удаление карточек из массива отображения
}

Модели данных:
Опиши классы, которыми будем реализовать наши интерфейсы. Описываем какие действия выполняет тот или иной метод и для чего вообще класс.


Давайте опишем классы на основе предоставленных интерфейсов.


Класс для продукта (ProductItem):
class ProductItem implements IProductItem {
  constructor(
    public id: string,
    public image: string,
    public title: string,
    public category: string,
    public price: number,
    public description?: string
  ) {}
}


Класс для списка продуктов (ProductList):
class ProductList implements IProductList {
  constructor(public total: number, public items: IProductItem[]) {}
}


Класс для заказа (Order):
class Order implements IOrder {
  constructor(
    public payment: string,
    public email: string,
    public phone: string,
    public address: string,
    public total: number,
    public items: string[]
  ) {}
}


Класс для результата заказа (OrderResult):
class OrderResult implements IOrderResult {
  constructor(public id: string, public total: number) {}
}

Класс для ошибки при заказе (OrderResultError):
class OrderResultError implements IOrderResultError {
  constructor(public error: string) {}
}

Класс для отображения массива карточек (CardList):
class CardList implements ICardList {
  private cardList: IProductItem[] = [];

  getCards(): IProductItem[] {
    return this.cardList;
  }

  set addCards(cards: IProductItem[]) {
    this.cardList = this.cardList.concat(cards);
  }

  set deleteCards(cards: IProductItem[]) {
    this.cardList = this.cardList.filter(item => !cards.includes(item));
  }
}