const app = require('express')();
var server_port = process.env.YOUR_PORT || process.env.PORT || 80;
var server_host = process.env.YOUR_HOST || '0.0.0.0';
const fcl = require('@onflow/fcl');
const t = require('@onflow/types');

fcl.config({
    "accessNode.api": "https://rest-mainnet.onflow.org", // Mainnet: "https://rest-mainnet.onflow.org"
    "discovery.wallet": "https://fcl-discovery.onflow.org/authn" // Mainnet: "https://fcl-discovery.onflow.org/authn"
  })
    .put('0xFLOAT', '0x2d4c3caffbeab845')

const scriptCode = `
      import FLOAT from 0xFLOAT
      
      pub fun main(account: Address, eventId: UInt64): Bool {
          if let floatCollection = getAccount(account).getCapability(FLOAT.FLOATCollectionPublicPath).borrow<&FLOAT.Collection{FLOAT.CollectionPublic}>() {
            let ids = floatCollection.ownedIdsFromEvent(eventId: eventId)
            if ids.length > 0 {
              return true
            }
          }
        return false
      }
      `;
let x = 0

let eventIds = [
    299755001,
    314242837,
    329305134,
    331687950,
    338735737,
    339998352,
    342498796,
    342582844,
    342882438,
    342918976,
    342929879,
    343053031,
    343085997,
    343127331,
    343164416,
    343218542,
    343255795,
    343283627,
    346661632,
    354125193,
    371406853,
    380663486,
    401543962,
    414539811,
    430862616,
    449759860,
    479549490,
    514411174,
    535410161,
    546620518,
    571230302,
    595889086
]

let resultingArr=[];

const checkOwnsFloat = async (emeraldIds) => {
 await Promise.all(
  eventIds.map(async element => {
        try {
            const result = await fcl.send([
              fcl.script(scriptCode),
              fcl.args([
                fcl.arg(emeraldIds, t.Address),
                fcl.arg(element, t.UInt64)
              ])
            ]).then(fcl.decode);
            if(result == true){
                resultingArr.push(element)
            }
          } catch(e) {
          }    
    }));
    return resultingArr.length;
}

async function asyncCall(emeraldIds) {
    const result = await checkOwnsFloat(emeraldIds);
    return result;
    // expected output: "resolved"
}


app.listen(server_port, server_host, function() {
    console.log('Listening on port %d', server_port);
});

app.get('/',(req, res)=>{
    res.send("<h1>Hello World!</h1>")
});

app.post('/check/:id' ,async (req, res) =>{
    
    const {id} = req.params

    if(!id){
        res.status(400).send({message: 'Please insert an id!'})
    }
    
    let amount = await asyncCall(id);
    
    res.send({
        amount: amount
    })
});