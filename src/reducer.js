export default function reducer(state, action) {
    switch (action.type) {
        case "DEFAULT":
            return {
                pageNumber: 0,
                readType: "RightToLeft",
                isLoading: false,
            };
        case "SET_READ_TYPE":
            return {
                ...state,
                readType: action.payload,
            };
        case "NEXT_PAGE":
            if (state.readType === "TopToBottom") {
                return {
                    ...state,
                    pageNumber: state.pageNumber + 1,
                };
            }
            return {
                ...state,
                pageNumber: state.pageNumber + 2,
            };
        case "PREV_PAGE":
            if (state.readType === "TopToBottom") {
                return {
                    ...state,
                    pageNumber: state.pageNumber - 1,
                };
            }
            return {
                ...state,
                pageNumber: state.pageNumber - 2,
            };
        case "SET_PAGE":
            return {
                ...state,
                pageNumber: action.payload,
            };
        case "ToggleLoadingState":
            return {
                ...state,
                isLoading: !state.isLoading,
            };
        default:
            return state;
    }
}
