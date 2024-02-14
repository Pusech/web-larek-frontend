export const API_URL = `${process.env.API_ORIGIN}/api/weblarek`;
export const CDN_URL = `${process.env.API_ORIGIN}/content/weblarek`;

export const settings = {};

export const categories: Record<string, string> = {
	'софт-скил': 'card__category_soft',
	'хард-скил': 'card__category_hard',
	другое: 'card__category_other',
	кнопка: 'card__category_button',
	дополнительное: 'card__category_additional',
};
