<script lang="ts">
    import type { Flight } from "$lib/api/flight";
    import FlightDisplay from "./flightDisplay.svelte";

    export let flights: Flight[];

    function doEdit(id) {
        alert(id);
    }
    function doDelete(id) {
        alert(id);
    }
</script>

<div>
    {#each flights as flight (flight.id)}
        <FlightDisplay {flight} />
        <button
            on:click={() => {
                doEdit(flight.id);
            }}>Edit</button
        ><button
            on:click={() => {
                doDelete(flight.id);
            }}>Delete</button
        >
    {/each}
</div>
