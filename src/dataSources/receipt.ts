import { RESTDataSource } from "apollo-datasource-rest";
import { Receipt, ReceiptStatus } from "../generated/graphql";

class ReceiptAPI extends RESTDataSource {
  constructor(){
    super();
  }
  
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
}

export default ReceiptAPI;