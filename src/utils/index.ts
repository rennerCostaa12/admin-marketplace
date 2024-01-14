export class Utils {
  static checkSessionUser() {
    const token = localStorage.getItem("@Marketplace:admin_token_user");

    return token ? true : false;
  }

  static switchColorsStatus(nameStatus: string) {
    switch (nameStatus) {
      case "AGUARDANDO VISUALIZAÇÃO":
        return "gray";
      case "PREPARANDO PEDIDO":
        return "orange";
      case "A CAMINHO":
        return "blue";
      case "FINALIZADO":
        return "green";
      default:
        return "gray";
    }
  }
}
