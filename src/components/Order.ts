import { Form } from './common/Form';
import { IOrderForm } from '../types';
import { EventEmitter, IEvents } from './base/Events';
import { ensureElement } from '../utils/utils';

export class Order extends Form<IOrderForm> {
	protected _paymentCard: HTMLButtonElement;
	protected _paymentCash: HTMLButtonElement;

	constructor(container: HTMLFormElement, events: IEvents) {
		super(container, events);

		this._paymentCard = this.container.elements.namedItem(
			'card'
		) as HTMLButtonElement;
		this._paymentCash = this.container.elements.namedItem(
			'cash'
		) as HTMLButtonElement;

		this._paymentCard.addEventListener('click', () => {
			events.emit('payment:change', { field: 'payment', value: 'card' });
		});

		this._paymentCash.addEventListener('click', () => {
			events.emit('payment:change', { field: 'payment', value: 'cash' });
		});
	}

	set address(value: string) {
		(this.container.elements.namedItem('address') as HTMLInputElement).value =
			value;
	}

	set payment(value: string) {
		if (value === 'card') {
			this._paymentCard.classList.add('button_alt-active');
			this._paymentCash.classList.remove('button_alt-active');
		} else if (value === 'cash') {
			this._paymentCash.classList.add('button_alt-active');
			this._paymentCard.classList.remove('button_alt-active');
		} else {
			this._paymentCash.classList.remove('button_alt-active');
			this._paymentCard.classList.remove('button_alt-active');
		}
	}
}

export class Contacts extends Form<IOrderForm> {
	constructor(container: HTMLFormElement, events: IEvents) {
		super(container, events);
	}

	set phone(value: string) {
		(this.container.elements.namedItem('phone') as HTMLInputElement).value =
			value;
	}

	set email(value: string) {
		(this.container.elements.namedItem('email') as HTMLInputElement).value =
			value;
	}
}
