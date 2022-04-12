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
    <thead>
        <tr>
            <td>Origin</td>
            <td>Destination</td>
            <td>Tail</td>
            <td>Date</td>
            <td />
        </tr>
    </thead>
    <tdata>
        {#each flights as flight (flight.id)}
            {#if editId === flight.id}
            <tr>
                <td colspan="4"><FlightEdit {flight} on:flightedit={passEdit} /></td>
                <td><button on:click={doCancelEdit}>Cancel</button></td>
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
    </tdata>
</table>
