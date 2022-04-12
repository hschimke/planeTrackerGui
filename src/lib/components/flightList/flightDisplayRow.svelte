<script lang="ts">
    import type { Flight } from "$lib/api/flight";
    export let flight: Flight;
</script>

<tr>
    <td>{flight.origin}</td>
    <td>{flight.destination}</td>
    <td>{flight.tail_number}</td>
    <td>{flight.date}</td>
    <td><slot /></td>
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
</style>