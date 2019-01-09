import update from 'react-addons-update';
import {
    ADD_TASK,
    ADD_TICKET,
    DELETE_TASK,
    LOAD_TICKETS,
    TOGGLE_TASK_STATUS,
    UPDATE_TASK_NAME,
    UPDATE_TICKET_STATUS
} from "../../constants/ActionTypes";
import {TicketStatus} from "../../components/app/kanban-board/ticket/TicketStatus";

const kanbanBoardReducer = (state = {tickets: []}, action) => {
    const payload = action.payload;

    console.log(payload);

    switch (action.type) {
        case ADD_TICKET:
            return {tickets: addTicket(state.tickets, payload.ticket)};
        case LOAD_TICKETS:
            return {tickets: payload};
        case UPDATE_TICKET_STATUS:
            return {tickets: updateTicketStatus(state.tickets, payload.ticketId, payload.newTicketStatus)};
        case ADD_TASK:
            return {tickets: addTask(state.tickets, payload.newTask)};
        case UPDATE_TASK_NAME:
            return {tickets: updateTaskName(state.tickets, payload.ticketId, payload.taskId, payload.taskName)};
        case TOGGLE_TASK_STATUS:
            return {tickets: updateTaskStatus(state.tickets, payload.ticketId, payload.taskId, payload.done)};
        case DELETE_TASK:
            return {tickets: deleteTask(state.tickets, payload.ticketId, payload.taskId)};
        default:
            return state;
    }
};

const addTicket = (tickets, newTicket) => {
    return update(tickets, {
        $push: [newTicket]
    });
};

const updateTicketStatus = (tickets, ticketId, newTicketStatus) => {
    const ticketIndex = findTicketIndex(ticketId, tickets);

    return update(tickets, {
        [ticketIndex]: {
            status: {
                $apply: () => {
                    return getTicketStatus(newTicketStatus)
                }
            }
        }
    });
};

const addTask = (tickets, newTask) => {
    const ticketIndex = findTicketIndex(newTask.ticketId, tickets);

    return update(tickets, {
        [ticketIndex]: {
            tasks: { $push: [newTask] }
        }
    });
};

const updateTaskName = (tickets, ticketId, taskId, newTaskName) => {
    const ticketIndex = findTicketIndex(ticketId, tickets);
    const taskIndex = findTaskIndex(taskId, tickets[ticketIndex].tasks);

    return update(this.state.tickets, {
        [ticketIndex]: {
            tasks: {
                [taskIndex]: {
                    name: {
                        $apply: () => {
                            return newTaskName;
                        }
                    }
                }
            }
        }
    });
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

const getTicketStatus = (status) => {
    switch (status) {
        case "todo": return TicketStatus.todo;
        case "in-progress": return TicketStatus.inProgress;
        case "finished": return TicketStatus.finished;
    }
};

export default kanbanBoardReducer;