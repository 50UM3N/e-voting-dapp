// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

contract evoting {
    
    /**
    * Voting structure that helps to create a map and contain all the voter
    * thar are register
    */
    struct Voter {
        string fname;   // First Name
        string lname;   // Last name
        string email;   // Email Address
        uint256 dob;    // Date of Birth as integer to store the date time according to JS date time
        string mobile;  // Mobile Number
        string uidai;   // Aadhar Number
        string role;    // Role i.e user or admin
        bool verified;  // Verified flag that help to verifiy the voter details
        bool voted;     // Voted flag to verify that the user give his vote or not
        uint256 vote;   // Index of the voter list the user give vote
    }

    struct VoterMap {
        address[] keys;
        mapping(address => Voter) values;
        mapping(address => uint) indexOf;
        mapping(address => bool) inserted;
    }

    VoterMap private voterMap;
    /**
    * voterMapGet function get the voter of a esisting address
    * @param {VoterMap} map is the storage parameter
    * @param {address} key This is the key to find a voter
    * @return {Voter} return the structure voter
    */
    function voterMapSize() private view returns (uint) {
        return voterMap.keys.length;
    }

    function voterMapSet(address key, Voter memory val) private {
        if (voterMap.inserted[key]) {
            voterMap.values[key] = val;
        } else {
            voterMap.inserted[key] = true;
            voterMap.values[key] = val;
            voterMap.indexOf[key] = voterMap.keys.length;
            voterMap.keys.push(key);
        }
    }

    function voterMapRemove( address key) private {
        if (!voterMap.inserted[key]) {
            return;
        }

        delete voterMap.inserted[key];
        delete voterMap.values[key];

        uint index = voterMap.indexOf[key];
        uint lastIndex = voterMap.keys.length - 1;
        address lastKey = voterMap.keys[lastIndex];

        voterMap.indexOf[lastKey] = index;
        delete voterMap.indexOf[key];

        voterMap.keys[index] = lastKey;
        voterMap.keys.pop();
    }

    // voters mapping that map address to Voter structure mentioned above
    // mapping(address => Voter) public voters;

    // Address of the admin i.e the user address that deploy the contract
    address admin;

    /**
    * Team structure that helps to create an array contains all the teams 
    */
    struct Team {
        string representative;  // Name of the representative who stand in behalf to to team
        string description;     // Description of the team
        string teamName;        // Team name
        uint256 voteCount;      // Number of vote 
    }

    // Teams array contains all the teams 
    Team[] public teams;

    event AddVoter(Voter _voter);
    //"Soumen", "Khara", "soumen@gmail.com", 931113000000,"8945612397","12345678900"
    constructor(string memory fname,string memory lname,string memory email,uint256 dob,string memory mobile,string memory uidai) {
        admin = msg.sender;
        Voter memory voter = Voter(fname,lname,email,dob,mobile,uidai,"admin",true, false, 0);
        voterMapSet(admin, voter);
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
        address sender = msg.sender;
        // TODO: check that a user is already exist or not
        Voter memory voter = Voter(fname,lname,email,dob,mobile,uidai,"user",false, false, 0);
        voterMapSet(sender, voter);
        emit Register(voter);
    }

    function getTeams() public view returns (Team[] memory) {
        return teams;
    }

    function getVoter() public view returns (Voter memory) {
        
        return voterMap.values[msg.sender];
    }

    event Vote(Voter _voter);

    function vote(uint256 to) public {
        Voter storage voter = voterMap.values[msg.sender];

        require(voter.verified, "You are not eligible to give vote.");
        require(!voter.voted, "You are already voted.");

        voter.voted = true;
        voter.vote = to;
        teams[to].voteCount += 1;
        emit Vote(voter);
    }


    function getUnverifiedVoter() public view returns (Voter[] memory) {
        // TODO: Create a pagination type data return 
        // INFO: Resolve null value from the voters 
        uint counter = 0 ;

        for(uint i=0; i<voterMap.keys.length;i++){
            Voter memory item = voterMap.values[voterMap.keys[i]];
            if(!item.verified)
                counter++;
        }

        Voter[] memory voters = new Voter[](counter);
        uint j = 0; 
        for(uint i=0; i<voterMap.keys.length;i++){
            Voter memory item = voterMap.values[voterMap.keys[i]];
            if(!item.verified){
                voters[j] = item;
                j++;    
            }
        }
        return voters;
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