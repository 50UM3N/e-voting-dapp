const EVotingContract = artifacts.require("evoting");
contract("EVoting", (accounts) => {
    let eVotingContract = null;
    before(async () => {
        eVotingContract = await EVotingContract.deployed();
    });

    it("Get the admin voter and should be admin", async () => {
        const user = await eVotingContract.getVoter({ from: accounts[0] });
        assert(user.role === "admin");
    });

    it("Register voter and get voter and role should be user and must be unverified", async () => {
        let currentAccount = accounts[1];
        await eVotingContract.register(
            "Arnab",
            "Mondal",
            "arnab@gmail.com",
            931113000000,
            "8945612397",
            "12345678900",
            { from: currentAccount }
        );
        const user = await eVotingContract.getVoter({ from: currentAccount });
        assert(user.role === "user");
        assert(!user.verified);
    });

    it("Get unverified voter and should give an array of size 1 containing Arnab", async () => {
        const voters = await eVotingContract.getUnverifiedVoter({
            from: accounts[0],
        });
        assert(voters[0].fname === "Arnab");
        assert(!voters[0].verified);
    });

    it("Verify voter from user and should not verified as admin only verify voter ", async () => {
        let currentAccount = accounts[1];
        try {
            await eVotingContract.verifyVoter(currentAccount, {
                from: currentAccount,
            });
            assert.isOk(false);
        } catch (e) {
            assert.isOk(true);
        }
    });

    it("Verify voter from admin and should be verified", async () => {
        let currentAccount = accounts[1];
        await eVotingContract.verifyVoter(currentAccount, {
            from: accounts[0],
        });
        const user = await eVotingContract.getVoter({ from: currentAccount });
        assert(user.verified);
    });

    it("Add team by a user and should not be added by the user", async () => {
        let currentAccount = accounts[1];
        try {
            await eVotingContract.addTeam(
                "Sumit Paul",
                "Work for something",
                "Team 1",
                {
                    from: currentAccount,
                }
            );
            assert.isOk(false);
        } catch (e) {
            assert.isOk(true);
        }
    });
    it("Add two teams and should get the two teams details", async () => {
        await eVotingContract.addTeam(
            "Sumit Paul",
            "Work for something",
            "Team 1",
            {
                from: accounts[0],
            }
        );
        await eVotingContract.addTeam(
            "Manisha Something",
            "Work for something else",
            "Team 2",
            {
                from: accounts[0],
            }
        );
        const teams = await eVotingContract.getTeams({ from: accounts[0] });
        assert(teams[0].representative === "Sumit Paul");
        assert(teams[1].representative === "Manisha Somthing");
    });

    it("Should not give vote by a not verified voter", async () => {
        let currentAccount = accounts[2];
        await eVotingContract.register(
            "Sohan",
            "Kanrar",
            "sohan@gmail.com",
            931113000000,
            "8945612397",
            "12345678900",
            { from: currentAccount }
        );
        try {
            await eVotingContract.vote(0, {
                from: currentAccount,
            });
            assert.isOk(false);
        } catch (e) {
            assert.isOk(true);
        }
    });

    it("Give vote to team 0 and should win team 0", async () => {
        await eVotingContract.verifyVoter(accounts[2], {
            from: accounts[0],
        });
        await eVotingContract.vote(0, {
            from: accounts[1],
        });
        await eVotingContract.vote(0, {
            from: accounts[2],
        });
        const winner = await eVotingContract.getWinner({ from: accounts[0] });
        assert(winner.representative === "Sumit Paul");
    });
});
