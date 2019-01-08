import {ADD_TICKET, LOAD_TICKETS, TOGGLE_TASK_STATUS} from "../../constants/ActionTypes";

const kanbanReducer = (state = {tickets: []}, action) => {
    switch (action.type) {
        case ADD_TICKET:
        case LOAD_TICKETS:
            return {tickets: action.payload};
        case TOGGLE_TASK_STATUS:
            const payload = action.payload;
            let newTickets = Object.assign([], state.tickets);
            updateTaskStatus(newTickets, payload.ticketId, payload.taskId, payload.done);
            return {tickets: newTickets};
        default:
            return state;
    }
};

const updateTaskStatus = (newTickets, ticketId, taskId, newTaskStatus) => {
    const ticketIndex = findTicketIndex(ticketId, newTickets);
    const taskIndex = findTaskIndex(taskId, newTickets[ticketIndex].tasks);
    newTickets[ticketIndex].tasks[taskIndex].done = newTaskStatus;
};

const findTicketIndex = (ticketId, tickets) => {
    return tickets.findIndex(ticket => {
        return ticket.id == ticketId;
    })
};

const findTaskIndex = (taskId, tasks) => {
    return tasks.findIndex(task => {
        return task.id == taskId;
    })
};

export default kanbanReducer;