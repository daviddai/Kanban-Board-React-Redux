import update from 'react-addons-update';
import {ADD_TICKET, DELETE_TASK, LOAD_TICKETS, TOGGLE_TASK_STATUS} from "../../constants/ActionTypes";

const kanbanReducer = (state = {tickets: []}, action) => {
    const payload = action.payload;

    console.log(payload);

    switch (action.type) {
        case ADD_TICKET:
        case LOAD_TICKETS:
            return {tickets: payload};
        case TOGGLE_TASK_STATUS:
            return {tickets: updateTaskStatus(state.tickets, payload.ticketId, payload.taskId, payload.done)};
        case DELETE_TASK:
            return {tickets: deleteTask(state.tickets, payload.ticketId, payload.taskId)};
        default:
            return state;
    }
};

const updateTaskStatus = (tickets, ticketId, taskId, newTaskStatus) => {
    const ticketIndex = findTicketIndex(ticketId, tickets);
    const taskIndex = findTaskIndex(taskId, tickets[ticketIndex].tasks);

    return update(tickets, {
        [ticketIndex]: {
            tasks: {
                [taskIndex]: {
                    done: {
                        $apply: () => {
                            return newTaskStatus;
                        }
                    }
                }
            }
        }
    });
};

const deleteTask = (tickets, ticketId, taskId) => {
    const ticketIndex = findTicketIndex(ticketId, tickets);
    const taskIndex = findTaskIndex(taskId, tickets[ticketIndex].tasks);

    return update(tickets, {
        [ticketIndex]: {
            tasks: {
                $splice: [[taskIndex, 1]]
            }
        }
    });
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