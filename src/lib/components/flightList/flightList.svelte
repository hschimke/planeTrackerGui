<script lang="ts">
    import type { Flight } from "$lib/api/flight";
    import FlightDisplayRow from "$lib/components/flightList/flightDisplayRow.svelte";
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

    function doCancelEdit() {
        editId = "";
    }
</script>

<table>
    <tr>
        <th>Orig</th>
        <th>Dest</th>
        <th>Tail</th>
        <th>Date</th>
        <th />
    </tr>
    {#each flights as flight (flight.id)}
        {#if editId === flight.id}
            <tr>
                <td colspan="5">
                    <FlightEdit {flight} on:flightedit={passEdit} />
                    <button on:click={doCancelEdit}>Cancel</button>
                </td>
            </tr>
        {:else}
            <FlightDisplayRow {flight}>
                <button
                    on:click={() => {
                        doEdit(flight.id);
                    }}>Edit</button
                ><button
                    on:click={() => {
                        doDelete(flight);
                    }}>Delete</button
                >
            </FlightDisplayRow>
        {/if}
    {/each}
</table>

<style>
    tr {
        height: 1.75em;
    }

    th {
        text-align: left;
    }

    table {
        border-collapse: collapse;
        margin-left: 2em;
        max-width: 60%;
    }

    tr:nth-child(even) {
        background-color: #999999;
    }

    @media only screen and (max-width: 600px) {
        table {
            margin-left: .5em;
        }
    }
</style>
