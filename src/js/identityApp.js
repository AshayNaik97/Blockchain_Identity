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

        $(document).on('click','.btn-register',App.registerIdentity);
    },

    registerIdentity: function(event) {
        event.preventDefault();

        var IdentityInstance;

        const aadharNumber = document.getElementById('AadharNumber').value;
        const passportNumber = document.getElementById('PassportNumber').value;
        const panCardNumber = document.getElementById('PanCardNumber').value;
        const name = document.getElementById('Name').value;
        let dateOfBirth = document.getElementById('DateOfBirth').value;
        const dateWithoutHyphens = dateOfBirth.replace(/-/g, '');
        dateOfBirth = parseInt(dateWithoutHyphens);

        //window.ethereum.enable();
        web3.eth.getAccounts(function(error,accounts){

            if(error) {
                console.log(error);
            }

            console.log(accounts);
            var account=accounts[0];
            // console.log(account);

            App.contracts.identity.deployed().then(function(instance){
                IdentityInstance=instance;
                return IdentityInstance.addIdentity(web3.fromAscii(aadharNumber),web3.fromAscii(passportNumber), web3.fromAscii(panCardNumber), web3.fromAscii(name), dateOfBirth, {from:account});
             }).then(function(result){
                // console.log(result);

                document.getElementById('AadharNumber').value='';
                document.getElementById('PassportNumber').value='';
                document.getElementById('PanCardNumber').value='';
                document.getElementById('Name').value='';
                document.getElementById('DateOfBirth').value='';

            }).catch(function(err){
                console.log(err.message);
            });
        });
    }



};

$(function() {

    $(window).load(function() {
        App.init();
    })
})

