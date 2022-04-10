<script lang="ts">
    import type { Flight } from "$lib/api/flight";
    import FlightDisplay from "./flightDisplay.svelte";
    import FlightEdit from "$lib/components/flightEdit.svelte";
    import { createEventDispatcher } from "svelte";
    import { deleteFlight } from "$lib/api/flight";
    import { loginState } from "$lib/data";

    export let flights: Flight[];

    let editId = "";

    const dispatch = createEventDispatcher();

    function doEdit(id) {
        editId = id;
    }
    async function doDelete(flight) {
        await deleteFlight($loginState, flight);
        dispatch("listedit", {
            type: "delete",
            id: flight.id,
        });
    }

    function passEdit(event) {
        const updatedId = event.detail.id;
        dispatch("listedit", {
            type: "update",
            id: updatedId,
        });
        editId = "";
    }
</script>

<div>
    {#each flights as flight (flight.id)}
        {#if editId === flight.id}
            <FlightEdit {flight} on:flightedit={passEdit} />
        {:else}
            <FlightDisplay {flight} />
            <button
                on:click={() => {
                    doEdit(flight.id);
                }}>Edit</button
            ><button
                on:click={() => {
                    doDelete(flight);
                }}>Delete</button
            >
        {/if}
    {/each}
</div>
