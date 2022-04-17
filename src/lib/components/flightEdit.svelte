<script lang="ts">
    import type { Flight, FlightRequest } from "$lib/api/flight";
    import { addFlight, updateFlight } from "$lib/api/flight";
    import { loginState } from "$lib/data";
    import { createEventDispatcher } from "svelte";
    import { getProperDateFormatForNow } from "$lib/dateFormat";

    const dispatch = createEventDispatcher();

    export let flight: Flight = {
        id: "",
        origin: "",
        destination: "",
        tail_number: "",
        date: getProperDateFormatForNow(),
        email: "",
    };

    let includeDefaultPassengers : boolean = false;

    let buttonText = "Add";
    if (flight.id !== "") {
        buttonText = "Update";
    }
    async function doClick() {
        if (buttonText === "Add") {
            await addFlight($loginState, flight as FlightRequest, includeDefaultPassengers);
            dispatch("flightedit", {
                type: "add",
            });
            flight = {
                id: "",
                origin: "",
                destination: "",
                tail_number: "",
                date: getProperDateFormatForNow(),
                email: "",
            };
        } else if (buttonText === "Update") {
            await updateFlight($loginState, flight);
            dispatch("flightedit", {
                type: "update",
                id: flight.id,
            });
        } else {
            alert("Cannot complete");
        }
    }
</script>

<label>
    <span>Origin</span>
    <input type="text" placeholder="Origin" title="Origin" bind:value={flight.origin} />
</label>
<label>
    <span>Destination</span>
    <input type="text" placeholder="Destination" title="Destination" bind:value={flight.destination} />
</label>
<label>
    <span>Tail</span>
    <input type="text" placeholder="Tail" title="Tail" bind:value={flight.tail_number} />
</label>
<label>
    <span>Date</span>
    <input type="date" bind:value={flight.date} />
</label>
{#if buttonText === "Add"}
<label>
    <span>Default Passengers</span>
    <input type="checkbox" bind:checked={includeDefaultPassengers} />
    </label>
{/if}

<button on:click={doClick}>{buttonText}</button>

<style>
    label span {
        display: none;
    }
    input {
        max-width: 10em;
    }
    @media only screen and (max-width: 600px) {
    input {
        max-width: 5em;
    }
    input[type="date"]{
        max-width: 8em;
    }
}
</style>