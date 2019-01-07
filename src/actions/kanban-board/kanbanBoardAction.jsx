import {ADD_TICKET, LOAD_TICKETS} from "../../constants/ActionTypes";

export const addTicket = (ticket) => ({
   type: ADD_TICKET,
   payload: ticket
});

export const loadTickets = (tickets) => ({
    type: LOAD_TICKETS,
    payload: tickets
});