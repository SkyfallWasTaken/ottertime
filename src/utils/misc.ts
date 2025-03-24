export function getRandomItem<T>(items: T[]): T {
	return items[Math.floor(Math.random() * items.length)];
}

export function clamp(num: number, lower: number, upper: number) {
	return Math.min(Math.max(num, lower), upper);
}

export function convertMinutes(totalMinutes: number): string {
	// Handle negative input
	if (totalMinutes < 0) {
		return "0m";
	}

	// Calculate hours and remaining minutes
	const hours = Math.floor(totalMinutes / 60);
	const minutes = totalMinutes % 60;

	// Format the output
	if (hours > 0) {
		// Pad minutes with leading zero if hours exist
		return `${hours}h ${minutes.toString().padStart(2, "0")}m`;
	}
	return `${minutes}m`;
}
