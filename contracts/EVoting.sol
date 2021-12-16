// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

contract evoting {
    struct Voter {
        bool added;
        bool voted;
        uint256 vote;
    }

    struct Team {
        bytes32 name;
        uint256 voteCount;
    }

    address public admin;

    mapping(address => Voter) public voters;

    Team[] public teams;

    event AddVoter(Voter _voter);

    constructor(bytes32[] memory teamsName) {
        admin = msg.sender;
        voters[admin].added = true;
        for (uint256 i = 0; i < teamsName.length; i++) {
            teams.push(Team({name: teamsName[i], voteCount: 0}));
        }
    }

    function addVoter(address voter) public {
        require(
            msg.sender == admin,
            "Only admin can add new voter to voter list."
        );
        require(
            !voters[voter].added,
            "Voter is already added in the voter list"
        );
        voters[voter].added = true;

        emit AddVoter(voters[voter]);
    }

    function getTeams() public view returns (Team[] memory) {
        return teams;
    }

    function getUser() public view returns (Voter memory) {
        return voters[msg.sender];
    }

    function isAdmin() public view returns (bool) {
        if (msg.sender == admin) return true;
        else return false;
    }

    event Vote(Voter _voter);

    function vote(uint256 to) public {
        Voter storage voter = voters[msg.sender];
        require(voter.added, "You are not eligible to give vote.");

        require(!voter.voted, "You are already voted.");

        voter.voted = true;
        voter.vote = to;

        teams[to].voteCount += 1;

        emit Vote(voter);
    }

    function getWinnerIndex() public view returns (uint256 _winner) {
        uint256 maxVote = 0;
        for (uint256 i = 0; i < teams.length; i++) {
            if (teams[i].voteCount > maxVote) {
                maxVote = teams[i].voteCount;
                _winner = i;
            }
        }
    }

    function getWinner() public view returns (bytes32 _winner) {
        _winner = teams[getWinnerIndex()].name;
    }
}