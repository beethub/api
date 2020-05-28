import { RESTDataSource } from "apollo-datasource-rest";
import {
  Configuration,
  ConfigNotification,
  InvoiceProfileInput,
  InvoiceProfile,
} from "../generated/graphql";

const config: Configuration = {
  notification: {
    invoiceResult: true,
  },
};

class ConfigurationAPI extends RESTDataSource {
  constructor() {
    super();
  }

  async getConfiguration(): Promise<Configuration> {
    return config;
  }

  async updateInvoiceResult(
    updateResult: boolean
  ): Promise<ConfigNotification> {
    const updatedConfig: ConfigNotification = { invoiceResult: updateResult };
    config.notification = updatedConfig;
    return config.notification;
  }

  async updateInvoiceProfile(
    invoiceProfile: InvoiceProfileInput
  ): Promise<InvoiceProfile> {
    config.invoiceProfile = invoiceProfile;
    return config.invoiceProfile;
  }
}

export default ConfigurationAPI;
