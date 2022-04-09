import type { LoginState } from "$lib/data";
import { performLogout } from "$lib/login";

const API_PREFIX = "localhost:1234/api"
const API_VERSION = "v1"

type FlightId = string;
type AirportCode = string;
type UserId = string

declare interface Flight {
    id: FlightId;
    origin: AirportCode;
    destination: AirportCode;
    tail_number: string;
    date: string;
    email: UserId;
}

declare interface GetAllRequest {
    user: UserId;
}

declare interface AddFlightReturn {
    id: FlightId;
}

type UpdateFlightReturn = AddFlightReturn;

declare interface DeleteFlightReturn {
    status: string;
}

export async function getFlights(loginState: LoginState): Promise<Flight[]> {
    const sendStruct: GetAllRequest = {
        user: loginState.email
    };
    const address = API_PREFIX + "/" + API_VERSION + "getFlights";
    const response = await fetch(address, {
        method: "POST",
        body: JSON.stringify(sendStruct),
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + loginState.token
        }
    });

    let returnData: Flight[] = [];

    switch (response.status) {
        case 200:
            returnData = JSON.parse(await response.json());
            break;
        case 401:
            alert("Unauthorized access, you have been logged out.")
            performLogout();
            break;
        default:
            break;
    }

    return returnData;
}

export async function addFlight(loginState: LoginState, flight: Flight): Promise<AddFlightReturn> {
    flight.email = loginState.email;
    const address = API_PREFIX + "/" + API_VERSION + "addFlight";
    const response = await fetch(address, {
        method: "POST",
        body: JSON.stringify(flight),
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + loginState.token
        }
    });

    let returnData: AddFlightReturn;

    switch (response.status) {
        case 200:
            returnData = JSON.parse(await response.json());
            break;
        case 401:
            alert("Unauthorized access, you have been logged out.")
            performLogout();
            break;
        default:
            break;
    }

    return returnData;
}

export async function deleteFlight(loginState: LoginState, flight: Flight): Promise<DeleteFlightReturn> {
    flight.email = loginState.email;
    const address = API_PREFIX + "/" + API_VERSION + "deleteFlight";
    const response = await fetch(address, {
        method: "POST",
        body: JSON.stringify(flight),
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + loginState.token
        }
    });

    let returnData: DeleteFlightReturn;

    switch (response.status) {
        case 200:
            returnData = JSON.parse(await response.json());
            break;
        case 401:
            alert("Unauthorized access, you have been logged out.")
            performLogout();
            break;
        default:
            break;
    }

    return returnData;
}

export async function updateFlight(loginState: LoginState, flight: Flight): Promise<UpdateFlightReturn> {
    flight.email = loginState.email;
    const address = API_PREFIX + "/" + API_VERSION + "updateFlight";
    const response = await fetch(address, {
        method: "POST",
        body: JSON.stringify(flight),
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + loginState.token
        }
    });

    let returnData: UpdateFlightReturn;

    switch (response.status) {
        case 200:
            returnData = JSON.parse(await response.json());
            break;
        case 401:
            alert("Unauthorized access, you have been logged out.")
            performLogout();
            break;
        default:
            break;
    }

    return returnData;
}