export const addWeb3 = (web3) => {
    return {
        type: "ADD_WEB3",
        payload: web3,
    };
};
export const removeWeb3 = () => {
    return {
        type: "REMOVE_WEB3",
    };
};
