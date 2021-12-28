module.exports = {
    contracts_build_directory: "./client/src/artifact",
    networks: {
        development: {
            // from: "", // Defaults to first address from Ganache
            host: "127.0.0.1",
            port: 7545,
            network_id: "*",
        },
    },
    mocha: {},
    compilers: {
        solc: {
            version: "0.8.10",
        },
    },
};
