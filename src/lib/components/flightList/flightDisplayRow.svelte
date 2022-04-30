<script lang="ts">
    import type { Flight } from "$lib/api/flight";
import PaxPopup from "$lib/components/flightList/paxPopup.svelte";
    export let flight: Flight;

    let paxShowId = "";

    const onOver = (flightId) => {
        paxShowId = flightId;
    }
    const onOut = (flightId) => {
        paxShowId = "";
    }
</script>

<tr>
    <td class="airport">{flight.origin}</td>
    <td class="airport">{flight.destination}</td>
    <td><a href="/planes/{flight.tail_number}">{flight.tail_number}</a></td>
    <td class="date">{flight.date}</td>
    <td class="pax" on:mouseleave={() => {onOut(flight.id)}} on:mouseover={() => {onOver(flight.id)}}>
        {flight.passenger_count}
        <PaxPopup flightId={flight.id} show={paxShowId === flight.id} />
    </td>
    <td class="buttons"><slot /></td>
</tr>

<style>
    tr {
        height: 1.25em;
        font-family: monospace;
    }

    tr:nth-child(even) {
        background-color: #999999;
    }

    td {
        max-width: 16em;
        min-width: 9em;
    }

    td.pax {
        max-width: 3em;
    }

    @media only screen and (max-width: 600px) {
        td {
            min-width: 6em;
            max-width: 6em;
        }

        td.date {
            min-width: 7em;
        }

        td.buttons {
            min-width: 10em;
        }

        td.airport {
            min-width: 4em;
        }
    }

    @media only screen and (max-width: 400px) {
        td {
            min-width: 5em;
            max-width: 5em;
        }

        td.airport {
            min-width: 3em;
        }
    }
</style>
