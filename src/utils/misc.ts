import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

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

export function getPasswordFromAuthHeader(authHeader: string):
	| {
			ok: false;
			error: string;
	  }
	| { ok: true; password: string } {
	if (!authHeader.startsWith("Basic ") && !authHeader.startsWith("Bearer ")) {
		return { ok: false, error: "Invalid Authorization header" };
	}

	if (authHeader.startsWith("Bearer ")) {
		return { ok: true, password: authHeader.slice(7) };
	}

	// Decode the Base64 part
	const credentials = Buffer.from(authHeader.slice(6), "base64").toString(
		"utf-8",
	);

	// Split into username and password
	if (credentials.includes(":")) {
		const [_, password] = credentials.split(":");
		if (!password) {
			return { ok: false, error: "Invalid Authorization header" };
		}
		return { ok: true, password };
	}

	return { ok: true, password: credentials };
}

export async function sha256(message: string) {
	const msgUint8 = new TextEncoder().encode(message);
	const hashBuffer = await crypto.subtle.digest("SHA-256", msgUint8);
	const hashArray = Array.from(new Uint8Array(hashBuffer));
	const hashHex = hashArray
		.map((b) => b.toString(16).padStart(2, "0"))
		.join("");
	return hashHex;
}

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}
