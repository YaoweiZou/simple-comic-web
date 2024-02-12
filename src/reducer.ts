export type State = {
  imageUrls: string[];
  pageIndex: number;
  readMode: "Single" | "Double" | "Webtoon";
  readOrder: "LTR" | "RTL" | "TTB";
  isLoading: boolean;
};

export type Action = {
  type:
    | "SET_IMAGE_URLS"
    | "SET_PAGE_INDEX"
    | "SET_READ_MODE"
    | "SET_READ_ORDER"
    | "TOGGLE_LOADING"
    | "NEXT_PAGE"
    | "PREV_PAGE"
    | "MATCH_PAGE";
  payload: number | string | string[];
};

export default function reducer(state: State, action: Action) {
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
