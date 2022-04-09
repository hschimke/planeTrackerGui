<script lang="ts">
    import {performLogout} from "$lib/login";

    async function doLogout() {
       performLogout();
    }
</script>

<button on:click={doLogout}>Logout</button>