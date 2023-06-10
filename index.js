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
    595889086,
    621669645,
    641904204,
    655885214,
    680611776,
    703085709,
    728444042,
    769026970,
    785303866,
    795788758,
    825568282,
    826696591,
    838513053,
    849395728,
    872325475,
    876639991,
    884346148,
    894357099,
    904891482,
    911284845,
    934785136,
941662065,
950072864,
955436303,
962223635,
973563506,
976784549,
980432675,
987160366,
994627034,
1005116203,
1014802800,
1024699794,
1077966782,
1123288912,
1130146277
]


const checkOwnsFloat = async (emeraldIds) => {
let resultingArr=[];
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

const holders = [
  '0x73d6acf44790e9d3ebe7ec60b3c80ad79d54037c',
  '0x2a8f388bb1b999ab82bbcd045f2a9a9465e73dc5',
  '0xe3661b7fd220f5104f8504fc597f6dfc483ac0f4',
  '0x6453b35bf9f857deeb872d9d586359885cf3bbe6',
  '0x8b518d13b055571668e369c7a35c7079da7eb36c',
  '0x9522b5789b05fe32a4965bdf7c2385050850c69b',
  '0x02679c2cc70fe9b48a6c48dbdcbce31a5a17830f',
  '0x428deb2bda6b2e848708d480f010ac7eeabcd436',
  '0x561fe77e375a75060e238b7a6fa626c1d995c00d',
  '0x601fa6af5d28e413e634d9c0e90ec1df22ba4e65',
  '0x70344f7c13d66af95ecbe5653cf8876f118168ff',
  '0x77c0b99b0f8efc087b1cf8d62d62236774a9934c',
  '0xfe5d02a0d87af0f5def036eaf46085707861c88e',
  '0x7d073e01a2cccd5e30eb611ae24d3401c280a042',
  '0x0040acb41cf17e8eaf24bfc5e127184cc36eacbb',
  '0x08818b08c6616759b479f4ba215081d76a21bdad',
  '0x110dc70e586b563662e20c4a316dc1a22ba95c84',
  '0x1230355114dfb60a8a799b724674d2c9ad2bf383',
  '0x123d5a222cd4033d32cf167dcebf05c7bdff6d13',
  '0x16fa844548d7aeb693471a4068d60e580a811114',
  '0x170738cd370b9d153c7c478bd744c96b37c91061',
  '0x1727b1bc6ea1db7fffdbb932ea92c035dde90c48',
  '0x183bdd981c64d89cb42b20de45cd37aa0fc0bf47',
  '0x18696fd7f961326c25ad58eca9b3243e875f67bb',
  '0x1b27a0d7a2cb3f82663f6156795763a16e28c70a',
  '0x1dbe8fcefd7d9f43c43f59f98262180f4c49fcdf',
  '0x1e1be35d6564dfb6f2711295e0a0b7f68d05263b',
  '0x250a6a2b4a8120e68dc9ce4b0c636a745f532b2f',
  '0x2e49b9669ff6e3499d5a8988d2d9c99368081c2f',
  '0x2f91f8bc62f633d4c25958734711104df41cb826',
  '0x3044a96807c43f6ddff774b13f17b544e10fd0db',
  '0x30d36de0940af95967a06e08e4c7288806b089bf',
  '0x33837f17af285c08bcc75a6ae0c6b75b61929289',
  '0x33c3d5654f1af154bbcc5342104f2458e22b11b5',
  '0x3431ca9348469c1b0304fbbf0e29abf2aa05dd61',
  '0x36c74de480e4264e04ab6b371af7c144b2564947',
  '0x3c93c6a0fc3b9fc08f79350fcff97c0bc2b3ddcb',
  '0x3dc8a5819b9fae878cecd7e472dd9917cb490e6c',
  '0x3e5ab69eb133527b160a156482722dd3279ff714',
  '0x3fdb151d0c4c38da8f0bf744e62e121e093e8005',
  '0x4510874bbf8490819a566b0544697c0572eb128c',
  '0x46ea798cab8b1b2015a0d9aba154e1720c8fdeca',
  '0x4B9e286497586aC24701BcbCb97fAdd44f2161a8',
  '0x4cd3d1877a3bda55e5563254f3123f68bb2fe2c0',
  '0x4cf66cfe6a773fd2d4e853af6125f1f023ca6760',
  '0x4edd272eb95df8b8f2dd97514ca58358576db13f',
  '0x55571cfeeba160352286d79489dc364ec18a464a',
  '0x55b349edebecb11a787ef88563309bca6e832c9c',
  '0x589590ea3a0d332c40f76baac13e61a81731d8c4',
  '0x4b9e286497586ac24701bcbcb97fadd44f2161a8',
  '0x55b349edebecb11a787ef88563309bca6e832c9c',
  '0x5759089d0a7877b95c52990e27d1c820b2ab4115',
  '0x596fcdbe6cefef2c8bf116d815848dec81aeca34',
  '0x5f27a30295f6315d7738fb62e9bc2d4fb693a30f',
  '0x605d4d207caa2999eb0c00b3390c72d5ced2032b',
  '0x645fb0f72d55b705d148c6b652ffef32d0d4ec16',
  '0x6a41a10d60c4ad40e7e66314486ae33638d9208d',
  '0x6ecb0143d25209e72705ff581f1f39859aae8e9c',
  '0x6f7a0b0a477aee94f9b30c31b32fc6cd019b8a92',
  '0x7c37fd903c7a85c87c23ced83e4007d55020a9a5',
  '0x800831b765c4e3514699abf67ed33b63459f20ca',
  '0x8157a9a9b2ce475fd56fffbbbedbc8b260c261bc',
  '0x820e3b048783c24d6a08bad9e7115e344b3344af',
  '0x83a2b75f4546f355435d72153e0fc0058f4952b2',
  '0x8602782b93afd7fd745e105dad1ccd2c6f66807f',
  '0x86473d938d2567f0cbc585fc9a131cdcab38f0f4',
  '0x8668c91da1ee5b36c0ddc12d21039c845617aa5c',
  '0x879b6979cdd354619975ed42b765db4d52b73d15',
  '0x89d519b86150558e37f189820f305b0759216690',
  '0x8a0c17db41577f792625db42618819be88ccdfb9',
  '0x8d13a452e9244f8d5e6478084f8f6f9c61615a00',
  '0x90123e386b8f3a1c42d5fc0c4cbc6f003b68bc44',
  '0x94b2502fd3058a4e7b992206641793ef18a04fb6',
  '0x9e1303b978334d9f09149e3a149c491d94fbb776',
  '0x9e80376d8d37cd4afc397aeac7f537b7ea5924ba',
  '0x9faaeda816e26c06db2f4c0d8c7b8cbdea599bdd',
  '0xa62e8fa271033daf64808659e31c4ff12b5effc2',
  '0xa656f2647adc72bb753a9a2c52e7b0b4350a44e8',
  '0xa75003955351ae88c3306d1a8e7cd36e849a0426',
  '0xa82cb97357c954858badcdaa21836841c0fbcb37',
  '0xaa3b257d0034595bb4b7150da6b05b8f611be339',
  '0xabb91a4188ae63aeef1d965154525babf65a5d40',
  '0xad3f5d35e361a37d16c4723edeabf18f5c585b0a',
  '0xadc682dbfaccfc3cf55b32da1003d121542648f8',
  '0xaeee18e168520c7eea6a837d1b4bf68470bdbf6b',
  '0xaf54c27b7271d80b96ed36fca5ded57381c73f6f',
  '0xb06ce409d7ddcf10d1ddeec2a7dfc1c4e77be486',
  '0xb071d0402fba6698892baff7d1ac606a5ba11688',
  '0xb5bb8289e7d7ff096ab0ec0f0025c6d217fd4398',
  '0xc07d7565ba4b73f1b4de2522c7886e00ce7507e8',
  '0xc22f94b4861cb41c5a63b5d8ca71fbcdf65d8402',
  '0xd554886dd581a309850f9649ef37adcf6bc81ed8',
  '0xd5832029f54625b1479f2fd34840b550e8754a11',
  '0xd598236b439b4f02ca43b7473a8e2ccdd6a6a824',
  '0xd600ab2eed69d4121fe163b13ff400577c8c4ec3',
  '0xde055c1ab93dfc2ab0eec47db4d3d27bddbe9dc6',
  '0xe158452bbeaaf48863a249ccc25a28f9723db51c',
  '0xe2f0a6e2915c96008efdf566d865cfaa3c64eda5',
  '0xe331c13c3a5902027872582434c7d0861ef8810e',
  '0xe37cd348c3c7f3b5b86fa5433d7cafd33e187610',
  '0xe4dfdfced937f7a9e257babe48090777b1b104c0',
  '0xe86bcd50bff2d0b7db7d110a3d826e57c3dcd0b3',
  '0xeac8465cae35f6b2f0588ab4dbc07b3af85f67f1',
  '0xee4b0245abe70ea639285c481543f4aa2b122d63',
  '0xf111205e0e31a19f68acd4750f3d22f44bf09c62',
  '0xf2c137248bc7a919684eda61739636c9f6e91358',
  '0xf81349b272bc18acf1595b15e916226ca440fcba',
  '0xf92a8ce7104d219ac6ba6ae3b981e895404c34b8',
  '0xfa54fb9f4ac3a5a640383da892d19275adfe3bf2',
  '0xfc419d7b5caa7c698b4f9759b72d5f8771724df0',
  '0xfd65e1042bef05a493f99c5960cb9631e3d3df0d',
  '0xfebf45ae442c94acaf80eaa0ddab5cc9ea1a53a5',
  '0xfec35e785af05b14f204bf4a5557c41f02bbcf4d',
  '0xff17bb4e8ce0bf85db33ef62f9735489e63efd31',
  '0x66110058cf20852e40b7d6765dadf0f3265fb89f',
  '0x791a51bf1e71561027412fedbdafe60aa1be6a7f',
  '0x7f36cf479fcd0636b558cddf33f8e24733a4995e',
  '0x98fedb79db2736bf073fb59a5e3babae29febee5',
  '0xa2ab007985f1827a686058066fbd51c16fff34ef',
  '0xc3a58afba5f646c9e5e7990ce95a13c0c7809a30',
  '0xc45c5892524d2aef529659180f421a41adb6be42',
  '0xed40608cde47bc950a2a540a0183bc9f191cd4c5'
]

app.get('/check/:id' ,async (req, res) =>{
    
    const {id} = req.params;
    if(!id){
        res.status(400).send({message: 'Please insert an id!'})
    }
    let returnAmount = 0;
    let amount = 0;
    returnAmount = await asyncCall(id);
    // if (returnAmount >= 10 && returnAmount < 20) {
    //   amount = 10;
    // }
    // else if (returnAmount >= 20 && returnAmount < 30) {
    //   amount = 20;
    // } else if (returnAmount >= 30) {
    //   amount = 30;
    // } else {
    //   amount = 0;
    // }
    res.send({
        amount: returnAmount
    })
});
