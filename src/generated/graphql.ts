import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
export type Maybe<T> = T | null;
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  MXCurrency: any;
  Upload: any;
};



export type Notification = {
   __typename?: 'Notification';
  title?: Maybe<Scalars['String']>;
  message?: Maybe<Scalars['String']>;
  date?: Maybe<Scalars['String']>;
  readed?: Maybe<Scalars['Boolean']>;
};

export type Configuration = {
   __typename?: 'Configuration';
  invoiceProfile?: Maybe<InvoiceProfile>;
  notification?: Maybe<ConfigNotification>;
};

export type ConfigNotification = {
   __typename?: 'ConfigNotification';
  invoiceResult: Scalars['Boolean'];
};

export type InvoiceProfile = {
   __typename?: 'InvoiceProfile';
  rfc: Scalars['String'];
  razonSocial: Scalars['String'];
  direccion?: Maybe<Address>;
};

export type InputAdress = {
  calle?: Maybe<Scalars['String']>;
  numeroExterior?: Maybe<Scalars['String']>;
  numeroInterior?: Maybe<Scalars['String']>;
  colonia?: Maybe<Scalars['String']>;
  codigoPostal?: Maybe<Scalars['String']>;
};

export type InvoiceProfileInput = {
  rfc: Scalars['String'];
  razonSocial: Scalars['String'];
  direccion?: Maybe<InputAdress>;
};

export type Address = {
   __typename?: 'Address';
  calle?: Maybe<Scalars['String']>;
  numeroExterior?: Maybe<Scalars['String']>;
  numeroInterior?: Maybe<Scalars['String']>;
  colonia?: Maybe<Scalars['String']>;
  codigoPostal?: Maybe<Scalars['String']>;
};

export type MutationConfigNotification = MutationResponse & {
   __typename?: 'MutationConfigNotification';
  code: Scalars['String'];
  success: Scalars['Boolean'];
  message: Scalars['String'];
  notification?: Maybe<ConfigNotification>;
};

export type MutationInvoiceProfile = MutationResponse & {
   __typename?: 'MutationInvoiceProfile';
  code: Scalars['String'];
  success: Scalars['Boolean'];
  message: Scalars['String'];
  invoiceProfile?: Maybe<InvoiceProfile>;
};

export type Query = {
   __typename?: 'Query';
  configuration?: Maybe<Configuration>;
  receipt?: Maybe<Receipt>;
  receipts: ReceiptResponse;
};


export type QueryReceiptArgs = {
  id: Scalars['ID'];
};


export type QueryReceiptsArgs = {
  input?: Maybe<ReceiptFilter>;
};

export type Mutation = {
   __typename?: 'Mutation';
  createReceipt: MutationReceiptResponse;
  updateInvoiceProfile?: Maybe<MutationInvoiceProfile>;
  updateNotificationInvoiceResult?: Maybe<MutationConfigNotification>;
};


export type MutationCreateReceiptArgs = {
  file: Scalars['Upload'];
};


export type MutationUpdateInvoiceProfileArgs = {
  input: InvoiceProfileInput;
};


export type MutationUpdateNotificationInvoiceResultArgs = {
  input: Scalars['Boolean'];
};

export type Receipt = {
   __typename?: 'Receipt';
  id: Scalars['ID'];
  business?: Maybe<Scalars['String']>;
  date?: Maybe<Scalars['String']>;
  amount?: Maybe<Scalars['MXCurrency']>;
  createdAt: Scalars['String'];
  createdDate: Scalars['String'];
  ticket?: Maybe<Ticket>;
  invoice?: Maybe<Invoice>;
  status: ReceiptStatus;
};

export type Invoice = {
   __typename?: 'Invoice';
  xml: Scalars['String'];
  pdf: Scalars['String'];
};

export type Ticket = {
   __typename?: 'Ticket';
  url: Scalars['String'];
};

export enum Responsable {
  User = 'USER',
  System = 'SYSTEM'
}

export enum ReceiptStatus {
  InProgress = 'IN_PROGRESS',
  Generating = 'GENERATING',
  Done = 'DONE',
  Error = 'ERROR'
}

export type ReceiptFilter = {
  text?: Maybe<Scalars['String']>;
  status?: Maybe<Array<Maybe<ReceiptStatus>>>;
};

export type ReceiptResponse = Response & {
   __typename?: 'ReceiptResponse';
  totalCount: Scalars['Int'];
  receipts: Array<Maybe<Receipt>>;
};

export type MutationReceiptResponse = MutationResponse & {
   __typename?: 'MutationReceiptResponse';
  code: Scalars['String'];
  success: Scalars['Boolean'];
  message: Scalars['String'];
  receipt?: Maybe<Receipt>;
};



export type MutationResponse = {
  code: Scalars['String'];
  success: Scalars['Boolean'];
  message: Scalars['String'];
};

