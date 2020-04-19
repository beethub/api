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

export enum ReceiptStatus {
  InProgress = 'IN_PROGRESS',
  Generating = 'GENERATING',
  Done = 'DONE',
  Error = 'ERROR'
}

export type ReceiptConnection = {
   __typename?: 'ReceiptConnection';
  cursor: Scalars['String'];
  hasMore: Scalars['Boolean'];
  receipts: Array<Maybe<Receipt>>;
};

export type MutationResponse = {
  code: Scalars['String'];
  success: Scalars['Boolean'];
  message: Scalars['String'];
};

export type MutationReceiptResponse = MutationResponse & {
   __typename?: 'MutationReceiptResponse';
  code: Scalars['String'];
  success: Scalars['Boolean'];
  message: Scalars['String'];
  receipt?: Maybe<Receipt>;
};

export type File = {
   __typename?: 'File';
  filename: Scalars['String'];
  mimetype: Scalars['String'];
  encoding: Scalars['String'];
};

export type Query = {
   __typename?: 'Query';
  receipts: Array<Maybe<Receipt>>;
  receipt?: Maybe<MutationReceiptResponse>;
};


export type QueryReceiptsArgs = {
  filter?: Maybe<Scalars['String']>;
};


export type QueryReceiptArgs = {
  id: Scalars['ID'];
};

export type Mutation = {
   __typename?: 'Mutation';
  createReceipt: MutationReceiptResponse;
};


export type MutationCreateReceiptArgs = {
  file: Scalars['Upload'];
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
  MXCurrency: ResolverTypeWrapper<Scalars['MXCurrency']>,
  Upload: ResolverTypeWrapper<Scalars['Upload']>,
  Receipt: ResolverTypeWrapper<Receipt>,
  ID: ResolverTypeWrapper<Scalars['ID']>,
  Invoice: ResolverTypeWrapper<Invoice>,
  Ticket: ResolverTypeWrapper<Ticket>,
  ReceiptStatus: ReceiptStatus,
  ReceiptConnection: ResolverTypeWrapper<ReceiptConnection>,
  MutationResponse: ResolversTypes['MutationReceiptResponse'],
  MutationReceiptResponse: ResolverTypeWrapper<MutationReceiptResponse>,
  File: ResolverTypeWrapper<File>,
  Query: ResolverTypeWrapper<{}>,
  Mutation: ResolverTypeWrapper<{}>,
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  String: Scalars['String'],
  Boolean: Scalars['Boolean'],
  MXCurrency: Scalars['MXCurrency'],
  Upload: Scalars['Upload'],
  Receipt: Receipt,
  ID: Scalars['ID'],
  Invoice: Invoice,
  Ticket: Ticket,
  ReceiptStatus: ReceiptStatus,
  ReceiptConnection: ReceiptConnection,
  MutationResponse: ResolversParentTypes['MutationReceiptResponse'],
  MutationReceiptResponse: MutationReceiptResponse,
  File: File,
  Query: {},
  Mutation: {},
};

export type AuthDirectiveArgs = {  };

export type AuthDirectiveResolver<Result, Parent, ContextType = any, Args = AuthDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type HasRoleDirectiveArgs = {   role?: Maybe<Array<Maybe<Scalars['String']>>>; };

export type HasRoleDirectiveResolver<Result, Parent, ContextType = any, Args = HasRoleDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export interface MxCurrencyScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['MXCurrency'], any> {
  name: 'MXCurrency'
}

export interface UploadScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Upload'], any> {
  name: 'Upload'
}

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

export type ReceiptConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['ReceiptConnection'] = ResolversParentTypes['ReceiptConnection']> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  hasMore?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>,
  receipts?: Resolver<Array<Maybe<ResolversTypes['Receipt']>>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type MutationResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['MutationResponse'] = ResolversParentTypes['MutationResponse']> = {
  __resolveType: TypeResolveFn<'MutationReceiptResponse', ParentType, ContextType>,
  code?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>,
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
};

export type MutationReceiptResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['MutationReceiptResponse'] = ResolversParentTypes['MutationReceiptResponse']> = {
  code?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>,
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  receipt?: Resolver<Maybe<ResolversTypes['Receipt']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type FileResolvers<ContextType = any, ParentType extends ResolversParentTypes['File'] = ResolversParentTypes['File']> = {
  filename?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  mimetype?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  encoding?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  receipts?: Resolver<Array<Maybe<ResolversTypes['Receipt']>>, ParentType, ContextType, RequireFields<QueryReceiptsArgs, never>>,
  receipt?: Resolver<Maybe<ResolversTypes['MutationReceiptResponse']>, ParentType, ContextType, RequireFields<QueryReceiptArgs, 'id'>>,
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  createReceipt?: Resolver<ResolversTypes['MutationReceiptResponse'], ParentType, ContextType, RequireFields<MutationCreateReceiptArgs, 'file'>>,
};

export type Resolvers<ContextType = any> = {
  MXCurrency?: GraphQLScalarType,
  Upload?: GraphQLScalarType,
  Receipt?: ReceiptResolvers<ContextType>,
  Invoice?: InvoiceResolvers<ContextType>,
  Ticket?: TicketResolvers<ContextType>,
  ReceiptConnection?: ReceiptConnectionResolvers<ContextType>,
  MutationResponse?: MutationResponseResolvers,
  MutationReceiptResponse?: MutationReceiptResponseResolvers<ContextType>,
  File?: FileResolvers<ContextType>,
  Query?: QueryResolvers<ContextType>,
  Mutation?: MutationResolvers<ContextType>,
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