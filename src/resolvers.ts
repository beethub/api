import { IResolvers, MutationResolvers } from "./generated/graphql";
import MXCurrency from "./schema/scalar/currencyMX";
import { QueryResolvers } from "./generated/graphql";
import ReceiptAPI from "./dataSources/receiptApi";
import FileDataSource from "./dataSources/fileDataSource";

interface Context {
  dataSources: DataSources;
}

interface DataSources {
  receiptApi: ReceiptAPI;
  fileDataSource: FileDataSource;
}

const Query: QueryResolvers<Context> = {
  receipts: (_, args, { dataSources: { receiptApi } }: Context) => {
    const filter: string = args.filter ? args.filter : "";
    console.log(filter);

    return receiptApi.getReceipts(filter);
  },
};

const Mutation: MutationResolvers<Context> = {
  createReceipt: async (_, { file }, { dataSources: { receiptApi, fileDataSource } }: Context) => {

    try {
      //console.log(file);

      const path = await fileDataSource.storeFile("/ticket" + "/kster", file);
      console.log(path);
      receiptApi.addReceipt();
    }catch(error) {
      console.error(error);
    }


    return {
      code: "CODE",
      success: true,
      message: "Message",
    };
  },
};

const resolverMap: IResolvers = {
  MXCurrency: MXCurrency,
  Query,
  Mutation,
};

export default resolverMap;