export type Response = {
  totalCount: Scalars['Int'];
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type StitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type isTypeOfResolverFn<T = {}> = (obj: T, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  String: ResolverTypeWrapper<Scalars['String']>,
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>,
  Notification: ResolverTypeWrapper<Notification>,
  Configuration: ResolverTypeWrapper<Configuration>,
  ConfigNotification: ResolverTypeWrapper<ConfigNotification>,
  InvoiceProfile: ResolverTypeWrapper<InvoiceProfile>,
  InputAdress: InputAdress,
  InvoiceProfileInput: InvoiceProfileInput,
  Address: ResolverTypeWrapper<Address>,
  MutationConfigNotification: ResolverTypeWrapper<MutationConfigNotification>,
  MutationInvoiceProfile: ResolverTypeWrapper<MutationInvoiceProfile>,
  Query: ResolverTypeWrapper<{}>,
  ID: ResolverTypeWrapper<Scalars['ID']>,
  Mutation: ResolverTypeWrapper<{}>,
  Receipt: ResolverTypeWrapper<Receipt>,
  Invoice: ResolverTypeWrapper<Invoice>,
  Ticket: ResolverTypeWrapper<Ticket>,
  Responsable: Responsable,
  ReceiptStatus: ReceiptStatus,
  ReceiptFilter: ReceiptFilter,
  ReceiptResponse: ResolverTypeWrapper<ReceiptResponse>,
  Int: ResolverTypeWrapper<Scalars['Int']>,
  MutationReceiptResponse: ResolverTypeWrapper<MutationReceiptResponse>,
  MXCurrency: ResolverTypeWrapper<Scalars['MXCurrency']>,
  Upload: ResolverTypeWrapper<Scalars['Upload']>,
  MutationResponse: ResolversTypes['MutationConfigNotification'] | ResolversTypes['MutationInvoiceProfile'] | ResolversTypes['MutationReceiptResponse'],
  Response: ResolversTypes['ReceiptResponse'],
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  String: Scalars['String'],
  Boolean: Scalars['Boolean'],
  Notification: Notification,
  Configuration: Configuration,
  ConfigNotification: ConfigNotification,
  InvoiceProfile: InvoiceProfile,
  InputAdress: InputAdress,
  InvoiceProfileInput: InvoiceProfileInput,
  Address: Address,
  MutationConfigNotification: MutationConfigNotification,
  MutationInvoiceProfile: MutationInvoiceProfile,
  Query: {},
  ID: Scalars['ID'],
  Mutation: {},
  Receipt: Receipt,
  Invoice: Invoice,
  Ticket: Ticket,
  Responsable: Responsable,
  ReceiptStatus: ReceiptStatus,
  ReceiptFilter: ReceiptFilter,
  ReceiptResponse: ReceiptResponse,
  Int: Scalars['Int'],
  MutationReceiptResponse: MutationReceiptResponse,
  MXCurrency: Scalars['MXCurrency'],
  Upload: Scalars['Upload'],
  MutationResponse: ResolversParentTypes['MutationConfigNotification'] | ResolversParentTypes['MutationInvoiceProfile'] | ResolversParentTypes['MutationReceiptResponse'],
  Response: ResolversParentTypes['ReceiptResponse'],
};

export type AuthDirectiveArgs = {  };

export type AuthDirectiveResolver<Result, Parent, ContextType = any, Args = AuthDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type HasRoleDirectiveArgs = {   role?: Maybe<Array<Maybe<Scalars['String']>>>; };

export type HasRoleDirectiveResolver<Result, Parent, ContextType = any, Args = HasRoleDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type NotificationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Notification'] = ResolversParentTypes['Notification']> = {
  title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  date?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  readed?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type ConfigurationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Configuration'] = ResolversParentTypes['Configuration']> = {
  invoiceProfile?: Resolver<Maybe<ResolversTypes['InvoiceProfile']>, ParentType, ContextType>,
  notification?: Resolver<Maybe<ResolversTypes['ConfigNotification']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type ConfigNotificationResolvers<ContextType = any, ParentType extends ResolversParentTypes['ConfigNotification'] = ResolversParentTypes['ConfigNotification']> = {
  invoiceResult?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type InvoiceProfileResolvers<ContextType = any, ParentType extends ResolversParentTypes['InvoiceProfile'] = ResolversParentTypes['InvoiceProfile']> = {
  rfc?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  razonSocial?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  direccion?: Resolver<Maybe<ResolversTypes['Address']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type AddressResolvers<ContextType = any, ParentType extends ResolversParentTypes['Address'] = ResolversParentTypes['Address']> = {
  calle?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  numeroExterior?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  numeroInterior?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  colonia?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  codigoPostal?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type MutationConfigNotificationResolvers<ContextType = any, ParentType extends ResolversParentTypes['MutationConfigNotification'] = ResolversParentTypes['MutationConfigNotification']> = {
  code?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>,
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  notification?: Resolver<Maybe<ResolversTypes['ConfigNotification']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type MutationInvoiceProfileResolvers<ContextType = any, ParentType extends ResolversParentTypes['MutationInvoiceProfile'] = ResolversParentTypes['MutationInvoiceProfile']> = {
  code?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>,
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  invoiceProfile?: Resolver<Maybe<ResolversTypes['InvoiceProfile']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  configuration?: Resolver<Maybe<ResolversTypes['Configuration']>, ParentType, ContextType>,
  receipt?: Resolver<Maybe<ResolversTypes['Receipt']>, ParentType, ContextType, RequireFields<QueryReceiptArgs, 'id'>>,
  receipts?: Resolver<ResolversTypes['ReceiptResponse'], ParentType, ContextType, RequireFields<QueryReceiptsArgs, never>>,
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  createReceipt?: Resolver<ResolversTypes['MutationReceiptResponse'], ParentType, ContextType, RequireFields<MutationCreateReceiptArgs, 'file'>>,
  updateInvoiceProfile?: Resolver<Maybe<ResolversTypes['MutationInvoiceProfile']>, ParentType, ContextType, RequireFields<MutationUpdateInvoiceProfileArgs, 'input'>>,
  updateNotificationInvoiceResult?: Resolver<Maybe<ResolversTypes['MutationConfigNotification']>, ParentType, ContextType, RequireFields<MutationUpdateNotificationInvoiceResultArgs, 'input'>>,
};

export type ReceiptResolvers<ContextType = any, ParentType extends ResolversParentTypes['Receipt'] = ResolversParentTypes['Receipt']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  business?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  date?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  amount?: Resolver<Maybe<ResolversTypes['MXCurrency']>, ParentType, ContextType>,
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  createdDate?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  ticket?: Resolver<Maybe<ResolversTypes['Ticket']>, ParentType, ContextType>,
  invoice?: Resolver<Maybe<ResolversTypes['Invoice']>, ParentType, ContextType>,
  status?: Resolver<ResolversTypes['ReceiptStatus'], ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type InvoiceResolvers<ContextType = any, ParentType extends ResolversParentTypes['Invoice'] = ResolversParentTypes['Invoice']> = {
  xml?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  pdf?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type TicketResolvers<ContextType = any, ParentType extends ResolversParentTypes['Ticket'] = ResolversParentTypes['Ticket']> = {
  url?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type ReceiptResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['ReceiptResponse'] = ResolversParentTypes['ReceiptResponse']> = {
  totalCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
  receipts?: Resolver<Array<Maybe<ResolversTypes['Receipt']>>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type MutationReceiptResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['MutationReceiptResponse'] = ResolversParentTypes['MutationReceiptResponse']> = {
  code?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>,
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  receipt?: Resolver<Maybe<ResolversTypes['Receipt']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export interface MxCurrencyScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['MXCurrency'], any> {
  name: 'MXCurrency'
}

export interface UploadScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Upload'], any> {
  name: 'Upload'
}

export type MutationResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['MutationResponse'] = ResolversParentTypes['MutationResponse']> = {
  __resolveType: TypeResolveFn<'MutationConfigNotification' | 'MutationInvoiceProfile' | 'MutationReceiptResponse', ParentType, ContextType>,
  code?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>,
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
};

export type ResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['Response'] = ResolversParentTypes['Response']> = {
  __resolveType: TypeResolveFn<'ReceiptResponse', ParentType, ContextType>,
  totalCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
};

export type Resolvers<ContextType = any> = {
  Notification?: NotificationResolvers<ContextType>,
  Configuration?: ConfigurationResolvers<ContextType>,
  ConfigNotification?: ConfigNotificationResolvers<ContextType>,
  InvoiceProfile?: InvoiceProfileResolvers<ContextType>,
  Address?: AddressResolvers<ContextType>,
  MutationConfigNotification?: MutationConfigNotificationResolvers<ContextType>,
  MutationInvoiceProfile?: MutationInvoiceProfileResolvers<ContextType>,
  Query?: QueryResolvers<ContextType>,
  Mutation?: MutationResolvers<ContextType>,
  Receipt?: ReceiptResolvers<ContextType>,
  Invoice?: InvoiceResolvers<ContextType>,
  Ticket?: TicketResolvers<ContextType>,
  ReceiptResponse?: ReceiptResponseResolvers<ContextType>,
  MutationReceiptResponse?: MutationReceiptResponseResolvers<ContextType>,
  MXCurrency?: GraphQLScalarType,
  Upload?: GraphQLScalarType,
  MutationResponse?: MutationResponseResolvers,
  Response?: ResponseResolvers,
};


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
*/
export type IResolvers<ContextType = any> = Resolvers<ContextType>;
export type DirectiveResolvers<ContextType = any> = {
  auth?: AuthDirectiveResolver<any, any, ContextType>,
  hasRole?: HasRoleDirectiveResolver<any, any, ContextType>,
};


/**
* @deprecated
* Use "DirectiveResolvers" root object instead. If you wish to get "IDirectiveResolvers", add "typesPrefix: I" to your config.
*/
export type IDirectiveResolvers<ContextType = any> = DirectiveResolvers<ContextType>;