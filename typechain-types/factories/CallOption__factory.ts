/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  Contract,
  ContractFactory,
  ContractTransactionResponse,
  Interface,
} from "ethers";
import type {
  Signer,
  BigNumberish,
  AddressLike,
  ContractDeployTransaction,
  ContractRunner,
} from "ethers";
import type { NonPayableOverrides } from "../common";
import type { CallOption, CallOptionInterface } from "../CallOption";

const _abi = [
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_strike",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_expiration",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "_factory",
        type: "address",
      },
      {
        internalType: "address",
        name: "_collateralManager",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "seller",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "index",
        type: "uint256",
      },
    ],
    name: "OfferDeleted",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "seller",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "price",
        type: "uint256",
      },
    ],
    name: "OfferPlaced",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_offerIndex",
        type: "uint256",
      },
    ],
    name: "buyOffer",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "collateralManager",
    outputs: [
      {
        internalType: "contract CollateralManager",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_offerIndex",
        type: "uint256",
      },
    ],
    name: "deleteOffer",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_positionIndex",
        type: "uint256",
      },
    ],
    name: "exercise",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "expiration",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "factory",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "offers",
    outputs: [
      {
        internalType: "address",
        name: "seller",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "price",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "requiredCollateral",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_size",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_price",
        type: "uint256",
      },
    ],
    name: "placeOffer",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "positions",
    outputs: [
      {
        internalType: "address",
        name: "buyer",
        type: "address",
      },
      {
        internalType: "address",
        name: "seller",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "size",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "collateral",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "settlePositions",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "strike",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    stateMutability: "payable",
    type: "receive",
  },
] as const;

