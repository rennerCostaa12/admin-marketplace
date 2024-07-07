export class Masks {
  static setMoney(value: string) {
    const numericValue = value.replace(/\D/g, "") as any;
    const formattedValue = new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(numericValue / 100);

    return formattedValue;
  }

  static setRemoveMoney(value: string) {
    const numericValue = value.replace(/\D/g, "");
    return parseFloat(numericValue) / 100;
  }

  static setOnlyNumber(value: string) {
    return value.replace(/[^0-9]/g, "");
  }

  static setMoneyNumber(value: number) {
    return value.toLocaleString("pt-br", {
      style: "currency",
      currency: "BRL",
    });
  }
}
