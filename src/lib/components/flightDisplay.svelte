<script lang="ts">
    import type { Flight } from "$lib/api/flight";
    export let flight: Flight;
</script>

<div>
    <span>{flight.origin}</span>
    <span>{flight.destination}</span>
    <span>{flight.tail_number}</span>
    <span>{flight.date}</span>
</div>
