// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

contract evoting {
    struct Voter {
        string fname;
        string lname;
        string email;
        uint256 dob;
        string mobile;
        string uidai;
        string role;
        bool verified;
        bool voted;
        uint256 vote;
    }
    address admin;
    struct Team {
        string representative;
        string description;
        string teamName;
        uint256 voteCount;
    }

    mapping(address => Voter) public voters;

    Team[] public teams;

    event AddVoter(Voter _voter);


    //"Soumen", "Khara", "soumen@gmail.com", 931113000000,"8945612397","12345678900"
    constructor(string memory fname,string memory lname,string memory email,uint256 dob,string memory mobile,string memory uidai) {
        admin = msg.sender;
        voters[admin].fname = fname;
        voters[admin].lname = lname;
        voters[admin].email = email;
        voters[admin].dob = dob;
        voters[admin].mobile = mobile;
        voters[admin].uidai = uidai;
        voters[admin].verified = true;
        voters[admin].role = "admin";
    }

    event AddTeam(Team _team);

    function addTeam(string memory  representative, string  memory description,    string memory teamName) public {
            require(
                msg.sender == admin,
                "Only admin can add new teams"
            );
            teams.push(Team({representative: representative, description: description,teamName:teamName,voteCount: 0}));
            emit AddTeam(teams[teams.length - 1]);
    }

    event Register(Voter _voter);

    function register(string  memory  fname,string  memory  lname,string  memory email,uint256 dob,string memory  mobile,string memory  uidai) public {
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

    // function getWinner() public view returns (string _winner) {
    //     _winner = teams[getWinnerIndex()].name;
    // }
}