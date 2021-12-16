import { useEffect } from "react";
import Web3 from "web3";

const useWeb3 = ({ abi, networks }) => {
    useEffect(() => {
        const func = async () => {
            let contractABI = abi;
            let contractAddress = networks[5777].address;
            let web3 = null;
            if (window.ethereum)
                try {
                    await window.ethereum.request({
                        method: "eth_requestAccounts",
                    });
                    web3 = new Web3(window.ethereum);
                } catch (e) {
                    console.log(e.message);
                    return;
                }
            else if (window.web3) web3 = new Web3(window.web3.currentProvider);
            else web3 = new Web3("http://127.0.0.1:9545/");
            let contract = new web3.eth.Contract(contractABI, contractAddress);

            setWeb3(web3);
            setContract(contract);
            setIsPending(false);
        };
        func();
    }, [abi, networks]);

    return [web3, contract, isPending];
};

export default useWeb3;
