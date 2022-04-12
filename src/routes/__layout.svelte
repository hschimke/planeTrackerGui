<script lang="ts">
    import { loginState } from "$lib/data";
    import Login from "$lib/components/login.svelte";
    import Nav from "$lib/components/nav.svelte"
    import { page } from "$app/stores";
</script>
<style>
    h1 {
        color: white;
        background-color: #333;
        margin: 0px 0px 0px 0px;
        padding-left: .1em;
    }
</style>
<h1>Plane Tracker</h1>
<Nav />
{#if $loginState.email !== "" || $page.url.pathname.startsWith("/login")}
    <slot />
{:else}
    <Login />
{/if}
