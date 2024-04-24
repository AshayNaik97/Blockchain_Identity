// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;
contract person {
    mapping(bytes32=>bytes32) public aadharmap;

    function addIdentity(bytes32 aadharnumber, bytes32 passportnumber, bytes32 pancard, bytes32 name,
    uint256 dob) public{
        // Convert uint256 to bytes32
        bytes32 dobHash = bytes32(dob);
        
        // Hash each input using SHA-256
        bytes32 aadharHash = sha256(abi.encodePacked(aadharnumber));
        bytes32 passportHash = sha256(abi.encodePacked(passportnumber));
        bytes32 pancardHash = sha256(abi.encodePacked(pancard));
        bytes32 nameHash = sha256(abi.encodePacked(name));
        
        // Concatenate all individual hashes
        bytes memory concatenated = abi.encodePacked(aadharHash, passportHash, pancardHash, nameHash, dobHash);
        
        // Hash the concatenated string using SHA-256 to get the final hash
        bytes32 finalHash = sha256(concatenated);

        aadharmap[aadharnumber] = finalHash;

    }


    //Verify

    function verifyIdentity(bytes32 aadharnumber, bytes32 uniqhash) public view returns(bool){
        if(aadharmap[aadharnumber] == uniqhash){
            return true;
        }
        else{
            return false;
        }
    }
}