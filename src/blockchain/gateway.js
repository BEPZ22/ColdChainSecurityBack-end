/**
 * Demonstrates the use of Gateway Network & Contract classes
 */

 // Needed for reading the connection profile as JS object
 const fs = require('fs');
 // Used for parsing the connection profile YAML file
 const yaml = require('js-yaml');
 const path = require('path');
 // Import gateway class
 const { Gateway, FileSystemWallet, DefaultEventHandlerStrategies, Transaction  } = require('fabric-network');
 
 // Constants for profile
 const CONNECTION_PROFILE_PATH = './ConnectionProfile.yaml'
 // Path to the wallet
 const FILESYSTEM_WALLET_PATH = '../../../user-wallet'
 // Identity context used
 const USER_ID = 'Admin@coldpeer.cold-chain.com'
 // Channel name
 const NETWORK_NAME = 'coldchannel'
 // Chaincode
 const CONTRACT_ID = "cc-cold"
 
 
 // 1. Create an instance of the gatway
 const gateway = new Gateway();
 // Sets up the gateway | executes the invoke & query
 
 /**
  * Executes the functions for query & invoke
  */
    async function main() {
        
        // 2. Setup the gateway object
        await setupGateway()
        // 3. Get the network
        let network = await gateway.getNetwork(NETWORK_NAME)
        // console.log(network)
        // 5. Get the contract
        let contract = await network.getContract(CONTRACT_ID);

        return contract
    }
    module.exports = {
        /**
         * Queries the chaincode
         * @param {object} contract 
         */
        queryContract : async function (req, res){
            
            try{
                // Query the chaincode
                let contract = await main()
                let response = await contract.evaluateTransaction('queryArduinoData', '{"selector":{"docType":"arduino"}}')
                res.status(200).send(response.toString())
            } catch(e){
                console.log(e)
            }
        },
        
        /**
         * Submit the transaction
         * @param {object} contract 
         */
        submitTxnContract: async function (req, res){
            var arduino = {
                id : req.body.id ,
                lg : req.body.lg,
                lt : req.body.lt,
                tp : req.body.tp, 
                dt : req.body.dt,
                un : req.body.un,
                wh : req.body.wh,
                co : req.body.co,
                ua : req.body.ua
            }
            try{
                // Submit the transaction
                let contract = await main()
                let response = await contract.submitTransaction('createArduinoData', 
                                                                arduino.id,
                                                                arduino.un,
                                                                arduino.wh,
                                                                arduino.lg,
                                                                arduino.lt,
                                                                arduino.tp,
                                                                arduino.dt, 
                                                                arduino.co, 
                                                                arduino.ua)
                res.status(200).send(response.toString())
                console.log("Submit Response=",response.toString())
            } catch(e){
                // fabric-network.TimeoutError
                console.log(e)
            }
        },
 
    /**
     * Function for setting up the gateway
     * It does not actually connect to any peer/orderer
     */

 
}

async function setupGateway() {
     
    // 2.1 load the connection profile into a JS object
    let connectionProfile = path.join(__dirname, CONNECTION_PROFILE_PATH)
    // let connectionProfile = yaml.safeLoad(fs.readFileSync(CONNECTION_PROFILE_PATH, 'utf8'));

    // 2.2 Need to setup the user credentials from wallet
    const wallet = new FileSystemWallet(FILESYSTEM_WALLET_PATH)

    // 2.3 Set up the connection options
    let connectionOptions = {
        identity: USER_ID,
        wallet: wallet,
        discovery: { enabled: false, asLocalhost: true }
        /*** Uncomment lines below to disable commit listener on submit ****/
        // , eventHandlerOptions: {
        //     strategy: null
        // } 
    }

    // 2.4 Connect gateway to the network
    await gateway.connect(connectionProfile, connectionOptions)
    // console.log( gateway)
}