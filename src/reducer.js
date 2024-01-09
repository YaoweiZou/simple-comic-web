/**
 *
 * @param {Object} state
 * @param {string[]} state.imageUrls
 * @param {number} state.pageIndex
 * @param {"Single" | "Double" | "Webtoon"} state.readMode
 * @param {"RightToLeft" | "LeftToRight" | "TopToBottom"} state.readOrder
 * @param {boolean} state.isLoading
 * @param {Object} action
 * @param {"SET_IMAGE_URLS"| "SET_PAGE_INDEX"
 * | "SET_READ_MODE" | "SET_READ_ORDER" | "TOGGLE_LOADING"
 * | "NEXT_PAGE" | "PREV_PAGE" | "MATCH_PAGE"} action.type
 * @param {number | string | string[]} [action.payload]
 */
export default function reducer(state, action) {
  switch (action.type) {
    case "SET_IMAGE_URLS":
      if (state.imageUrls.length !== 0) {
        state.imageUrls.forEach(url => URL.revokeObjectURL(url));
      }
      return {
        ...state,
        imageUrls: action.payload
      };
    case "SET_PAGE_INDEX":
      return {
        ...state,
        pageIndex: action.payload
      };
    case "SET_READ_MODE":
      return {
        ...state,
        readMode: action.payload
      };
    case "SET_READ_ORDER":
      return {
        ...state,
        readOrder: action.payload
      };
    case "TOGGLE_LOADING":
      return {
        ...state,
        isLoading: !state.isLoading
      };
    case "NEXT_PAGE": {
      let addend = 0;
      if (state.readMode === "Single") {
        addend = 1;
      } else if (state.readMode === "Double") {
        addend = 2;
      }
      if (state.pageIndex === state.imageUrls.length - 1) {
        addend = 0;
      }
      return {
        ...state,
        pageIndex: state.pageIndex + addend
      };
    }
    case "PREV_PAGE": {
      let addend = 0;
      if (state.readMode === "Single") {
        addend = 1;
      } else if (state.readMode === "Double") {
        addend = 2;
      }
      if (state.pageIndex === 0) {
        addend = 0;
      }
      return {
        ...state,
        pageIndex: state.pageIndex - addend
      };
    }
    case "MATCH_PAGE":
      if (state.readMode === "Double" && state.pageIndex < state.imageUrls.length - 1) {
        return {
          ...state,
          pageIndex: state.pageIndex + 1
        };
      }
      return state;
    default:
      throw new Error(`Unknown action type: ${action.type}`);
  }
}
