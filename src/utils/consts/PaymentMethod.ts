enum PaymentMethodEnum {
    YAPE = "yape",
    PLIN = "plin",
    AGORA_PAY = "agora_pay",
    TRANSFER = "transfer",
    CASH = "cash",
    CREDIT_CARD = "credit_card",
    DEBIT_CARD = "debit_card",
    BCP_APP = "bcp_app",
    BBVA_APP = "bbva_app",
    INTERBANK_APP = "interbank_app",
}

interface PaymentMethodInfoInterface { 
  name: string;
  icon: any;
  color: string; 
}


export const PAYMENT_METHOD_CONST: Record<PaymentMethodEnum, PaymentMethodInfoInterface> = {
    [PaymentMethodEnum.YAPE]: {
        name: "Yape",
        icon: "💜",
        color: "#800080",
    },
    [PaymentMethodEnum.PLIN]: {
        name: "Plin",
        icon: "💙",
        color: "#00BFFF",
    },
    [PaymentMethodEnum.AGORA_PAY]: {
        name: "Agora Pay",
        icon: "💠",
        color: "#00CFFF",
    },
    [PaymentMethodEnum.TRANSFER]: {
        name: "Transferencia",
        icon: "🏦",
        color: "#1E90FF",
    },
    [PaymentMethodEnum.CASH]: {
        name: "Efectivo",
        icon: "💵",
        color: "#228B22",
    },
    [PaymentMethodEnum.CREDIT_CARD]: {
        name: "Tarjeta de Crédito",
        icon: "💳",
        color: "#FFD700",
    },
    [PaymentMethodEnum.DEBIT_CARD]: {
        name: "Tarjeta de Débito",
        icon: "💳",
        color: "#808080",
    },
        [PaymentMethodEnum.BCP_APP]: {
        name: "BCP App",
        icon: "🔵",
        color: "#0033A0",
    },
    [PaymentMethodEnum.BBVA_APP]: {
        name: "BBVA App",
        icon: "🔷",
        color: "#012169",
    },
    [PaymentMethodEnum.INTERBANK_APP]: {
        name: "Interbank App",
        icon: "🟢",
        color: "#00953A",
    },
};