// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;
contract person {

    uint256 personcount;

    struct productItem{
        uint256 productId;
        bytes32 productSN;
        bytes32 productName;
        bytes32 productBrand;
        uint256 productPrice;
        bytes32 productStatus;
    }

    mapping(uint256=>productItem) public productItems;
    mapping(bytes32=>uint256) public productMap;
    mapping(bytes32=>bytes32) public productsManufactured;
    mapping(bytes32=>bytes32) public productsForSale;
    mapping(bytes32=>bytes32) public productsSold;
    mapping(bytes32=>bytes32[]) public productsWithSeller;
    mapping(bytes32=>bytes32[]) public productsWithConsumer;
    mapping(bytes32=>bytes32[]) public sellersWithManufacturer;


    function addProduct(bytes32 _manufactuerID, bytes32 _productName, bytes32 _productSN, bytes32 _productBrand,
    uint256 _productPrice) public{
        productItems[personcount] = productItem(personcount, _productSN, _productName, _productBrand,
        _productPrice, "Available");
        productMap[_productSN] = personcount;
        personcount++;
        productsManufactured[_productSN] = _manufactuerID;
    }


    //Verify

    function verifyProduct(bytes32 _productSN, bytes32 _consumerCode) public view returns(bool){
        if(productsSold[_productSN] == _consumerCode){
            return true;
        }
        else{
            return false;
        }
    }
}