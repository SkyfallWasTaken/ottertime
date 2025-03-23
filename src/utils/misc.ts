export function getRandomItem<T>(items: T[]): T {
	return items[Math.floor(Math.random() * items.length)];
}

export function clamp(num: number, lower: number, upper: number) {
	return Math.min(Math.max(num, lower), upper);
}
