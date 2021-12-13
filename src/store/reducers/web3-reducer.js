const web3Reducer = (state = null, action) => {
    switch (action.type) {
        case "ADD_WEB3":
            return action.payload;
        case "REMOVE_WEB3":
            return null;
        default:
            return null;
    }
};

export default web3Reducer;
