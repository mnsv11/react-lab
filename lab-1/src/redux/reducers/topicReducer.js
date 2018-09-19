export default function topicReducer(state = [], action) {
    switch (action.type) {
        case 'CREATE_TOPIC':
            return [...state,
                Object.assign({}, action.topic)
            ];

        default:
            return state;
    }
}