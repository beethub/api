import { RESTDataSource } from "apollo-datasource-rest";
import {
  Receipt,
  ReceiptStatus,
  ReceiptResponse,
  ReceiptFilter,
} from "../../generated/graphql";
import { services } from "../../config";
import { IReceiptResponse, IReceipt, Ticket } from "./ReceiptTypes";
import querystring from "querystring";

type FilterRequest = {
  filter?: string;
};

const account = "kster";

class ReceiptAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = services.receiptUrl;
  }

  async getReceipts(filter?: ReceiptFilter | null): Promise<ReceiptResponse> {
    let filterQs: string = "";
    let filterRequest: FilterRequest = {};
    if (filter) {
      if (filter.text) filterRequest.filter = filter.text;
      filterQs = "?" + querystring.stringify(filterRequest);
    }

    const receiptsResponse: IReceiptResponse = await this.get(
      `/receipt/${account}${filterQs}`
    );
    return {
      totalCount: receiptsResponse.data ? receiptsResponse.data.length : 0,
      receipts: receiptsResponse.data.map((r) => ReceiptAPI.toReceipt(r)),
    };
  }

  //TODO: Implement getReceiptById
  async getReceipt(id: String):Promise<Receipt>{
    return  {
      id:""+id,
      business: "Oxxo Gas",
      date: "2020-02-28",
      amount: 15000,
      createdAt: "2020-02-28T13:00:00",
      createdDate: "2020-02-28",
      ticket: { url: `/file/ticket/1` },
      invoice: null,
      status: ReceiptStatus.InProgress,
    }
  }

  async addReceipt(key: string) {
    const body: Ticket = { key };
    const receipt = await this.post(`/ticket/${account}`, body);

    return ReceiptAPI.toReceipt(receipt);
  }

  private static toReceipt(receiptClient: IReceipt): Receipt {
    const {
      id,
      business,
      date,
      amount,
      createdAt,
      ticket,
      invoice,
    } = receiptClient;
    const t = ticket && ticket.key ? { url: ticket.key } : null;
    const i =
      invoice && (invoice.xml_key || invoice.pdf_key)
        ? { xml: invoice.xml_key || null, pdf: invoice.pdf_key || null }
        : null;
    let status: ReceiptStatus;
    switch (receiptClient.status) {
      case "DONE":
        status = ReceiptStatus.Done;
        break;
      case "ERROR":
        status = ReceiptStatus.Error;
        break;
      case "GENERATING":
        status = ReceiptStatus.Generating;
        break;
      default:
        status = ReceiptStatus.InProgress;
        break;
    }

    return {
      id: id.toString(),
      business: business || null,
      date: date || null,
      amount: amount || null,
      createdAt: createdAt,
      createdDate: createdAt.split("T")[0],
      ticket: t,
      invoice: i,
      status,
    };
  }

  /*
  getReceipts(filter: string) {
    return new Promise< Receipt[]>( (resolve, _reject) => {
      setTimeout(
        resolve
      , 3000);
    })
    .then( () =>{
      const response: Receipt[] = [
        {
          id: "1",
          business: "Oxxo Gas",
          date: "2020-02-28",
          amount: 15000,
          createdAt: "2020-02-28T13:00:00",
          createdDate: "2020-02-28",
          ticket: { url: `/file/ticket/1` },
          invoice: null,
          status: ReceiptStatus.InProgress,
        },
        {
          id: "2",
          business: "Mobile",
          date: "2020-03-15",
          amount: 15000,
          createdAt: "2020-03-15T13:00:00",
          createdDate: "2020-03-15",
          ticket: { url: `/file/ticket/2` },
          invoice: null,
          status: ReceiptStatus.Done,
        },
        {
          id: "3",
          business: "Restaurante",
          date: null,
          amount: 30000,
          createdAt: "2020-03-15T13:00:00",
          createdDate: "2020-03-15",
          ticket: { url: `/file/ticket/2` },
          invoice: null,
          status: ReceiptStatus.Error,
        },
        {
          id: "4",
          business: null,
          date: null,
          amount: 8000,
          createdAt: "2020-03-15T13:00:00",
          createdDate: "2020-03-15",
          ticket: { url: `/file/ticket/2` },
          invoice: null,
          status: ReceiptStatus.Done,
        },
        {
          id: "5",
          business: null,
          date: null,
          amount: null,
          createdAt: "2020-03-15T13:00:00",
          createdDate: "2020-03-15",
          ticket: { url: `/file/ticket/2` },
          invoice: null,
          status: ReceiptStatus.Generating,
        },
      ];
      return response;
    });
  }
  */
}

export default ReceiptAPI;
