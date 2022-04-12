<script lang="ts">
    import { performLogout } from "$lib/login";
    import { loginState } from "$lib/data";

    async function doLogout() {
        performLogout($loginState);
    }
</script>

<button on:click={doLogout}>Logout</button>
