import type { LoginState } from "$lib/data";
import { checkResponse, API_PREFIX, API_VERSION } from "$lib/api/helpers";

export type FlightId = string;
export type AirportCode = string;
export type UserId = string
export type PlaneTail = string

export declare interface Flight {
    id: FlightId;
    origin: AirportCode;
    destination: AirportCode;
    tail_number: string;
    date: string;
    email: UserId;
}

export declare interface FlightRequest extends Flight {
    include_default_passengers: boolean;
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
    include_default_passengers: boolean;
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

    returnData = await checkResponse<Flight[]>(loginState, response)

    return returnData;
}

export async function addFlight(loginState: LoginState, flight: FlightRequest, includeDefault: boolean): Promise<AddFlightReturn> {
    flight.email = loginState.email;
    flight.include_default_passengers = includeDefault;

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

    const returnData: AddFlightReturn = await checkResponse<AddFlightReturn>(loginState, response);

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

    const returnData: DeleteFlightReturn = await checkResponse<DeleteFlightReturn>(loginState, response);

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

    const returnData: UpdateFlightReturn = await checkResponse<UpdateFlightReturn>(loginState, response);

    return returnData;
}

export async function bulkUploadFlight(loginState: LoginState, flightData: string, includeDefault: boolean): Promise<BuldUploadResponse> {
    let buildUploadData: BulkUploadRequest = {
        user: loginState.email,
        type: "shortcut",
        flight_data: flightData,
        include_default_passengers: includeDefault,
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

    const returnData: BuldUploadResponse = await checkResponse<BuldUploadResponse>(loginState, response);

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

    const returnData: PlaneDetailResponse = await checkResponse<PlaneDetailResponse>(loginState, response);

    return returnData;
}

export async function addPassengerToFlight(loginState: LoginState) { }