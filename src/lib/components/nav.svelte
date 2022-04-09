<script lang="ts">
    import { loginState } from "$lib/data";
    import Logout from "$lib/components/logout.svelte";
</script>

<ul>
    <li>
        <a href="/">Home</a>
    </li>
    <li>
        <a href="/flights">Flights</a>
    </li>
    <li>
        <div>
            {#if $loginState.email !== ""}
                {$loginState.email} <Logout />
            {:else}
                <p>Please login</p>
            {/if}
        </div>
    </li>
</ul>
