import type { LoginState } from "$lib/data";
import type { UserId, FlightId, Flight } from "$lib/api/flight";
import { checkResponse, API_PREFIX, API_VERSION } from "$lib/api/helpers";

interface statusResponse {
    status: boolean;
}

export interface passenger {
    passenger_id: UserId;
    default_companion: boolean;
};

interface getPassengersForUserRequest {
    user: UserId;
}
interface getPassengersForUserResponse {
    passengers: passenger[];
}

interface addPassengerForUserRequest {
    user: UserId;
    passenger: passenger;
}
type addPassengerForUserResponse = statusResponse

interface removePassengerForUserRequest {
    user: UserId;
    passenger: UserId;
}
type removePassengerForUserResponse = statusResponse

interface setDefaultStatusForPassengerOfUserRequest {
    user: UserId;
    passenger: UserId;
    default_status: boolean;
}
type setDefaultStatusForPassengerOfUserResponse = statusResponse
interface addPassengerToFlightRequest {
    flight: FlightId;
    user: UserId;
    passenger: UserId;
}
type addPassengerToFlightResponse = statusResponse

type removePassengerFromFlightRequest = addPassengerToFlightRequest
type removePassengerFromFlightResponse = addPassengerToFlightResponse

interface getFlightsAsPassengerRequest {
    passenger: UserId;
}
interface getFlightsAsPassengerResponse {
    flights: Flight[];
}

export async function getPassengers(loginState: LoginState): Promise<passenger[]> {
    const sendStruct: getPassengersForUserRequest = {
        user: loginState.email
    };
    const address = API_PREFIX + "/" + API_VERSION + "getPassengersForUser";
    const response = await fetch(address, {
        method: "POST",
        body: JSON.stringify(sendStruct),
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + loginState.token,
            "X-PlaneTracker-Auth-Type-Request": loginState.type
        }
    });

    let returnData: getPassengersForUserResponse;

    returnData = await checkResponse<getPassengersForUserResponse>(loginState, response)

    return returnData.passengers;
}

export async function addPassenger(loginState: LoginState, passenger: passenger) {
    const sendStruct: addPassengerForUserRequest = {
        user: loginState.email,
        passenger: passenger
    };
    const address = API_PREFIX + "/" + API_VERSION + "addPassengerForUser";
    const response = await fetch(address, {
        method: "POST",
        body: JSON.stringify(sendStruct),
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + loginState.token,
            "X-PlaneTracker-Auth-Type-Request": loginState.type
        }
    });

    let returnData: addPassengerForUserResponse;

    returnData = await checkResponse<addPassengerForUserResponse>(loginState, response)

    return returnData.status;
}

export async function removePassenger(loginState: LoginState, passenger_id: UserId) {
    const sendStruct: removePassengerForUserRequest = {
        user: loginState.email,
        passenger: passenger_id
    };
    const address = API_PREFIX + "/" + API_VERSION + "removePassengerForUser";
    const response = await fetch(address, {
        method: "POST",
        body: JSON.stringify(sendStruct),
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + loginState.token,
            "X-PlaneTracker-Auth-Type-Request": loginState.type
        }
    });

    let returnData: removePassengerForUserResponse;

    returnData = await checkResponse<removePassengerForUserResponse>(loginState, response)

    return returnData.status;
}

export async function setPassengerDefaultValue(loginState: LoginState, passenger_id: UserId, defaultStatus: boolean) {
    const sendStruct: setDefaultStatusForPassengerOfUserRequest = {
        user: loginState.email,
        default_status: defaultStatus,
        passenger: passenger_id
    };
    const address = API_PREFIX + "/" + API_VERSION + "setDefaultStatusForPassengerOfUser";
    const response = await fetch(address, {
        method: "POST",
        body: JSON.stringify(sendStruct),
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + loginState.token,
            "X-PlaneTracker-Auth-Type-Request": loginState.type
        }
    });

    let returnData: setDefaultStatusForPassengerOfUserResponse;

    returnData = await checkResponse<setDefaultStatusForPassengerOfUserResponse>(loginState, response)

    return returnData.status;
}

export async function addPassengerToFlight(loginState: LoginState, flight: FlightId, passenger_id: UserId) {
    const sendStruct: addPassengerToFlightRequest = {
        user: loginState.email,
        flight: flight,
        passenger: passenger_id
    };
    const address = API_PREFIX + "/" + API_VERSION + "addPassengerToFlight";
    const response = await fetch(address, {
        method: "POST",
        body: JSON.stringify(sendStruct),
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + loginState.token,
            "X-PlaneTracker-Auth-Type-Request": loginState.type
        }
    });

    let returnData: addPassengerToFlightResponse;

    returnData = await checkResponse<addPassengerToFlightResponse>(loginState, response)

    return returnData.status;
}

export async function removePassengerFrom(loginState: LoginState, flight: FlightId, passenger_id: UserId) {
    const sendStruct: removePassengerFromFlightRequest = {
        user: loginState.email,
        flight: flight,
        passenger: passenger_id
    };
    const address = API_PREFIX + "/" + API_VERSION + "removePassengerFromFlight";
    const response = await fetch(address, {
        method: "POST",
        body: JSON.stringify(sendStruct),
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + loginState.token,
            "X-PlaneTracker-Auth-Type-Request": loginState.type
        }
    });

    let returnData: removePassengerFromFlightResponse;

    returnData = await checkResponse<removePassengerFromFlightResponse>(loginState, response)

    return returnData.status;
}

export async function getPassengerFlights(loginState: LoginState): Promise<Flight[]> {
    const sendStruct: getFlightsAsPassengerRequest = {
        passenger: loginState.email
    };
    const address = API_PREFIX + "/" + API_VERSION + "getFlightsAsPassenger";
    const response = await fetch(address, {
        method: "POST",
        body: JSON.stringify(sendStruct),
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + loginState.token,
            "X-PlaneTracker-Auth-Type-Request": loginState.type
        }
    });

    let returnData: getFlightsAsPassengerResponse;

    returnData = await checkResponse<getFlightsAsPassengerResponse>(loginState, response)

    return returnData.flights;
} 