const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const routes = require("./src/service/routes");
const app = express();
const PORT = process.env.PORT || 4200;
const path = require('path');
const { Gateway, FileSystemWallet, DefaultEventHandlerStrategies, Transaction  } = require('fabric-network');
 
// Constants for profile
const CONNECTION_PROFILE_PATH = './src/blockchain/ConnectionProfile.yaml'
// Path to the wallet
const FILESYSTEM_WALLET_PATH = './src/blockchain/user-wallet'
// Identity context used
const USER_ID = 'Admin@coldpeer.cold-chain.com'
// Channel name
const NETWORK_NAME = 'coldchannel'
// Chaincode
const CONTRACT_ID = "cc-cold"

app.use(bodyParser.json());

app.listen(PORT, () => {
  console.log(`El servidor está inicializado en el puerto ${ PORT }`);
 });
 
app.use(cors());
// app.use((req, res, next) => {
//   // En dado caso para usar esta parte del codigo el Access-Control-Allow-Origin tiene que tener su host
//   res.header("Access-Control-Allow-Origin", 'https://coldchainsecurity.herokuapp.com/');
//   res.header("Access-Control-Allow-Credentials", true);
//   res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
//   res.header("Access-Control-Allow-Headers", "Authorization, Origin,X-Requested-With,Content-Type,Accept,content-type,application/json,X-Access-Token");
//   if ('OPTIONS' == req.method) {
//       res.send(200);
//   } else {
//       next();
//   }
// });

routes.assignRoutes(app);

// Obtener toda la informacion de la Red 

app.get('/hlf', async function (req, res) {
  try {
      // Create a new gateway for connecting to our peer node.
      const gateway = new Gateway();

      let connectionProfile = path.join(__dirname, CONNECTION_PROFILE_PATH)
      const wallet = new FileSystemWallet(FILESYSTEM_WALLET_PATH);

      await gateway.connect(connectionProfile, {
          identity: USER_ID,
          wallet: wallet,
          discovery: { enabled: false, asLocalhost: true }
      });

      // Get the network (channel) our contract is deployed to.
      const network = await gateway.getNetwork(NETWORK_NAME);

      // Get the contract from the network.
      const contract = network.getContract(CONTRACT_ID);

      // Evaluate the specified transaction.
      const result = await contract.evaluateTransaction('queryArduinoData', '{"selector":{"docType":"arduino"}}');
      var data = JSON.parse(result.toString())
      // console.log(`Transaction has been evaluated, result data is: ${data}`);
      res.status(200).json({data});

  } catch (error) {
      console.error(`Failed to evaluate transaction: ${error}`);
      res.status(500).json({error: error});
      process.exit(1);
  }
});

// Obtener la informacion de la Red filtrada por empresa

app.get('/hlf/:empresa', async function (req, res) {
    const empresa = req.params['empresa'];
    try {
        // Create a new gateway for connecting to our peer node.
        const gateway = new Gateway();
  
        let connectionProfile = path.join(__dirname, CONNECTION_PROFILE_PATH)
        const wallet = new FileSystemWallet(FILESYSTEM_WALLET_PATH);
  
        await gateway.connect(connectionProfile, {
            identity: USER_ID,
            wallet: wallet,
            discovery: { enabled: false, asLocalhost: true }
        });
  
        // Get the network (channel) our contract is deployed to.
        const network = await gateway.getNetwork(NETWORK_NAME);
  
        // Get the contract from the network.
        const contract = network.getContract(CONTRACT_ID);
  
        // Evaluate the specified transaction.
        const result = await contract.evaluateTransaction('queryArduinoData', '{"selector":{"docType":"arduino","comercio":"' + empresa.toString() + '"}}');
        var data = JSON.parse(result.toString())
        // console.log(`Transaction has been evaluated, result data is: ${data}`);
        res.status(200).json({data});
  
    } catch (error) {
        console.error(`Failed to evaluate transaction: ${error}`);
        res.status(500).json({error: error});
        process.exit(1);
    }
  });
 
// Obtener informacion especifica acerca de un elemento que persiste en la red de la Red segun el ID que se maneje

  app.get('/hlfHistory/:id', async function (req, res) {
    const id = req.params['id'];
    try {
        // Create a new gateway for connecting to our peer node.
        const gateway = new Gateway();
  
        let connectionProfile = path.join(__dirname, CONNECTION_PROFILE_PATH)
        const wallet = new FileSystemWallet(FILESYSTEM_WALLET_PATH);
  
        await gateway.connect(connectionProfile, {
            identity: USER_ID,
            wallet: wallet,
            discovery: { enabled: false, asLocalhost: true }
        });
  
        // Get the network (channel) our contract is deployed to.
        const network = await gateway.getNetwork(NETWORK_NAME);
  
        // Get the contract from the network.
        const contract = network.getContract(CONTRACT_ID);
  
        // Evaluate the specified transaction.
        const result = await contract.evaluateTransaction('getHistoryForArduinoDataByID', id);
        var data = JSON.parse(result.toString())
        // console.log(`Transaction has been evaluated, result data is: ${data}`);
        res.status(200).json({data});
  
    } catch (error) {
        console.error(`Failed to evaluate transaction: ${error}`);
        res.status(500).json({error: error});
        process.exit(1);
    }
  });

