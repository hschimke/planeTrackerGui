<script lang="ts">
    import { loginState } from "$lib/data";
    import Login from "$lib/components/login.svelte";
    import Nav from "$lib/components/nav.svelte"
    import { page } from "$app/stores";
</script>
<style>
    h1 {
        color: white;
        background-color: #3F3830;
        margin: 0px 0px 0px 0px;
        padding-left: .1em;
    }
    div.main {
        margin-left: 1em;
        margin-right: 1em;
    }
</style>
<h1>Plane Tracker</h1>
<Nav />
<div class="main">
{#if $loginState.email !== "" || $page.url.pathname.startsWith("/login")}
    <slot />
{:else}
    <Login />
{/if}
</div>
