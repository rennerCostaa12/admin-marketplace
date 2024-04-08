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
        return "outline";
      case "PREPARANDO PEDIDO":
        return "orange";
      case "A CAMINHO":
        return "blue";
      case "FINALIZADO":
        return "green";
      case "CANCELADO":
        return "destructive";
      default:
        return "outline";
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
