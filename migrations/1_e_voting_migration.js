const EVoting = artifacts.require("evoting");

module.exports = function (deployer) {
    deployer.deploy(
        EVoting,
        "Soumen",
        "Khara",
        "soumen@gmail.com",
        931113000000,
        "8945612397",
        "12345678900"
    );
};
