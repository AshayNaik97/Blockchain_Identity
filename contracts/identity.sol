// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;
contract person {
    mapping(bytes32=>bytes32) public aadharmap;

    event identityadded( bytes32 aadharnumber,bytes conc, bytes32 ah,bytes32 ph,bytes32 pch,bytes32 nh,bytes32 dh, bytes32 finalhash);
    // event iden( bytes32 aadharnumber,bytes32 conc);

    function addIdentity(bytes32 aadharnumber, bytes32 passportnumber, bytes32 pancard, bytes32 name,
    bytes32 dob) public{

        
        // Hash each input using SHA-256
        bytes32 aadharHash = sha256(abi.encodePacked(aadharnumber));
        bytes32 passportHash = sha256(abi.encodePacked(passportnumber));
        bytes32 pancardHash = sha256(abi.encodePacked(pancard));
        bytes32 nameHash = sha256(abi.encodePacked(name));
        bytes32 dobHash = sha256(abi.encodePacked(dob));
        
        // Concatenate all individual hashes
        bytes memory concatenated = abi.encodePacked(aadharHash, passportHash, pancardHash, nameHash, dobHash);
        
        
        bytes32 finalHash = sha256(concatenated);

        aadharmap[aadharnumber] = finalHash;
        
        emit identityadded(aadharnumber,concatenated,aadharHash,passportHash,pancardHash,nameHash,dobHash, finalHash);
    }


    //Verify

    function verifyIdentity(bytes32 aadharnumber, bytes32 uniqhash) public view  returns(bool){
        // emit iden(aadharnumber,aadharmap[aadharnumber]);
        if(aadharmap[aadharnumber] == uniqhash){
            return true;
        }
        else{
            return false;
        }
    }
}