// Obtener informacion de la red filtrada por almacen

    app.get('/hlfAlmacen/:almacen', async function (req, res) {
        const almacen = req.params['almacen'];
        try {
            // Create a new gateway for connecting to our peer node.
            const gateway = new Gateway();
    
            let connectionProfile = path.join(__dirname, CONNECTION_PROFILE_PATH)
            const wallet = new FileSystemWallet(FILESYSTEM_WALLET_PATH);
    
            await gateway.connect(connectionProfile, {
                identity: USER_ID,
                wallet: wallet,
                discovery: { enabled: false, asLocalhost: true }
            });
    
            // Get the network (channel) our contract is deployed to.
            const network = await gateway.getNetwork(NETWORK_NAME);
    
            // Get the contract from the network.
            const contract = network.getContract(CONTRACT_ID);
    
            // Evaluate the specified transaction.
            const result = await contract.evaluateTransaction('queryArduinoData', '{"selector":{"docType":"arduino","almacen":"' + almacen.toString() + '"}}');
            var data = JSON.parse(result.toString())

            // console.log(`Transaction has been evaluated, result data is: ${ max }`);
            res.status(200).json({data});
    
        } catch (error) {
            console.error(`Failed to evaluate transaction: ${error}`);
            res.status(500).json({error: error});
            process.exit(1);
        }
    });

// Obtener la temperatura Maxima registrada en un almacen

app.get('/hlfAlmacen/Max/:almacen', async function (req, res) {
    const almacen = req.params['almacen'];
    try {
        // Create a new gateway for connecting to our peer node.
        const gateway = new Gateway();

        let connectionProfile = path.join(__dirname, CONNECTION_PROFILE_PATH)
        const wallet = new FileSystemWallet(FILESYSTEM_WALLET_PATH);

        await gateway.connect(connectionProfile, {
            identity: USER_ID,
            wallet: wallet,
            discovery: { enabled: false, asLocalhost: true }
        });

        // Get the network (channel) our contract is deployed to.
        const network = await gateway.getNetwork(NETWORK_NAME);

        // Get the contract from the network.
        const contract = network.getContract(CONTRACT_ID);

        // Evaluate the specified transaction.
        const result = await contract.evaluateTransaction('queryArduinoData', '{"selector":{"docType":"arduino","almacen":"' + almacen.toString() + '"}}');
        var data = JSON.parse(result.toString())
        var max = Number('-100');
        data.forEach(element => {
            var min = Number(element.Record.temperatura.toString())
            if (min > max){
                max = min
            }
 
        });
        // console.log(`Transaction has been evaluated, result data is: ${ max }`);
        res.status(200).json({tempMax : max});

    } catch (error) {
        console.error(`Failed to evaluate transaction: ${error}`);
        res.status(500).json({error: error});
        process.exit(1);
    }
});


// Obtener la temperatura Minima registrada en un almacen

app.get('/hlfAlmacen/Min/:almacen', async function (req, res) {
    const almacen = req.params['almacen'];
    try {
        // Create a new gateway for connecting to our peer node.
        const gateway = new Gateway();

        let connectionProfile = path.join(__dirname, CONNECTION_PROFILE_PATH)
        const wallet = new FileSystemWallet(FILESYSTEM_WALLET_PATH);

        await gateway.connect(connectionProfile, {
            identity: USER_ID,
            wallet: wallet,
            discovery: { enabled: false, asLocalhost: true }
        });

        // Get the network (channel) our contract is deployed to.
        const network = await gateway.getNetwork(NETWORK_NAME);

        // Get the contract from the network.
        const contract = network.getContract(CONTRACT_ID);

        // Evaluate the specified transaction.
        const result = await contract.evaluateTransaction('queryArduinoData', '{"selector":{"docType":"arduino","almacen":"' + almacen.toString() + '"}}');
        var data = JSON.parse(result.toString())
        var min = Number('100');
        data.forEach(element => {
            var max = Number(element.Record.temperatura.toString())
            if (min > max){
                min = max
            }
 
        });
        // console.log(`Transaction has been evaluated, result data is: ${ max }`);
        res.status(200).json({tempMin : min});

    } catch (error) {
        console.error(`Failed to evaluate transaction: ${error}`);
        res.status(500).json({error: error});
        process.exit(1);
    }
});

