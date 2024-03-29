import { ICard } from '../types/index';
import { Component } from './base/Component';
import { ensureElement } from '../utils/utils';
import { categories } from '../utils/constants';

interface ICardActions {
	onClick: (event: MouseEvent) => void;
}

export class Card extends Component<ICard> {
	protected _title: HTMLElement;
	protected _image?: HTMLImageElement;
	protected _description?: HTMLElement;
	protected _button?: HTMLButtonElement;
	protected _price: HTMLElement;
	protected _category?: HTMLElement;
	protected _index?: HTMLElement;
	protected _buttonTitle: string;

	constructor(
		protected blockName: string,
		container: HTMLElement,
		actions?: ICardActions
	) {
		super(container);

		this._title = ensureElement<HTMLElement>('.card__title', container);
		this._image = container.querySelector('.card__image');
		this._description = container.querySelector('.card__text');
		this._button = container.querySelector('.card__button');
		this._price = ensureElement<HTMLElement>('.card__price', container);
		this._category = container.querySelector('.card__category');
		this._index = container.querySelector('.basket__item-index');

		if (actions?.onClick) {
			if (this._button) {
				this._button.addEventListener('click', actions.onClick);
			} else {
				container.addEventListener('click', actions.onClick);
			}
		}
	}

	set id(value: string) {
		this.container.dataset.id = value;
	}

	get id(): string {
		return this.container.dataset.id || '';
	}

	set title(value: string) {
		this.setText(this._title, value);
	}

	get title(): string {
		return this._title.textContent || '';
	}

	set image(value: string) {
		this.setImage(this._image, value, this.title);
	}

	set description(value: string | string[]) {
		this.setText(this._description, value);
	}

	set price(value: number | null) {
		this.setText(
			this._price,
			value ? `${value.toString()} синапсов` : 'Бесценно'
		);
	}

	get price(): number {
		return Number(this._price.textContent || '');
	}

	set category(value: string) {
		this.setText(this._category, value);
		this._category.classList.add(categories[value]);
	}

	get category(): string {
		return this._category.textContent || '';
	}

	set index(value: string) {
		this.setText(this._index, value);
	}

	get index(): string {
		return this._index.textContent || '';
	}

	set buttonTitle(value: string) {
		if (this._button) {
			this.setText(this._button, value);
		}
	}
}

export class CardItem extends Card {
	constructor(container: HTMLElement, actions?: ICardActions) {
		super('card', container, actions);
	}
}
