<script lang="ts">
    import { loginState } from "$lib/data";
    import type { Flight } from "$lib/api/flight";
    import { getFlights } from "$lib/api/flight";
    import { getPassengerFlights } from "$lib/api/passengers";

    let includeFlightsAsPassenger = false;

    const getAllFlights = async (): Promise<Flight[]> => {
        const allFlights: Flight[] = [];
        allFlights.push(...(await getFlights($loginState)));

        if (includeFlightsAsPassenger) {
            allFlights.push(...(await getPassengerFlights($loginState)));
        }
        return allFlights;
    };

    const onDownloadCSV = async () => {
        const flights = await getFlights($loginState);
        let csvContent =
            'Tail, Origin, Destination, Date, Was Passenger\n' +
            flights
                .map((flight) => {
                    return `${flight.tail_number}, ${flight.origin}, ${flight.destination}, ${flight.date}, false`;
                })
                .join("\n");
        if (includeFlightsAsPassenger) {
            const passengerFlights = await getPassengerFlights($loginState);
            if (passengerFlights.length > 0) {
                csvContent =
                    csvContent +
                    passengerFlights
                        .map((flight) => {
                            return `${flight.tail_number}, ${flight.origin}, ${flight.destination}, ${flight.date}, true`;
                        })
                        .join("\n");
            }
        }

        const aForDl = document.createElement("a");
        aForDl.href = window.URL.createObjectURL(
            new Blob([csvContent], { type: "text/csv" })
        );
        aForDl.download = "flights.csv";
        aForDl.click();
    };

    const onDownloadAppleShortcut = async () => {
        const flights = await getAllFlights();
        let data = "PlanesTracker\n";
        data =
            data +
            flights.map((flight) => {
                return `${flight.tail_number} ${flight.origin} ${flight.destination} ${flight.date}`;
            }).join("\n");

        const aForDl = document.createElement("a");
        aForDl.href = window.URL.createObjectURL(
            new Blob([data], { type: "text/plain" })
        );
        aForDl.download = "flights.text";
        aForDl.click();
    };
</script>

<h2>Download Data</h2>
<p>
    We never want your data to be locked down, so there are always easy options
    to export it.
</p>
<p>
    By default we do not include flights where you are listed as a passenger.
    Please check the beloow box if you would like those included. Please note
    that if you select this option and use the Apple Shortcut version there is
    no field that indicates that you are a passenger, this information will be
    lost in the download. This is not the case with the CSV format, which
    includes a column named "Was Passenger".
</p>

<label>
    <span>Include flights where I am a passenger?</span>
    <input type="checkbox" bind:checked={includeFlightsAsPassenger} />
</label>
<button on:click={onDownloadCSV}>Download CSV</button>
<button on:click={onDownloadAppleShortcut}
    >Download Apple Shortcut Version</button
>
