//const UPDATE_NEW_MESSAGE_BODY = 'UPDATE-NEW-MESSAGE-BODY';
const SEND_MESSAGE = 'social-network/dialog/SEND_MESSAGE';

export type InitialStateType = typeof initialState;
type dialogDataType = {
    id: number,
    name: string
};
type messageDataType = {
    id: number,
    message: string
};

let initialState = {
    dialogData: [
        {id: 1, name: 'Dima'},
        {id: 2, name: 'Lena'},
        {id: 3, name: 'Sveta'},
        {id: 4, name: 'Anna'},
        {id: 5, name: 'Sasha'},
    ] as Array<dialogDataType>,
    messageData: [
        {id: 1, message: 'Hi'},
        {id: 2, message: 'How are you?'},
        {id: 3, message: 'How is your day?'},
    ] as Array<messageDataType>
};

const dialogReducer = (state = initialState,
                       action: ActionsType): InitialStateType => {
    switch (action.type) {
        // case UPDATE_NEW_MESSAGE_BODY :
        //    return {
        //         ...state,
        //         newMessageBody: action.body
        //     };
        case SEND_MESSAGE :
            let body = action.newMessageBody;
            return {
                ...state,
                messageData: [...state.messageData, {id: 6, message: body}]
            };
        default:
            return state;
    }
};
type ActionsType = sendMessageActionCreatorType;
type sendMessageActionCreatorType = {
    type: typeof SEND_MESSAGE,
    newMessageBody: string
};

export const sendMessageActionCreator = (newMessageBody: string): sendMessageActionCreatorType => ({
    type: SEND_MESSAGE,
    newMessageBody
});
// export const updateNewMessageBodyActionCreator = (text) => (
//     {type: UPDATE_NEW_MESSAGE_BODY, body: text}
// );

export default dialogReducer;
