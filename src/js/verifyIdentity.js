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

        $.getJSON('person.json',function(data){

            var IdentityArtifact=data;
            App.contracts.identity=TruffleContract(IdentityArtifact);
            App.contracts.identity.setProvider(App.web3Provider);
        });

        return App.bindEvents();
    },

    bindEvents: function() {

        $(document).on('click','.btn-register',App.getData);
    },

    getData:function(event) {
        event.preventDefault();
        const UniqueHash = document.getElementById('UniqueHash').value;
        const aadharNumber = document.getElementById('aadharNumber').value;
        var IdentityInstance;
        // console.log(UniqueHash);
        //window.ethereum.enable();
        web3.eth.getAccounts(function(error,accounts){

            if(error) {
                console.log(error);
            }

            var account=accounts[0];
            function hex2a(hexx) {
                var hex = hexx.toString();//force conversion
                var str = '';
                for (var i = 0; i < hex.length; i += 2)
                    str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
                return str;
            }
            // console.log(account);
            App.contracts.identity.deployed().then(function(instance){

                IdentityInstance=instance;
                return IdentityInstance.verifyIdentity(web3.fromAscii(aadharNumber),hex2a(UniqueHash),{from:account});

            }).then(function(result){
                
                console.log(result);

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
                // document.getElementById('add').innerHTML=account;
           }).catch(function(err){
               console.log(err.message);
           })
        })
    }
};


$(function() {
    $(window).load(function() {
        const delay = ms => new Promise(res => setTimeout(res, ms));
        delay(5000);
        App.init();
    })
})