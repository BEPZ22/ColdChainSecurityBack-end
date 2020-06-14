var fabricClient = require('../../blockchain/FabricClient');
var private_key = process.env.HLF_PRIVATE_KEY
var sign_cert = process.env.HLF_SIGN_CERT

class ColdFabric {

  constructor() {
    this.currentUser;
    this.issuer;
    this.userName = "User1@coldpeer.cold-chain.com";
    this.connection = fabricClient;
  }

  // constructor(){
  //   this.connection = fabricClient;
  // }

  init() {
    var isAdmin = false;

    if (this.userName == "User1@coldpeer.cold-chain.com") {
      isAdmin = true;
    }

    return this.connection.loadFromConfig().then(() => {
    // return this.connection.setAdminSigningIdentity(private_key,sign_cert,"ColdpeerMSP")
      return this.connection.getUserContext(this.userName, true) //.then(() => {
    }).then((user) => {
      this.issuer = user;
      if (isAdmin) {
        return user;
      }
      return this.ping();
    }).then((user) => {
      this.currentUser = user;
      return user;
    })
  }

  queryAllArduinoData() {
    this.connection.setAdminSigningIdentity(private_key,sign_cert,"ColdpeerMSP");
    var tx_id = this.connection.newTransactionID(true);
    console.log(tx_id);
    var requestData = {
      chaincodeId: 'cc-cold',
      fcn: 'queryArduinoData',
      args: ["{\"selector\":{\"docType\":\"arduino\"}, \"use_index\":[\"_design/indexDocDoc\", \"indexDoc\"]}"],
      txId: tx_id
    };
    return this.connection.query(requestData);
  }

  addArduinoData(arduino) {
    this.connection.setAdminSigningIdentity(private_key,sign_cert,"ColdpeerMSP");
    var tx_id = this.connection.newTransactionID();
    var requestData = {
      chaincodeId: 'cc-cold',
      fcn: 'createArduinoData',
      args: [arduino.id, arduino.un, arduino.wh,arduino.lt,arduino.lg,arduino.tp,arduino.dt,arduino.co,arduino.ua],
      txId: tx_id
    };
    return this.connection.submitTransaction(requestData,tx_id);
  }
}
// "credentialStore" : {
//   "path" : "./hfc-key-store",
//   "cryptoStore" : {
//       "path" : "./hfc-key-store"
//   }
// },
module.exports = ColdFabric;