import { IResolvers, MutationResolvers, NotificationResolvers, Receipt } from "./generated/graphql";
import MXCurrency from "./schema/scalar/currencyMX";
import { QueryResolvers } from "./generated/graphql";
import ReceiptAPI from "./dataSources/receipts/receiptApi";
import FileDataSource from "./dataSources/fileDataSource";
import ConfigurationAPI from "./dataSources/configurationApi";
import NotificationAPI from "./dataSources/notificationApi";
import NotFoundError from "./error/NotFoundError";

interface Context {
  dataSources: DataSources;
}

interface DataSources {
  receiptApi: ReceiptAPI;
  fileDataSource: FileDataSource;
  configApi: ConfigurationAPI;
  notificationApi: NotificationAPI;
}

const Query: QueryResolvers<Context> = {
  receipts: async (_, args, { dataSources: { receiptApi } }: Context) => {
    return receiptApi.getReceipts(args.input);
  },
  receipt: async (_, args, { dataSources: { receiptApi } }: Context) => {
    const receipts: Receipt[] = [];
    const receipt = await receiptApi.getReceipt(args.input);
    if(receipt)
      receipts.push(receipt);
    return {
      totalCount: receipts.length,
      receipts: receipts
    }

  },
  configuration: async (_, args, { dataSources: { configApi } }: Context) => {
    return configApi.getConfiguration();
  },
  notifications: async (_, {input}, {dataSources: { notificationApi } }: Context) => {
    await timeDelay(3000);
    //console.log("query notifications",input);
    return notificationApi.getNotifications(input);
  },
  notification: async (_, args, { dataSources: { notificationApi}}: Context) => {
    await timeDelay(3000);
    return notificationApi.getNotification(args.input);
  },
  unreadNotifications: async (_, __, {dataSources: { notificationApi }}:Context) => {
    return notificationApi.getUnreadNotificationsCount();
  }
};

const Notification: NotificationResolvers<Context> = {
  receipt: async (parent, _, { dataSources: { receiptApi } }: Context) => {
    //console.log("notifications receipt",parent, _);
    return receiptApi.getReceipt("1");
  }
}

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
  },
  readNotification: async (_, {input}, {dataSources: {notificationApi}}) => {
    try {
      input
      const notification = await notificationApi.readNotification(input);
      return {
        code: "200",
        success: true,
        message: "",
        notification
      }
    }catch(error) {
      console.error(error);
      
      if(error instanceof NotFoundError){
        return {
          code: "400",
          success: false,
          message: error.message
        }
      }
      return {
        code:"500",
        success: false,
        message: error.message
      }
    }
  }
};

const resolverMap: IResolvers = {
  MXCurrency: MXCurrency,
  Query,
  Notification,
  Mutation,
};

export default resolverMap;
