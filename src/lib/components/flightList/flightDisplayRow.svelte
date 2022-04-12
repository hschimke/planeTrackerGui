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
