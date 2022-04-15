<script lang="ts">
    import { loginState } from "$lib/data";
    import Login from "$lib/components/login.svelte";
    import Nav from "$lib/components/nav.svelte"
    import { page } from "$app/stores";

    let version = (import.meta.env.VITE_GIT_HASH === "" || import.meta.env.VITE_GIT_HASH === undefined) ? "unknown_version" : import.meta.env.VITE_GIT_HASH as string;
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
<svelte:head>
    <meta name="deployed_version_hash" content={version} />
</svelte:head>