// Obtener informacion de la red filtrada por las unidades de transporte 

  app.get('/hlfUnidad/:unidad', async function (req, res) {
    const unidad = req.params['unidad'];
    try {
        // Create a new gateway for connecting to our peer node.
        const gateway = new Gateway();
  
        let connectionProfile = path.join(__dirname, CONNECTION_PROFILE_PATH)
        const wallet = new FileSystemWallet(FILESYSTEM_WALLET_PATH);
  
        await gateway.connect(connectionProfile, {
            identity: USER_ID,
            wallet: wallet,
            discovery: { enabled: false, asLocalhost: true }
        });
  
        // Get the network (channel) our contract is deployed to.
        const network = await gateway.getNetwork(NETWORK_NAME);
   
        // Get the contract from the network.
        const contract = network.getContract(CONTRACT_ID);
  
        // Evaluate the specified transaction.
        const result = await contract.evaluateTransaction('queryArduinoData', '{"selector":{"docType":"arduino","unidad":"' + unidad.toString() + '"}}');
        var data = JSON.parse(result.toString())

        // console.log(`Transaction has been evaluated, result data is: ${ max }`);
        res.status(200).json({data});
  
    } catch (error) {
        console.error(`Failed to evaluate transaction: ${error}`);
        res.status(500).json({error: error});
        process.exit(1);
    }
  });

// Obtener la maxima temperatura registrada en una unidad de transporte

  app.get('/hlfUnidad/Max/:unidad', async function (req, res) {
    const unidad = req.params['unidad'];
    try {
        // Create a new gateway for connecting to our peer node.
        const gateway = new Gateway();
  
        let connectionProfile = path.join(__dirname, CONNECTION_PROFILE_PATH)
        const wallet = new FileSystemWallet(FILESYSTEM_WALLET_PATH);
  
        await gateway.connect(connectionProfile, {
            identity: USER_ID,
            wallet: wallet,
            discovery: { enabled: false, asLocalhost: true }
        });
  
        // Get the network (channel) our contract is deployed to.
        const network = await gateway.getNetwork(NETWORK_NAME);
   
        // Get the contract from the network.
        const contract = network.getContract(CONTRACT_ID);
  
        // Evaluate the specified transaction.
        const result = await contract.evaluateTransaction('queryArduinoData', '{"selector":{"docType":"arduino","unidad":"' + unidad.toString() + '"}}');
        var data = JSON.parse(result.toString())
        var max = Number('-100');
        data.forEach(element => {
            var min = Number(element.Record.temperatura.toString())
            if (min > max){
                max = min
            }
 
        });
        // console.log(`Transaction has been evaluated, result data is: ${ max }`);
        res.status(200).json({tempMax : max});
  
    } catch (error) {
        console.error(`Failed to evaluate transaction: ${error}`);
        res.status(500).json({error: error});
        process.exit(1);
    }
  });

// Obtener la minima temperatura registrada en una unidad de transporte

app.get('/hlfUnidad/Min/:unidad', async function (req, res) {
    const unidad = req.params['unidad'];
    try {
        // Create a new gateway for connecting to our peer node.
        const gateway = new Gateway();
  
        let connectionProfile = path.join(__dirname, CONNECTION_PROFILE_PATH)
        const wallet = new FileSystemWallet(FILESYSTEM_WALLET_PATH);
  
        await gateway.connect(connectionProfile, {
            identity: USER_ID,
            wallet: wallet,
            discovery: { enabled: false, asLocalhost: true }
        });
  
        // Get the network (channel) our contract is deployed to.
        const network = await gateway.getNetwork(NETWORK_NAME);
   
        // Get the contract from the network.
        const contract = network.getContract(CONTRACT_ID);
  
        // Evaluate the specified transaction.
        const result = await contract.evaluateTransaction('queryArduinoData', '{"selector":{"docType":"arduino","unidad":"' + unidad.toString() + '"}}');
        var data = JSON.parse(result.toString())
        var min = Number('100');
        data.forEach(element => {
            var max = Number(element.Record.temperatura.toString())
            if (min > max){
                min = max
            }
 
        });
        // console.log(`Transaction has been evaluated, result data is: ${ max }`);
        res.status(200).json({tempMin : min});
  
    } catch (error) {
        console.error(`Failed to evaluate transaction: ${error}`);
        res.status(500).json({error: error});
        process.exit(1);
    }
  });


