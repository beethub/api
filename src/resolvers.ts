import { IResolvers, MutationResolvers } from "./generated/graphql";
import MXCurrency from "./schema/scalar/currencyMX";
import { QueryResolvers } from "./generated/graphql";
import ReceiptAPI from "./dataSources/receipts/receiptApi";
import FileDataSource from "./dataSources/fileDataSource";
import ConfigurationAPI from "./dataSources/receipts/ConfigurationApi";

interface Context {
  dataSources: DataSources;
}

interface DataSources {
  receiptApi: ReceiptAPI;
  fileDataSource: FileDataSource;
  configApi: ConfigurationAPI;
}

const Query: QueryResolvers<Context> = {
  receipts: async (_, args, { dataSources: { receiptApi } }: Context) => {
    
    return receiptApi.getReceipts(args.input);
  },
  configuration: async (_, args, { dataSources: { configApi } }: Context) => {
    return configApi.getConfiguration();
  }
};

const timeDelay = (time: number) => {
  return new Promise<void>((resolve, reject) => {
    setTimeout(resolve, time);
  });
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
  updateNotificationInvoiceResult: async (_, {input}, {dataSources: {configApi}}) => {
    try {
      const updated = await configApi.updateInvoiceResult(input);
      return {
        code: "200",
        success: true,
        message: "",
        notification: updated
      }
    }
    catch(error) {
      console.error(error);
      return {
        code: "500",
        success: false,
        message: error.message
      }
    }
  },
  updateInvoiceProfile: async (_, {input}, {dataSources: {configApi}}) => {
    try {
      const invoiceProfile = await configApi.updateInvoiceProfile(input);
      return {
        code: "200",
        success: true,
        message: "",
        invoiceProfile
      }
    }
    catch(error) {
      console.error(error);
      return {
        code: "500",
        success: false,
        message: error.message
      }
    }
  }
};

const resolverMap: IResolvers = {
  MXCurrency: MXCurrency,
  Query,
  Mutation,
};

export default resolverMap;
