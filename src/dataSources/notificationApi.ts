import { RESTDataSource } from "apollo-datasource-rest";
import { Notification, NotificationResponse, ReceiptStatus, NotificationFilter } from "../generated/graphql";
import NotFoundError from "../error/NotFoundError";


const notifications: Notification[] = [
  {
    id:"1",
    title: "Error al generar factura",
    message: "La factura del establecimiento \"OXXO\" no fue posible generarla ya que el campo de folio no es legible en el ticket de compra",
    date: "2019-07-07",
    read: false
  },
  {
    id:"2",
    title: "Factura generada con exito",
    message: "Su factia del establecimiento \"Costco\" por $ 1230.00 se genero con exito",
    date: "2019-07-01",
    read: false,
    receipt: {
      id: "1",
      createdAt: "",
      createdDate: "",
      status: ReceiptStatus.InProgress
    }
  },
  {
    id:"3",
    title: "Error al generar factura",
    message: "La factura del establecimiento \"OXXO\" no fue posible generarla ya que el campo de folio no es legible en el ticket de compra",
    date: "2019-07-07",
    read: false
  },
  {
    id:"4",
    title: "Factura generada con exito",
    message: "Su factia del establecimiento \"Costco\" por $ 1230.00 se genero con exito",
    date: "2019-07-01",
    read: false,
    receipt: {
      id: "1",
      createdAt: "",
      createdDate: "",
      status: ReceiptStatus.InProgress
    }
  },
  {
    id:"5",
    title: "Error al generar factura",
    message: "La factura del establecimiento \"OXXO\" no fue posible generarla ya que el campo de folio no es legible en el ticket de compra",
    date: "2019-07-07",
    read: false
  },
  {
    id:"6",
    title: "Factura generada con exito",
    message: "Su factia del establecimiento \"Costco\" por $ 1230.00 se genero con exito",
    date: "2019-07-01",
    read: false,
    receipt: {
      id: "1",
      createdAt: "",
      createdDate: "",
      status: ReceiptStatus.InProgress
    }
  },
  {
    id:"7",
    title: "Error al generar factura",
    message: "La factura del establecimiento \"OXXO\" no fue posible generarla ya que el campo de folio no es legible en el ticket de compra",
    date: "2019-07-07",
    read: false
  },
  {
    id:"8",
    title: "Factura generada con exito",
    message: "Su factia del establecimiento \"Costco\" por $ 1230.00 se genero con exito",
    date: "2019-07-01",
    read: false,
    receipt: {
      id: "1",
      createdAt: "",
      createdDate: "",
      status: ReceiptStatus.InProgress
    }
  },
  {
    id:"9",
    title: "Error al generar factura",
    message: "La factura del establecimiento \"OXXO\" no fue posible generarla ya que el campo de folio no es legible en el ticket de compra",
    date: "2019-07-07",
    read: false
  },
  {
    id:"10",
    title: "Factura generada con exito",
    message: "Su factia del establecimiento \"Costco\" por $ 1230.00 se genero con exito",
    date: "2019-07-01",
    read: false,
    receipt: {
      id: "1",
      createdAt: "",
      createdDate: "",
      status: ReceiptStatus.InProgress
    }
  }
]

class NotificationAPI extends RESTDataSource {
  constructor() {
    super();
  }

  async getNotification(input?: NotificationFilter| null): Promise<NotificationResponse> {
    let result = notifications;
    if(input) {
      if(input.read){
        const read = result.filter(n => n.read === input.read);
        result = read;
      }
      if(input.receiptId) {
        const withReceipt = result.filter(n => n.receipt?.id === input.receiptId);
        result = withReceipt;
      }
    }

    return {
      totalCount: result.length,
      notifications: result
    };
  }

  async getUnreadNotificationsCount(): Promise<number>{
    const unread = notifications.filter(n => n.read === false);
    return unread.length;
  }

  async readNotification(id: String): Promise<Notification> {
    const ns = notifications.filter(n => n.id === id);
    if(ns && ns.length > 0){
      ns[0].read = true;
      return ns[0];
    }
    throw new NotFoundError("No se encontro el Recibo");
  }

}

export default NotificationAPI;