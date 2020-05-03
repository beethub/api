import { IResolvers, MutationResolvers } from "./generated/graphql";
import MXCurrency from "./schema/scalar/currencyMX";
import { QueryResolvers } from "./generated/graphql";
import ReceiptAPI from "./dataSources/receipts/receiptApi";
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
    return receiptApi.getReceipts(args.filter);
  },
};

const Mutation: MutationResolvers<Context> = {
  createReceipt: async (
    _,
    { file },
    { dataSources: { receiptApi, fileDataSource } }: Context
  ) => {
    try {
      const path = await fileDataSource.storeFile("/ticket" + "/kster", file);
      const receipt = await receiptApi.addReceipt(path);
      return {
        code: "200",
        success: true,
        message: "",
        receipt,
      };
    } catch (error) {
      console.error(error);
      return {
        code: "500",
        success: false,
        message: error.message,
      };
    }
  },
};

const resolverMap: IResolvers = {
  MXCurrency: MXCurrency,
  Query,
  Mutation,
};

export default resolverMap;
