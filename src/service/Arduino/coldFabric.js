var fabricClient = require('../../blockchain/FabricClient');

class ColdFabric {

  // constructor(userName) {
  //   this.currentUser;
  //   this.issuer;
  //   this.userName = userName;
  //   this.connection = fabricClient;
  // }

  constructor(){
    this.connection = fabricClient;
  }

  init() {
    var isAdmin = false;

    if (this.userName == "admin") {
      isAdmin = true;
    }

    return this.connection.initCredentialStores().then(() => {
      return this.connection.getUserContext(this.userName, true)
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
    this.connection.setAdminSigningIdentity(process.env.HLF_PRIVATE_KEY,process.env.HLF_SIGN_CERT,"ColdpeerMSP");
    var tx_id = this.connection.newTransactionID(true);
    var requestData = {
      chaincodeId: 'cc-cold',
      fcn: 'queryArduinoData',
      args: ["{\"selector\":{\"docType\":\"arduino\"}, \"use_index\":[\"_design/indexDocDoc\", \"indexDoc\"]}"],
      txId: tx_id
    };
    return this.connection.query(requestData);
  }

  addArduinoData(arduino) {
    this.connection.setAdminSigningIdentity(process.env.HLF_PRIVATE_KEY,process.env.HLF_SIGN_CERT,"ColdpeerMSP");
    var tx_id = this.connection.newTransactionID(true);
    var requestData = {
      chaincodeId: 'cc-cold',
      fcn: 'createArduinoData',
      args: [arduino.id,arduino.lg,arduino.lt,arduino.tp,arduino.dt,arduino.un,arduino.wh,arduino.co,arduino.ua],
      txId: tx_id
    };
    return this.connection.submitTransaction(requestData,tx_id);
  }
}

module.exports = ColdFabric;