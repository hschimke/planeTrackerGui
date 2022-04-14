import type { LoginState } from "$lib/data";
import { performLogout } from "$lib/login";

const API_PREFIX = (import.meta.env.VITE_API_ENDPOINT == "" || import.meta.env.VITE_API_ENDPOINT == undefined) ? "https://api.planetracker.azule.info/api" : import.meta.env.VITE_API_ENDPOINT;
const API_VERSION = "v1/"

type FlightId = string;
type AirportCode = string;
type UserId = string
type PlaneTail = string

export declare interface Flight {
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

declare interface BulkUploadRequest {
    user: UserId;
    type: string;
    flight_data: string;
}

declare interface BuldUploadResponse {
    flights: FlightId[]
}

declare interface PlaneDetailRequest {
    tail: PlaneTail
    user: UserId
}

declare interface PlaneDetailResponse {
    tail: PlaneTail
    user: UserId
    flights: Flight[]
    seen: number
    routes: {
        origin: AirportCode
        destination: AirportCode
        count: number
    }[]
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
            "Authorization": "Bearer " + loginState.token,
            "X-PlaneTracker-Auth-Type-Request": loginState.type
        }
    });

    let returnData: Flight[] = [];

    switch (response.status) {
        case 200:
            returnData = await response.json();
            break;
        case 401:
            alert("Unauthorized access, you have been logged out.")
            performLogout(loginState);
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
            "Authorization": "Bearer " + loginState.token,
            "X-PlaneTracker-Auth-Type-Request": loginState.type
        }
    });

    let returnData: AddFlightReturn;

    switch (response.status) {
        case 200:
            returnData = await response.json();
            break;
        case 401:
            alert("Unauthorized access, you have been logged out.")
            performLogout(loginState);
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
            "Authorization": "Bearer " + loginState.token,
            "X-PlaneTracker-Auth-Type-Request": loginState.type
        }
    });

    let returnData: DeleteFlightReturn;

    switch (response.status) {
        case 200:
            returnData = await response.json();
            break;
        case 401:
            alert("Unauthorized access, you have been logged out.")
            performLogout(loginState);
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
            "Authorization": "Bearer " + loginState.token,
            "X-PlaneTracker-Auth-Type-Request": loginState.type
        }
    });

    let returnData: UpdateFlightReturn;

    switch (response.status) {
        case 200:
            returnData = await response.json();
            break;
        case 401:
            alert("Unauthorized access, you have been logged out.")
            performLogout(loginState);
            break;
        default:
            break;
    }

    return returnData;
}

export async function bulkUploadFlight(loginState: LoginState, flightData: string): Promise<BuldUploadResponse> {
    let buildUploadData: BulkUploadRequest = {
        user: loginState.email,
        type: "shortcut",
        flight_data: flightData
    }

    const address = API_PREFIX + "/" + API_VERSION + "bulkAddFlights";
    const response = await fetch(address, {
        method: "POST",
        body: JSON.stringify(buildUploadData),
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + loginState.token,
            "X-PlaneTracker-Auth-Type-Request": loginState.type
        }
    });

    let returnData: BuldUploadResponse;

    switch (response.status) {
        case 200:
            returnData = await response.json();
            break;
        case 401:
            alert("Unauthorized access, you have been logged out.")
            performLogout(loginState);
            break;
        default:
            break;
    }

    return returnData;
}

export async function getPlaneDetails(loginState: LoginState, tail: PlaneTail): Promise<PlaneDetailResponse> {
    const sendStruct: PlaneDetailRequest = {
        tail: tail,
        user: loginState.email
    };
    const address = API_PREFIX + "/" + API_VERSION + "getPlaneDetails";
    const response = await fetch(address, {
        method: "POST",
        body: JSON.stringify(sendStruct),
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + loginState.token,
            "X-PlaneTracker-Auth-Type-Request": loginState.type
        }
    });

    let returnData: PlaneDetailResponse

    switch (response.status) {
        case 200:
            returnData = await response.json();
            break;
        case 401:
            alert("Unauthorized access, you have been logged out.")
            performLogout(loginState);
            break;
        default:
            break;
    }

    return returnData;
}