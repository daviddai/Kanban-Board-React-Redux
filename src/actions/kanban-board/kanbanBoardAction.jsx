import axios from "axios";

import {ADD_TICKET, LOAD_TICKETS, TOGGLE_TASK_STATUS} from "../../constants/ActionTypes";
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

export const addTicket = (ticket) => ({
   type: ADD_TICKET,
   payload: ticket
});

export const loadTickets = () => {
    return (dispatch) => {
        return axios.get("http://localhost:8083/ticket/all")
                    .then(
                        response => {
                            const tickets = response.data.map(ticket => {
                                ticket.color = getTicketSideColorByStatus(ticket.status);
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

export const toggleTaskStatus = (ticketId, taskId, oldTaskStatus) => {
    return (dispatch) => {
        const newTaskStatus = !oldTaskStatus;
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
                                payload: {
                                    "ticketId": ticketId,
                                    "taskId": taskId,
                                    "done": newTaskStatus
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
        return '#3A7E28'
    } else if (status === 'in-progress') {
        return '#BD8D31';
    } else {
        return '';
    }
};