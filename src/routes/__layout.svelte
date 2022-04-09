<script lang="ts">
    import { loginState } from "$lib/data";
    import Login from "$lib/components/login.svelte";
    import Nav from "$lib/components/nav.svelte"
    import { page } from "$app/stores";
</script>
<Nav />
{#if $loginState.email !== "" || $page.url.pathname.startsWith("/login")}
    <slot />
{:else}
    <Login />
{/if}
