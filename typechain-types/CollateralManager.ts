/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumberish,
  BytesLike,
  FunctionFragment,
  Result,
  Interface,
  EventFragment,
  AddressLike,
  ContractRunner,
  ContractMethod,
  Listener,
} from "ethers";
import type {
  TypedContractEvent,
  TypedDeferredTopicFilter,
  TypedEventLog,
  TypedLogDescription,
  TypedListener,
  TypedContractMethod,
} from "./common";

export interface CollateralManagerInterface extends Interface {
  getFunction(
    nameOrSignature:
      | "addCollateral"
      | "collateral"
      | "factory"
      | "getCollateral"
      | "registerOption"
      | "reserveCollateral"
      | "returnCollateral"
      | "sendNative"
      | "validOptions"
      | "withdrawCollateral"
  ): FunctionFragment;

  getEvent(
    nameOrSignatureOrTopic:
      | "CollateralAdded"
      | "CollateralReserved"
      | "CollateralReturned"
      | "CollateralWithdrawn"
      | "OptionRegistered"
  ): EventFragment;

  encodeFunctionData(
    functionFragment: "addCollateral",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "collateral",
    values: [AddressLike]
  ): string;
  encodeFunctionData(functionFragment: "factory", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "getCollateral",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "registerOption",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "reserveCollateral",
    values: [AddressLike, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "returnCollateral",
    values: [AddressLike, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "sendNative",
    values: [AddressLike, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "validOptions",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "withdrawCollateral",
    values: [BigNumberish]
  ): string;

  decodeFunctionResult(
    functionFragment: "addCollateral",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "collateral", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "factory", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "getCollateral",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "registerOption",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "reserveCollateral",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "returnCollateral",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "sendNative", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "validOptions",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "withdrawCollateral",
    data: BytesLike
  ): Result;
}

export namespace CollateralAddedEvent {
  export type InputTuple = [user: AddressLike, amount: BigNumberish];
  export type OutputTuple = [user: string, amount: bigint];
  export interface OutputObject {
    user: string;
    amount: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace CollateralReservedEvent {
  export type InputTuple = [optionContract: AddressLike, amount: BigNumberish];
  export type OutputTuple = [optionContract: string, amount: bigint];
  export interface OutputObject {
    optionContract: string;
    amount: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace CollateralReturnedEvent {
  export type InputTuple = [optionContract: AddressLike, amount: BigNumberish];
  export type OutputTuple = [optionContract: string, amount: bigint];
  export interface OutputObject {
    optionContract: string;
    amount: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace CollateralWithdrawnEvent {
  export type InputTuple = [user: AddressLike, amount: BigNumberish];
  export type OutputTuple = [user: string, amount: bigint];
  export interface OutputObject {
    user: string;
    amount: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace OptionRegisteredEvent {
  export type InputTuple = [optionContract: AddressLike];
  export type OutputTuple = [optionContract: string];
  export interface OutputObject {
    optionContract: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export interface CollateralManager extends BaseContract {
  connect(runner?: ContractRunner | null): CollateralManager;
  waitForDeployment(): Promise<this>;

  interface: CollateralManagerInterface;

  queryFilter<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>;
  queryFilter<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>;

  on<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>
  ): Promise<this>;
  on<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>;

  once<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>
  ): Promise<this>;
  once<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>;

  listeners<TCEvent extends TypedContractEvent>(
    event: TCEvent
  ): Promise<Array<TypedListener<TCEvent>>>;
  listeners(eventName?: string): Promise<Array<Listener>>;
  removeAllListeners<TCEvent extends TypedContractEvent>(
    event?: TCEvent
  ): Promise<this>;

  addCollateral: TypedContractMethod<[], [void], "payable">;

  collateral: TypedContractMethod<[arg0: AddressLike], [bigint], "view">;

  factory: TypedContractMethod<[], [string], "view">;

  getCollateral: TypedContractMethod<[_user: AddressLike], [bigint], "view">;

  registerOption: TypedContractMethod<
    [_option: AddressLike],
    [void],
    "nonpayable"
  >;

  reserveCollateral: TypedContractMethod<
    [_seller: AddressLike, _amount: BigNumberish],
    [void],
    "nonpayable"
  >;

  returnCollateral: TypedContractMethod<
    [_seller: AddressLike, _amount: BigNumberish],
    [void],
    "nonpayable"
  >;

  sendNative: TypedContractMethod<
    [_to: AddressLike, _amount: BigNumberish],
    [void],
    "nonpayable"
  >;

  validOptions: TypedContractMethod<[arg0: AddressLike], [boolean], "view">;

  withdrawCollateral: TypedContractMethod<
    [_amount: BigNumberish],
    [void],
    "nonpayable"
  >;

  getFunction<T extends ContractMethod = ContractMethod>(
    key: string | FunctionFragment
  ): T;

  getFunction(
    nameOrSignature: "addCollateral"
  ): TypedContractMethod<[], [void], "payable">;
  getFunction(
    nameOrSignature: "collateral"
  ): TypedContractMethod<[arg0: AddressLike], [bigint], "view">;
  getFunction(
    nameOrSignature: "factory"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "getCollateral"
  ): TypedContractMethod<[_user: AddressLike], [bigint], "view">;
  getFunction(
    nameOrSignature: "registerOption"
  ): TypedContractMethod<[_option: AddressLike], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "reserveCollateral"
  ): TypedContractMethod<
    [_seller: AddressLike, _amount: BigNumberish],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "returnCollateral"
  ): TypedContractMethod<
    [_seller: AddressLike, _amount: BigNumberish],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "sendNative"
  ): TypedContractMethod<
    [_to: AddressLike, _amount: BigNumberish],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "validOptions"
  ): TypedContractMethod<[arg0: AddressLike], [boolean], "view">;
  getFunction(
    nameOrSignature: "withdrawCollateral"
  ): TypedContractMethod<[_amount: BigNumberish], [void], "nonpayable">;

  getEvent(
    key: "CollateralAdded"
  ): TypedContractEvent<
    CollateralAddedEvent.InputTuple,
    CollateralAddedEvent.OutputTuple,
    CollateralAddedEvent.OutputObject
  >;
  getEvent(
    key: "CollateralReserved"
  ): TypedContractEvent<
    CollateralReservedEvent.InputTuple,
    CollateralReservedEvent.OutputTuple,
    CollateralReservedEvent.OutputObject
  >;
  getEvent(
    key: "CollateralReturned"
  ): TypedContractEvent<
    CollateralReturnedEvent.InputTuple,
    CollateralReturnedEvent.OutputTuple,
    CollateralReturnedEvent.OutputObject
  >;
  getEvent(
    key: "CollateralWithdrawn"
  ): TypedContractEvent<
    CollateralWithdrawnEvent.InputTuple,
    CollateralWithdrawnEvent.OutputTuple,
    CollateralWithdrawnEvent.OutputObject
  >;
  getEvent(
    key: "OptionRegistered"
  ): TypedContractEvent<
    OptionRegisteredEvent.InputTuple,
    OptionRegisteredEvent.OutputTuple,
    OptionRegisteredEvent.OutputObject
  >;

  filters: {
    "CollateralAdded(address,uint256)": TypedContractEvent<
      CollateralAddedEvent.InputTuple,
      CollateralAddedEvent.OutputTuple,
      CollateralAddedEvent.OutputObject
    >;
    CollateralAdded: TypedContractEvent<
      CollateralAddedEvent.InputTuple,
      CollateralAddedEvent.OutputTuple,
      CollateralAddedEvent.OutputObject
    >;

    "CollateralReserved(address,uint256)": TypedContractEvent<
      CollateralReservedEvent.InputTuple,
      CollateralReservedEvent.OutputTuple,
      CollateralReservedEvent.OutputObject
    >;
    CollateralReserved: TypedContractEvent<
      CollateralReservedEvent.InputTuple,
      CollateralReservedEvent.OutputTuple,
      CollateralReservedEvent.OutputObject
    >;

    "CollateralReturned(address,uint256)": TypedContractEvent<
      CollateralReturnedEvent.InputTuple,
      CollateralReturnedEvent.OutputTuple,
      CollateralReturnedEvent.OutputObject
    >;
    CollateralReturned: TypedContractEvent<
      CollateralReturnedEvent.InputTuple,
      CollateralReturnedEvent.OutputTuple,
      CollateralReturnedEvent.OutputObject
    >;

    "CollateralWithdrawn(address,uint256)": TypedContractEvent<
      CollateralWithdrawnEvent.InputTuple,
      CollateralWithdrawnEvent.OutputTuple,
      CollateralWithdrawnEvent.OutputObject
    >;
    CollateralWithdrawn: TypedContractEvent<
      CollateralWithdrawnEvent.InputTuple,
      CollateralWithdrawnEvent.OutputTuple,
      CollateralWithdrawnEvent.OutputObject
    >;

    "OptionRegistered(address)": TypedContractEvent<
      OptionRegisteredEvent.InputTuple,
      OptionRegisteredEvent.OutputTuple,
      OptionRegisteredEvent.OutputObject
    >;
    OptionRegistered: TypedContractEvent<
      OptionRegisteredEvent.InputTuple,
      OptionRegisteredEvent.OutputTuple,
      OptionRegisteredEvent.OutputObject
    >;
  };
}
