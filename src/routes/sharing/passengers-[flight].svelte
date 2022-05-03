<script lang="ts">
    import { page } from "$app/stores";
    import { loginState } from "$lib/data";
    import {
        getPassengers,
        addPassengerToFlight,
        getPassengersForFlight,
        removePassengerFrom,
    } from "$lib/api/passengers";
    import { getFlightDetails } from "$lib/api/flight";

    const flight = $page.params.flight;

    let flightDetailsPromise = getFlightDetails($loginState, flight);

    let passengersPromise = getPassengers($loginState);
    let passengersOnFlightPromise = getPassengersForFlight($loginState, flight);

    const addPax = async (passenger) => {
        await addPassengerToFlight($loginState, flight, passenger);
        passengersOnFlightPromise = getPassengersForFlight($loginState, flight);
    };
    const removePax = async (passenger) => {
        await removePassengerFrom($loginState, flight, passenger);
        passengersOnFlightPromise = getPassengersForFlight($loginState, flight);
    };
</script>

{#await flightDetailsPromise}
    <h2>Passengers</h2>
{:then flightDetails}
    <h2>
        Passengers on {flightDetails.origin} -> {flightDetails.destination} [{flightDetails.date}]
    </h2>
{/await}
{#await passengersPromise}
    ... wait passengers ...
{:then passengers}
    {#await passengersOnFlightPromise}
        --- wait load ---
    {:then passengersOnFlight}
        <div class="passengerFlightListBox">
            {#each passengers as passenger}
                <div>
                    {passenger.passenger_id}
                </div>
                <div>
                    {passengersOnFlight.includes(passenger.passenger_id)
                        ? "On Flight"
                        : "Not On Flight"}
                </div>
                <div>
                    {#if passengersOnFlight.includes(passenger.passenger_id)}
                        <button
                            on:click={() => {
                                removePax(passenger.passenger_id);
                            }}
                        >
                            Remove
                        </button>
                    {:else}
                        <button
                            on:click={() => {
                                addPax(passenger.passenger_id);
                            }}
                        >
                            Add
                        </button>
                    {/if}
                </div>
            {/each}
        </div>
    {/await}
{/await}

<style>
    .passengerFlightListBox {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        max-width: 30em;
    }
</style>
