export class Utils {
  static checkSessionUser() {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("@Marketplace:admin_token_user");

      return token ? true : false;
    }
  }

  static switchColorsStatus(nameStatus: string) {
    switch (nameStatus) {
      case "AGUARDANDO VISUALIZAÇÃO":
        return "awaiting-preview";
      case "PREPARANDO PEDIDO":
        return "preparing-order";
      case "A CAMINHO":
        return "on-my-way";
      case "FINALIZADO":
        return "order-completed";
      default:
        return "awaiting-preview";
    }
  }

  static getValueLocalStorage(nameKey: string) {
    const response = localStorage.getItem(nameKey);

    if (response) {
      return JSON.parse(response);
    }

    return null;
  }
}