const _bytecode =
  "0x608060405234801561001057600080fd5b5060405161258b38038061258b833981810160405281019061003291906101a5565b428311610074576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161006b90610269565b60405180910390fd5b836001819055508260028190555081600360006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550806000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555050505050610289565b600080fd5b6000819050919050565b61012481610111565b811461012f57600080fd5b50565b6000815190506101418161011b565b92915050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b600061017282610147565b9050919050565b61018281610167565b811461018d57600080fd5b50565b60008151905061019f81610179565b92915050565b600080600080608085870312156101bf576101be61010c565b5b60006101cd87828801610132565b94505060206101de87828801610132565b93505060406101ef87828801610190565b925050606061020087828801610190565b91505092959194509250565b600082825260208201905092915050565b7f45787069726174696f6e206d75737420626520696e2074686520667574757265600082015250565b600061025360208361020c565b915061025e8261021d565b602082019050919050565b6000602082019050818103600083015261028281610246565b9050919050565b6122f3806102986000396000f3fe6080604052600436106100a05760003560e01c80639b10d169116100645780639b10d169146101ab5780639ecce700146101c2578063a95902b2146101de578063ad8f500814610207578063b07f0a4114610232578063c45a01551461025b576100a7565b806323be345c146100ac5780634665096d146100d757806374268ff2146101025780638a72ea6a1461012b57806399fbab881461016b576100a7565b366100a757005b600080fd5b3480156100b857600080fd5b506100c1610286565b6040516100ce9190611756565b60405180910390f35b3480156100e357600080fd5b506100ec6102aa565b6040516100f9919061178a565b60405180910390f35b34801561010e57600080fd5b50610129600480360381019061012491906117d6565b6102b0565b005b34801561013757600080fd5b50610152600480360381019061014d91906117d6565b610542565b6040516101629493929190611824565b60405180910390f35b34801561017757600080fd5b50610192600480360381019061018d91906117d6565b6105a2565b6040516101a29493929190611869565b60405180910390f35b3480156101b757600080fd5b506101c0610622565b005b6101dc60048036038101906101d791906117d6565b61083f565b005b3480156101ea57600080fd5b50610205600480360381019061020091906118ae565b610ef2565b005b34801561021357600080fd5b5061021c6110fe565b604051610229919061178a565b60405180910390f35b34801561023e57600080fd5b50610259600480360381019061025491906117d6565b611104565b005b34801561026757600080fd5b50610270611493565b60405161027d91906118ee565b60405180910390f35b60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60025481565b60058054905081106102f7576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016102ee90611966565b60405180910390fd5b3373ffffffffffffffffffffffffffffffffffffffff166005828154811061032257610321611986565b5b906000526020600020906004020160000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16146103aa576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016103a190611a27565b60405180910390fd5b3373ffffffffffffffffffffffffffffffffffffffff167fc21fa646cfa9effb4f4abd39a852dd64181309897fedd3e19235b87e685f3bc4826040516103f0919061178a565b60405180910390a26005600160058054905061040c9190611a76565b8154811061041d5761041c611986565b5b90600052602060002090600402016005828154811061043f5761043e611986565b5b90600052602060002090600402016000820160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff168160000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060018201548160010155600282015481600201556003820154816003015590505060058054806104e7576104e6611aaa565b5b6001900381819060005260206000209060040201600080820160006101000a81549073ffffffffffffffffffffffffffffffffffffffff02191690556001820160009055600282016000905560038201600090555050905550565b6005818154811061055257600080fd5b90600052602060002090600402016000915090508060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16908060010154908060020154908060030154905084565b600481815481106105b257600080fd5b90600052602060002090600402016000915090508060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16908060010160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16908060020154908060030154905084565b600073ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614610691576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161068890611b4b565b60405180910390fd5b6002544210156106d6576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016106cd90611bb7565b60405180910390fd5b60003a905080600154106108145760005b60048054905081101561080d5760006004828154811061070a57610709611986565b5b906000526020600020906004020190506000816002015411156107ff576000816003015411156107ea5760008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166374e863ad8260010160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1683600301546040518363ffffffff1660e01b81526004016107b7929190611bd7565b600060405180830381600087803b1580156107d157600080fd5b505af11580156107e5573d6000803e3d6000fd5b505050505b60008160020181905550600081600301819055505b5080806001019150506106e7565b505061083d565b60005b60048054905081101561083a5761082d816114b9565b8080600101915050610817565b50505b565b6002544210610883576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161087a90611c4c565b60405180910390fd5b600034116108c6576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016108bd90611cb8565b60405180910390fd5b6000600582815481106108dc576108db611986565b5b90600052602060002090600402016040518060800160405290816000820160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020016001820154815260200160028201548152602001600382015481525050905060008160200151116109b2576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016109a990611d24565b60405180910390fd5b6000816040015182602001516109c89190611d44565b90506103e88160056109da9190611d44565b6109e49190611db5565b816109ef9190611de6565b341015610a31576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610a2890611e66565b60405180910390fd5b600060015483602001516003610a479190611d44565b610a519190611d44565b905060008160008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16639b56d6c986600001516040518263ffffffff1660e01b8152600401610ab391906118ee565b602060405180830381865afa158015610ad0573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610af49190611e9b565b1015905080610b38576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610b2f90611f14565b60405180910390fd5b600060405180608001604052803373ffffffffffffffffffffffffffffffffffffffff168152602001866000015173ffffffffffffffffffffffffffffffffffffffff16815260200186602001518152602001848152509050600481908060018154018082558091505060019003906000526020600020906004020160009091909190915060008201518160000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060208201518160010160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506040820151816002015560608201518160030155505060008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16632a50d2b78660000151856040518363ffffffff1660e01b8152600401610cc0929190611bd7565b600060405180830381600087803b158015610cda57600080fd5b505af1158015610cee573d6000803e3d6000fd5b505050506000856000015173ffffffffffffffffffffffffffffffffffffffff1685604051610d1c90611f65565b60006040518083038185875af1925050503d8060008114610d59576040519150601f19603f3d011682016040523d82523d6000602084013e610d5e565b606091505b5050905080610da2576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610d9990611fec565b60405180910390fd5b60056001600580549050610db69190611a76565b81548110610dc757610dc6611986565b5b906000526020600020906004020160058881548110610de957610de8611986565b5b90600052602060002090600402016000820160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff168160000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506001820154816001015560028201548160020155600382015481600301559050506005805480610e9157610e90611aaa565b5b6001900381819060005260206000209060040201600080820160006101000a81549073ffffffffffffffffffffffffffffffffffffffff02191690556001820160009055600282016000905560038201600090555050905550505050505050565b6002544210610f36576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610f2d90611c4c565b60405180910390fd5b60008211610f79576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610f7090612058565b60405180910390fd5b60008111610fbc576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610fb3906120c4565b60405180910390fd5b600060405180608001604052803373ffffffffffffffffffffffffffffffffffffffff16815260200184815260200183815260200183856003610fff9190611d44565b6110099190611d44565b8152509050600581908060018154018082558091505060019003906000526020600020906004020160009091909190915060008201518160000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060208201518160010155604082015181600201556060820151816003015550503373ffffffffffffffffffffffffffffffffffffffff167fbd6897d6ab8a2726fd0560037489e08c4a4907621eaef87bdf6e8cc6ae5dadb4826020015183604001516040516110f19291906120e4565b60405180910390a2505050565b60015481565b6002544210611148576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161113f90611c4c565b60405180910390fd5b600480549050811061118f576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161118690612159565b60405180910390fd5b6000600482815481106111a5576111a4611986565b5b906000526020600020906004020190503373ffffffffffffffffffffffffffffffffffffffff168160000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1614611247576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161123e906121c5565b60405180910390fd5b600081600201541161128e576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161128590612231565b60405180910390fd5b60003a905060015481116112d7576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016112ce9061229d565b60405180910390fd5b6000600154826112e79190611a76565b905060008360020154826112fb9190611d44565b9050600084600301548210611316578460030154905061131a565b8190505b600081866003015461132c9190611a76565b905060008111156113e95760008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166374e863ad8760010160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16836040518363ffffffff1660e01b81526004016113b6929190611bd7565b600060405180830381600087803b1580156113d057600080fd5b505af11580156113e4573d6000803e3d6000fd5b505050505b60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16636680756633846040518363ffffffff1660e01b8152600401611444929190611bd7565b600060405180830381600087803b15801561145e57600080fd5b505af1158015611472573d6000803e3d6000fd5b50505050600086600201819055506000866003018190555050505050505050565b600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b6000600482815481106114cf576114ce611986565b5b9060005260206000209060040201905060008160020154036114f157506116d4565b60003a90506000600154826115069190611a76565b9050600083600201548261151a9190611d44565b90506000846003015482106115355784600301549050611539565b8190505b600081866003015461154b9190611a76565b905060008111156116085760008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166374e863ad8760010160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16836040518363ffffffff1660e01b81526004016115d5929190611bd7565b600060405180830381600087803b1580156115ef57600080fd5b505af1158015611603573d6000803e3d6000fd5b505050505b60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663668075668760000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16846040518363ffffffff1660e01b8152600401611687929190611bd7565b600060405180830381600087803b1580156116a157600080fd5b505af11580156116b5573d6000803e3d6000fd5b5050505060008660020181905550600086600301819055505050505050505b50565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000819050919050565b600061171c611717611712846116d7565b6116f7565b6116d7565b9050919050565b600061172e82611701565b9050919050565b600061174082611723565b9050919050565b61175081611735565b82525050565b600060208201905061176b6000830184611747565b92915050565b6000819050919050565b61178481611771565b82525050565b600060208201905061179f600083018461177b565b92915050565b600080fd5b6117b381611771565b81146117be57600080fd5b50565b6000813590506117d0816117aa565b92915050565b6000602082840312156117ec576117eb6117a5565b5b60006117fa848285016117c1565b91505092915050565b600061180e826116d7565b9050919050565b61181e81611803565b82525050565b60006080820190506118396000830187611815565b611846602083018661177b565b611853604083018561177b565b611860606083018461177b565b95945050505050565b600060808201905061187e6000830187611815565b61188b6020830186611815565b611898604083018561177b565b6118a5606083018461177b565b95945050505050565b600080604083850312156118c5576118c46117a5565b5b60006118d3858286016117c1565b92505060206118e4858286016117c1565b9150509250929050565b60006020820190506119036000830184611815565b92915050565b600082825260208201905092915050565b7f496e76616c6964206f6666657220696e64657800000000000000000000000000600082015250565b6000611950601383611909565b915061195b8261191a565b602082019050919050565b6000602082019050818103600083015261197f81611943565b9050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b7f4f6e6c79207468652073656c6c65722063616e2064656c65746520746869732060008201527f6f66666572000000000000000000000000000000000000000000000000000000602082015250565b6000611a11602583611909565b9150611a1c826119b5565b604082019050919050565b60006020820190508181036000830152611a4081611a04565b9050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b6000611a8182611771565b9150611a8c83611771565b9250828203905081811115611aa457611aa3611a47565b5b92915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603160045260246000fd5b7f4f6e6c79207468652061646d696e2063616e2063616c6c20746869732066756e60008201527f6374696f6e000000000000000000000000000000000000000000000000000000602082015250565b6000611b35602583611909565b9150611b4082611ad9565b604082019050919050565b60006020820190508181036000830152611b6481611b28565b9050919050565b7f4f7074696f6e20686173206e6f74206578706972656420796574000000000000600082015250565b6000611ba1601a83611909565b9150611bac82611b6b565b602082019050919050565b60006020820190508181036000830152611bd081611b94565b9050919050565b6000604082019050611bec6000830185611815565b611bf9602083018461177b565b9392505050565b7f4f7074696f6e2068617320657870697265640000000000000000000000000000600082015250565b6000611c36601283611909565b9150611c4182611c00565b602082019050919050565b60006020820190508181036000830152611c6581611c29565b9050919050565b7f4d7573742073656e642045544820746f20627579206f66666572730000000000600082015250565b6000611ca2601b83611909565b9150611cad82611c6c565b602082019050919050565b60006020820190508181036000830152611cd181611c95565b9050919050565b7f4f6666657220686173206e6f20756e697473206c656674000000000000000000600082015250565b6000611d0e601783611909565b9150611d1982611cd8565b602082019050919050565b60006020820190508181036000830152611d3d81611d01565b9050919050565b6000611d4f82611771565b9150611d5a83611771565b9250828202611d6881611771565b91508282048414831517611d7f57611d7e611a47565b5b5092915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b6000611dc082611771565b9150611dcb83611771565b925082611ddb57611dda611d86565b5b828204905092915050565b6000611df182611771565b9150611dfc83611771565b9250828201905080821115611e1457611e13611a47565b5b92915050565b7f496e73756666696369656e74204554482073656e740000000000000000000000600082015250565b6000611e50601583611909565b9150611e5b82611e1a565b602082019050919050565b60006020820190508181036000830152611e7f81611e43565b9050919050565b600081519050611e95816117aa565b92915050565b600060208284031215611eb157611eb06117a5565b5b6000611ebf84828501611e86565b91505092915050565b7f496e73756666696369656e742073656c6c657220636f6c6c61746572616c0000600082015250565b6000611efe601e83611909565b9150611f0982611ec8565b602082019050919050565b60006020820190508181036000830152611f2d81611ef1565b9050919050565b600081905092915050565b50565b6000611f4f600083611f34565b9150611f5a82611f3f565b600082019050919050565b6000611f7082611f42565b9150819050919050565b7f4661696c656420746f207472616e73666572207072656d69756d20746f20736560008201527f6c6c657200000000000000000000000000000000000000000000000000000000602082015250565b6000611fd6602483611909565b9150611fe182611f7a565b604082019050919050565b6000602082019050818103600083015261200581611fc9565b9050919050565b7f416d6f756e74206d7573742062652067726561746572207468616e207a65726f600082015250565b6000612042602083611909565b915061204d8261200c565b602082019050919050565b6000602082019050818103600083015261207181612035565b9050919050565b7f5072696365206d7573742062652067726561746572207468616e207a65726f00600082015250565b60006120ae601f83611909565b91506120b982612078565b602082019050919050565b600060208201905081810360008301526120dd816120a1565b9050919050565b60006040820190506120f9600083018561177b565b612106602083018461177b565b9392505050565b7f496e76616c696420706f736974696f6e20696e64657800000000000000000000600082015250565b6000612143601683611909565b915061214e8261210d565b602082019050919050565b6000602082019050818103600083015261217281612136565b9050919050565b7f4f6e6c792062757965722063616e206578657263697365000000000000000000600082015250565b60006121af601783611909565b91506121ba82612179565b602082019050919050565b600060208201905081810360008301526121de816121a2565b9050919050565b7f506f736974696f6e20616c726561647920657865726369736564000000000000600082015250565b600061221b601a83611909565b9150612226826121e5565b602082019050919050565b6000602082019050818103600083015261224a8161220e565b9050919050565b7f4f7074696f6e206e6f742049544d000000000000000000000000000000000000600082015250565b6000612287600e83611909565b915061229282612251565b602082019050919050565b600060208201905081810360008301526122b68161227a565b905091905056fea2646970667358221220d16f8eb1b55bb986b5739fbeedea06d78ff820e309040ab3171eea697fda88e264736f6c634300081a0033";

type CallOptionConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: CallOptionConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class CallOption__factory extends ContractFactory {
  constructor(...args: CallOptionConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override getDeployTransaction(
    _strike: BigNumberish,
    _expiration: BigNumberish,
    _factory: AddressLike,
    _collateralManager: AddressLike,
    overrides?: NonPayableOverrides & { from?: string }
  ): Promise<ContractDeployTransaction> {
    return super.getDeployTransaction(
      _strike,
      _expiration,
      _factory,
      _collateralManager,
      overrides || {}
    );
  }
  override deploy(
    _strike: BigNumberish,
    _expiration: BigNumberish,
    _factory: AddressLike,
    _collateralManager: AddressLike,
    overrides?: NonPayableOverrides & { from?: string }
  ) {
    return super.deploy(
      _strike,
      _expiration,
      _factory,
      _collateralManager,
      overrides || {}
    ) as Promise<
      CallOption & {
        deploymentTransaction(): ContractTransactionResponse;
      }
    >;
  }
  override connect(runner: ContractRunner | null): CallOption__factory {
    return super.connect(runner) as CallOption__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): CallOptionInterface {
    return new Interface(_abi) as CallOptionInterface;
  }
  static connect(address: string, runner?: ContractRunner | null): CallOption {
    return new Contract(address, _abi, runner) as unknown as CallOption;
  }
}