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

export interface CallOptionInterface extends Interface {
  getFunction(
    nameOrSignature:
      | "buyOffer"
      | "collateralManager"
      | "deleteOffer"
      | "exercise"
      | "expiration"
      | "factory"
      | "offers"
      | "placeOffer"
      | "positions"
      | "settlePositions"
      | "strike"
  ): FunctionFragment;

  getEvent(
    nameOrSignatureOrTopic: "OfferDeleted" | "OfferPlaced"
  ): EventFragment;

  encodeFunctionData(
    functionFragment: "buyOffer",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "collateralManager",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "deleteOffer",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "exercise",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "expiration",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "factory", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "offers",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "placeOffer",
    values: [BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "positions",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "settlePositions",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "strike", values?: undefined): string;

  decodeFunctionResult(functionFragment: "buyOffer", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "collateralManager",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "deleteOffer",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "exercise", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "expiration", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "factory", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "offers", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "placeOffer", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "positions", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "settlePositions",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "strike", data: BytesLike): Result;
}

export namespace OfferDeletedEvent {
  export type InputTuple = [seller: AddressLike, index: BigNumberish];
  export type OutputTuple = [seller: string, index: bigint];
  export interface OutputObject {
    seller: string;
    index: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace OfferPlacedEvent {
  export type InputTuple = [
    seller: AddressLike,
    amount: BigNumberish,
    price: BigNumberish
  ];
  export type OutputTuple = [seller: string, amount: bigint, price: bigint];
  export interface OutputObject {
    seller: string;
    amount: bigint;
    price: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export interface CallOption extends BaseContract {
  connect(runner?: ContractRunner | null): CallOption;
  waitForDeployment(): Promise<this>;

  interface: CallOptionInterface;

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

  buyOffer: TypedContractMethod<[_offerIndex: BigNumberish], [void], "payable">;

  collateralManager: TypedContractMethod<[], [string], "view">;

  deleteOffer: TypedContractMethod<
    [_offerIndex: BigNumberish],
    [void],
    "nonpayable"
  >;

  exercise: TypedContractMethod<
    [_positionIndex: BigNumberish],
    [void],
    "nonpayable"
  >;

  expiration: TypedContractMethod<[], [bigint], "view">;

  factory: TypedContractMethod<[], [string], "view">;

  offers: TypedContractMethod<
    [arg0: BigNumberish],
    [
      [string, bigint, bigint, bigint] & {
        seller: string;
        amount: bigint;
        price: bigint;
        requiredCollateral: bigint;
      }
    ],
    "view"
  >;

  placeOffer: TypedContractMethod<
    [_size: BigNumberish, _price: BigNumberish],
    [void],
    "nonpayable"
  >;

  positions: TypedContractMethod<
    [arg0: BigNumberish],
    [
      [string, string, bigint, bigint] & {
        buyer: string;
        seller: string;
        size: bigint;
        collateral: bigint;
      }
    ],
    "view"
  >;

  settlePositions: TypedContractMethod<[], [void], "nonpayable">;

  strike: TypedContractMethod<[], [bigint], "view">;

  getFunction<T extends ContractMethod = ContractMethod>(
    key: string | FunctionFragment
  ): T;

  getFunction(
    nameOrSignature: "buyOffer"
  ): TypedContractMethod<[_offerIndex: BigNumberish], [void], "payable">;
  getFunction(
    nameOrSignature: "collateralManager"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "deleteOffer"
  ): TypedContractMethod<[_offerIndex: BigNumberish], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "exercise"
  ): TypedContractMethod<[_positionIndex: BigNumberish], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "expiration"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "factory"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "offers"
  ): TypedContractMethod<
    [arg0: BigNumberish],
    [
      [string, bigint, bigint, bigint] & {
        seller: string;
        amount: bigint;
        price: bigint;
        requiredCollateral: bigint;
      }
    ],
    "view"
  >;
  getFunction(
    nameOrSignature: "placeOffer"
  ): TypedContractMethod<
    [_size: BigNumberish, _price: BigNumberish],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "positions"
  ): TypedContractMethod<
    [arg0: BigNumberish],
    [
      [string, string, bigint, bigint] & {
        buyer: string;
        seller: string;
        size: bigint;
        collateral: bigint;
      }
    ],
    "view"
  >;
  getFunction(
    nameOrSignature: "settlePositions"
  ): TypedContractMethod<[], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "strike"
  ): TypedContractMethod<[], [bigint], "view">;

  getEvent(
    key: "OfferDeleted"
  ): TypedContractEvent<
    OfferDeletedEvent.InputTuple,
    OfferDeletedEvent.OutputTuple,
    OfferDeletedEvent.OutputObject
  >;
  getEvent(
    key: "OfferPlaced"
  ): TypedContractEvent<
    OfferPlacedEvent.InputTuple,
    OfferPlacedEvent.OutputTuple,
    OfferPlacedEvent.OutputObject
  >;

  filters: {
    "OfferDeleted(address,uint256)": TypedContractEvent<
      OfferDeletedEvent.InputTuple,
      OfferDeletedEvent.OutputTuple,
      OfferDeletedEvent.OutputObject
    >;
    OfferDeleted: TypedContractEvent<
      OfferDeletedEvent.InputTuple,
      OfferDeletedEvent.OutputTuple,
      OfferDeletedEvent.OutputObject
    >;

    "OfferPlaced(address,uint256,uint256)": TypedContractEvent<
      OfferPlacedEvent.InputTuple,
      OfferPlacedEvent.OutputTuple,
      OfferPlacedEvent.OutputObject
    >;
    OfferPlaced: TypedContractEvent<
      OfferPlacedEvent.InputTuple,
      OfferPlacedEvent.OutputTuple,
      OfferPlacedEvent.OutputObject
    >;
  };
}
