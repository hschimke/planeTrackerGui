import { writable } from 'svelte/store';

export interface LoginState {
    email: string;
    token: String;
}

export const loginState = writable<LoginState>({ email: "", token: "" });