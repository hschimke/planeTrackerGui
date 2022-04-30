<script lang="ts">
    import type { FlightId } from "$lib/api/flight";
    import { getPassengersForFlight } from "$lib/api/passengers";
    import { loginState } from "$lib/data";

    export let flightId: FlightId = "";
    export let show = false;

    let passengerListPromise;
    let alread_found = false;

    $: {
        if (show && !alread_found) {
            passengerListPromise = getPassengersForFlight(
                $loginState,
                flightId
            );
            alread_found = true;
        }
    }
</script>

<div>
    {#if show}
        {#await passengerListPromise}
            <p>loading...</p>
        {:then passengerList}
            {#if passengerList.length === 0}
                No Passengers
            {/if}
            {#each passengerList as passenger}
                {passenger}
            {/each}
        {:catch e}
            {e}
        {/await}
    {/if}
</div>
