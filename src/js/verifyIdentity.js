App = {
    web3Provider: null,
    contracts: {},

    init: async function() {
        return await App.initWeb3();
    },

    initWeb3: function() {
        if(window.web3) {
            App.web3Provider=window.web3.currentProvider;
        } else {
            App.web3Provider=new Web3.proviers.HttpProvider('http://localhost:7545');
        }

        web3 = new Web3(App.web3Provider);
        return App.initContract();
    },

    initContract: function() {

        $.getJSON('product.json',function(data){

            var productArtifact=data;
            App.contracts.product=TruffleContract(productArtifact);
            App.contracts.product.setProvider(App.web3Provider);
        });

        return App.bindEvents();
    },

    bindEvents: function() {

        $(document).on('click','.btn-register',App.getData);
    },

    getData:function(event) {
        event.preventDefault();
        var UniqueHash = document.getElementById('UniqueHash').value;
        //window.ethereum.enable();
        web3.eth.getAccounts(function(error,accounts){

            if(error) {
                console.log(error);
            }

            var account=accounts[0];
            // console.log(account);
            App.contracts.UniqueHash.deployed().then(function(instance){

                UniqueHashInstance=instance;
                return UniqueHashInstance.verifyProduct(web3.fromAscii(UniqueHash),{from:account});

            }).then(function(result){
                
                // console.log(result);

                var t= "";

                var tr="<tr>";
                if(result){
                    tr+="<td>"+ "Genuine Person."+"</td>";
                }else{
                    tr+="<td>"+ "Fake Person."+"</td>";
                }
                tr+="</tr>";
                t+=tr;

                document.getElementById('logdata').innerHTML = t;
                document.getElementById('add').innerHTML=account;
           }).catch(function(err){
               console.log(err.message);
           })
        })
    }
};

$(function() {
    $(window).load(function() {
        App.init();
    })
})