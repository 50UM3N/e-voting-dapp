// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

contract evoting {
    struct Voter {
        bytes32 fname;
        bytes32 lname;
        bytes32 email;
        uint256 dob;
        bytes32 mobile;
        bytes32 uidai;
        bytes32 role;
        bool verified;
        bool voted;
        uint256 vote;
    }

    struct Team {
        bytes32 representative;
        bytes32 description;
        bytes32 teamName;
        uint256 voteCount;
    }

    mapping(address => Voter) public voters;

    Team[] public teams;

    event AddVoter(Voter _voter);

    constructor(
        bytes32 fname,
        bytes32 lname,
        bytes32 email,
        uint256 dob,
        bytes32 mobile,
        bytes32 uidai
    ) {
        address admin = msg.sender;
        voters[admin].fname = bytes32(fname);
        voters[admin].lname = bytes32(lname);
        voters[admin].email = bytes32(email);
        voters[admin].dob = dob;
        voters[admin].mobile = bytes32(mobile);
        voters[admin].uidai = bytes32(uidai);
        voters[admin].verified = true;
        voters[admin].role = bytes32("admin");
    }

    event AddTeam(Team _team);

    function addTeam(
        bytes32 representative,
        bytes32 description,
        bytes32 teamName
    ) public {
        require(
            voters[msg.sender].role == "admin",
            "Only admin can add new teams"
        );
        teams.push(
            Team({
                representative: representative,
                description: description,
                teamName: teamName,
                voteCount: 0
            })
        );
        emit AddTeam(teams[teams.length - 1]);
    }

    event Register(Voter _voter);

    function register(
        bytes32 fname,
        bytes32 lname,
        bytes32 email,
        uint256 dob,
        bytes32 mobile,
        bytes32 uidai
    ) public {
        address voter = msg.sender;
        // check that a user is already exist or not;
        voters[voter].fname = fname;
        voters[voter].lname = lname;
        voters[voter].email = email;
        voters[voter].dob = dob;
        voters[voter].mobile = mobile;
        voters[voter].uidai = uidai;
        voters[voter].verified = false;
        voters[voter].role = "user";

        emit Register(voters[voter]);
    }

    function getTeams() public view returns (Team[] memory) {
        return teams;
    }

    function getVoter() public view returns (Voter memory) {
        return voters[msg.sender];
    }

    event Vote(Voter _voter);

    function vote(uint256 to) public {
        Voter storage voter = voters[msg.sender];

        require(voter.verified, "You are not eligible to give vote.");
        require(!voter.voted, "You are already voted.");

        voter.voted = true;
        voter.vote = to;
        teams[to].voteCount += 1;
        emit Vote(voter);
    }

    // function getWinnerIndex() public view returns (uint256 _winner) {
    //     uint256 maxVote = 0;
    //     for (uint256 i = 0; i < teams.length; i++) {
    //         if (teams[i].voteCount > maxVote) {
    //             maxVote = teams[i].voteCount;
    //             _winner = i;
    //         }
    //     }
    // }

    // function getWinner() public view returns (bytes32 _winner) {
    //     _winner = teams[getWinnerIndex()].name;
    // }
}