// Obtener la informacion de la red filtrada por unidades estaticas

  app.get('/hlfUnidadAlmacen/:unidad', async function (req, res) {
    const unidad = req.params['unidad'];
    try {
        // Create a new gateway for connecting to our peer node.
        const gateway = new Gateway();
  
        let connectionProfile = path.join(__dirname, CONNECTION_PROFILE_PATH)
        const wallet = new FileSystemWallet(FILESYSTEM_WALLET_PATH);
  
        await gateway.connect(connectionProfile, {
            identity: USER_ID,
            wallet: wallet,
            discovery: { enabled: false, asLocalhost: true }
        });
  
        // Get the network (channel) our contract is deployed to.
        const network = await gateway.getNetwork(NETWORK_NAME);
  
        // Get the contract from the network.
        const contract = network.getContract(CONTRACT_ID);
  
        // Evaluate the specified transaction.
        const result = await contract.evaluateTransaction('queryArduinoData', '{"selector":{"docType":"arduino","unidadAlmacen":"' + unidad.toString() + '"}}');

        var data = JSON.parse(result.toString())
        // console.log(`Transaction has been evaluated, result data is: ${data}`);
        res.status(200).json({data});
  
    } catch (error) {
        console.error(`Failed to evaluate transaction: ${error}`);
        res.status(500).json({error: error});
        process.exit(1);
    }
  });

// Obtener la Maxima temperatura de una unidad estatica en la red
  app.get('/hlfUnidadAlmacen/Max/:unidad', async function (req, res) {
    const unidad = req.params['unidad'];
    try {
        // Create a new gateway for connecting to our peer node.
        const gateway = new Gateway();
  
        let connectionProfile = path.join(__dirname, CONNECTION_PROFILE_PATH)
        const wallet = new FileSystemWallet(FILESYSTEM_WALLET_PATH);
  
        await gateway.connect(connectionProfile, {
            identity: USER_ID,
            wallet: wallet,
            discovery: { enabled: false, asLocalhost: true }
        });
  
        // Get the network (channel) our contract is deployed to.
        const network = await gateway.getNetwork(NETWORK_NAME);
  
        // Get the contract from the network.
        const contract = network.getContract(CONTRACT_ID);
  
        // Evaluate the specified transaction.
        const result = await contract.evaluateTransaction('queryArduinoData', '{"selector":{"docType":"arduino","unidadAlmacen":"' + unidad.toString() + '"}}');

        var data = JSON.parse(result.toString())
        var max = Number('-100');
        data.forEach(element => {
            var min = Number(element.Record.temperatura.toString())
            if (min > max){
                max = min
            }
 
        });
        // console.log(`Transaction has been evaluated, result data is: ${data}`);
        res.status(200).json({tempMax : max});
  
    } catch (error) {
        console.error(`Failed to evaluate transaction: ${error}`);
        res.status(500).json({error: error});
        process.exit(1);
    }
  }); 

// Obtener la minima temperatura de una unidad estatica en la red
app.get('/hlfUnidadAlmacen/Min/:unidad', async function (req, res) {
    const unidad = req.params['unidad'];
    try {
        // Create a new gateway for connecting to our peer node.
        const gateway = new Gateway();
  
        let connectionProfile = path.join(__dirname, CONNECTION_PROFILE_PATH)
        const wallet = new FileSystemWallet(FILESYSTEM_WALLET_PATH);
  
        await gateway.connect(connectionProfile, {
            identity: USER_ID,
            wallet: wallet,
            discovery: { enabled: false, asLocalhost: true }
        });
  
        // Get the network (channel) our contract is deployed to.
        const network = await gateway.getNetwork(NETWORK_NAME);
  
        // Get the contract from the network.
        const contract = network.getContract(CONTRACT_ID);
  
        // Evaluate the specified transaction.
        const result = await contract.evaluateTransaction('queryArduinoData', '{"selector":{"docType":"arduino","unidadAlmacen":"' + unidad.toString() + '"}}');

        var data = JSON.parse(result.toString())
        var min = Number('100');
        data.forEach(element => {
            var max = Number(element.Record.temperatura.toString())
            if (min > max){
                min = max
            }
 
        });
        // console.log(`Transaction has been evaluated, result data is: ${data}`);
        res.status(200).json({tempMin : min});
  
    } catch (error) {
        console.error(`Failed to evaluate transaction: ${error}`);
        res.status(500).json({error: error});
        process.exit(1);
    }
  });

// Introducir infromacion en la red
app.post('/hlf', async function (req, res) {
  try {
      // Create a new gateway for connecting to our peer node.
      const gateway = new Gateway();

      let connectionProfile = path.join(__dirname, CONNECTION_PROFILE_PATH)
      const wallet = new FileSystemWallet(FILESYSTEM_WALLET_PATH);

      await gateway.connect(connectionProfile, {
          identity: USER_ID,
          wallet: wallet,
          discovery: { enabled: false, asLocalhost: true }
      });

      // Get the network (channel) our contract is deployed to.
      const network = await gateway.getNetwork(NETWORK_NAME);

      // Get the contract from the network.
      const contract = network.getContract(CONTRACT_ID);

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
  } catch (error) {
      console.error(`Failed to evaluate transaction: ${error}`);
      res.status(500).json({error: error});
      process.exit(1);
  }
});