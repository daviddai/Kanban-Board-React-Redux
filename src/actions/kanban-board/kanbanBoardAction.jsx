import axios from "axios";

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

const tickets = [
    {
        id: 1,
        title: "Read the Book",
        description: "I should read the **whole** book",
        status: TicketStatus.todo,
        tasks: []
    },
    {
        id: 2,
        title: "Write some code",
        description: "Code along with the samples in the book. The complete source can be found at [github](https://github.com/pro-react)",
        status: TicketStatus.inProgress,
        tasks: [
            {id: 1, name: "ContactList Example", done: true},
            {id: 2, name: "Kanban Example", done: false},
            {id: 3, name: "My own experiments", done: false}
        ]
    }
];

export const addTicket = (ticket) => {
    return (dispatch) => {
        return axios.post("http://localhost:8083/ticket/create", ticket)
                    .then(response => {
                        let ticketDTO = Object.assign({}, response.data.ticketDTO);
                        const ticketStatusCode = ticketDTO.status;
                        ticketDTO.status = getTicketSideColorByStatus(ticketStatusCode);

                        dispatch({
                            type: ADD_TICKET,
                            payload: {
                                succeed: true,
                                ticket: ticketDTO
                            }
                        });
                    })
                    .catch(error => {
                        console.log(error);

                        dispatch({
                            type: ADD_TICKET,
                            payload: {
                                succeed: false,
                                ticket: null
                            }
                        });
                    });
    };
};

export const updateTicketStatus = (ticketId, newTicketStatus) => {
    return (dispatch) => {
        const updateTicketStatusRequest = {
            ticketId: ticketId,
            newTicketStatus: newTicketStatus
        };

        return axios.post('http://localhost:8083/ticket/update/status', updateTicketStatusRequest)
                    .then(response => {
                        if (response.status == 200) {
                            dispatch({
                                type: UPDATE_TICKET_STATUS,
                                payload: updateTicketStatusRequest
                            });
                        }
                    })
                    .catch(error => {
                        console.log(error);
                    });
    };
};

export const loadTickets = () => {
    return (dispatch) => {
        return axios.get("http://localhost:8083/ticket/all")
                    .then(
                        response => {
                            const tickets = response.data.map(ticket => {
                                ticket.status = getTicketSideColorByStatus(ticket.status);
                                return ticket;
                            });

                            dispatch({
                                type: LOAD_TICKETS,
                                payload: tickets
                            });
                    })
                    .catch(error => {
                        // use fall back data
                        console.log(error);
                        dispatch({
                            type: LOAD_TICKETS,
                            payload: tickets
                        });
                    });
    };
};

export const addTask = (ticketId, taskName) => {
    return (dispatch) => {
        let newTask = {
            id: -1,
            name: taskName,
            done: false,
            ticketId: ticketId
        };

        return axios.post("http://localhost:8083/task/add", newTask)
                    .then(response => {
                        if (response.data.succeed) {
                            newTask.id = response.data.taskId;
                            dispatch({
                               type: ADD_TASK,
                               payload: {
                                   newTask: newTask
                               }
                            });
                        }
                    })
                    .catch(error => {
                        console.log(error);
                    });
    };
};

export const updateTaskName = (ticketId, taskId, newTaskName) => {
    return (dispatch) => {
        const updateTaskNameRequest = {
            ticketId: ticketId,
            taskId: taskId,
            taskName: newTaskName
        };

        return axios.post("http://localhost:8083/task/update/name", updateTaskNameRequest)
                    .then(response => {
                            if (response.data.succeed) {
                                dispatch({
                                    type: UPDATE_TASK_NAME,
                                    payload: updateTaskNameRequest
                                })
                            }
                    })
                    .catch(error => {
                        console.log(error);
                    });
    }   ;
};

export const toggleTaskStatus = (ticketId, taskId, newTaskStatus) => {
    return (dispatch) => {
        const toggleTaskRequest = {
            "ticketId": ticketId,
            "taskId": taskId,
            "done": newTaskStatus
        };

        return axios.post("http://localhost:8083/task/update/status", toggleTaskRequest)
                    .then(response => {
                        if (response.data.succeed) {
                            dispatch({
                                type: TOGGLE_TASK_STATUS,
                                payload: toggleTaskRequest
                            });
                        }
                    })
                    .catch(error => {
                        console.log(error);

                        dispatch({
                            type: TOGGLE_TASK_STATUS,
                            payload: toggleTaskRequest
                        });
                    });
    };
};

export const deleteTask = (ticketId, taskId) => {
    return (dispatch) => {
        return axios.post("http://localhost:8083/task/delete/" + ticketId + "/" + taskId)
                    .then(response => {
                        if (response.data.succeed) {
                            dispatch({
                               type: DELETE_TASK,
                               payload: {
                                   ticketId: ticketId,
                                   taskId: taskId
                               }
                            });
                        }
                    })
                    .catch(error => {
                        console.log(error);
                    });
    };
};

const getTicketSideColorByStatus = (status) => {
    if (status === 'todo') {
        return TicketStatus.todo;
    } else if (status === 'in-progress') {
        return TicketStatus.inProgress;
    } else {
        return TicketStatus.finished;
    }
};