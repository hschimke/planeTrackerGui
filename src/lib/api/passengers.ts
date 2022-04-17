import type { LoginState } from "$lib/data";
import type { UserId, FlightId, Flight } from "$lib/api/flight";
import { checkResponse } from "$lib/api/helpers";

interface statusResponse {
    status: boolean;
}

interface passenger {
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

export async function getPassengers(loginState: LoginState) { } //getPassengersForUser
export async function addPassenger(loginState: LoginState) { } //addPassengerForUser
export async function removePassenger(loginState: LoginState) { } //removePassengerForUser
export async function setPassengerDefaultValue(loginState: LoginState) { } //setDefaultStatusForPassengerOfUser

export async function addPassengerToFlight(loginState: LoginState) { } //addPassengerToFlight
export async function removePassengerFrom(loginState: LoginState) { } //removePassengerFromFlight
export async function getPassengerFlights(loginState: LoginState) { } //getFlightsAsPassenger