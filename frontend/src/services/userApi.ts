import { API_BASE_URL } from "../config/api";

export type User = {
    id: number;
    name: string;
    email: string;
};

export type CreateUserDto = {
    name: string;
    email: string;
};

async function http<T>(url: string, options?: RequestInit): Promise<T> {
    const res = await fetch(url, {
        headers: { "Content-Type": "application/json" },
        ...options,
    });

    if (!res.ok) {
        const text = await res.text().catch(() => "");
        throw new Error(`HTTP ${res.status}: ${text || res.statusText}`);
    }

    // nếu API trả 204 No Content
    if (res.status === 204) return undefined as T;

    return (await res.json()) as T;
}

export const userApi = {
    list: () => http<User[]>(`${API_BASE_URL}/users`),

    create: (dto: CreateUserDto) =>
        http<User>(`${API_BASE_URL}/users`, {
            method: "POST",
            body: JSON.stringify(dto),
        }),
};
