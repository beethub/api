import {
  IResolvers,
  MutationResolvers
} from "./generated/graphql";
import MXCurrency from "./schema/scalar/currencyMX";
import { QueryResolvers } from "./generated/graphql";
import ReceiptAPI from "./dataSources/receipt";

interface Context {
  dataSources: DataSources;
}

interface DataSources {
  receiptApi: ReceiptAPI;
}

const Query: QueryResolvers<Context> = {
  receipts: (_, args, { dataSources: { receiptApi } }: Context) => {
  
    const filter: string = args.filter ? args.filter : "";
    console.log(filter);
    
    return receiptApi.getReceipts(filter);
  },
};

const Mutation: MutationResolvers<Context> = {};

const resolverMap: IResolvers = {
  MXCurrency: MXCurrency,
  Query,
  Mutation,
};

export default resolverMap;
