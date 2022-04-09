import { writable } from 'svelte/store';
import { browser } from '$app/env';

export interface LoginState {
    email: string;
    token: String;
}

const defaultLoginState: LoginState = {
    email: "",
    token: "",
}

const initialLoginState = browser ? JSON.parse(window.localStorage.getItem('loginState')) as LoginState ?? defaultLoginState : defaultLoginState;

export const loginState = writable<LoginState>(initialLoginState);

loginState.subscribe((value) => {
    if (browser) {
        window.localStorage.setItem('loginState', JSON.stringify(value));
    }
});