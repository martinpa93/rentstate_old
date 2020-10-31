import { CurrencyMaskInputMode, NgxCurrencyModule } from "ngx-currency";
 
export const customCurrencyMaskConfig = {
    align: "center",
    allowNegative: false,
    allowZero: false,
    decimal: ",",
    precision: 2,
    prefix: "",
    suffix: "€",
    thousands: ".",
    nullable: true,
    min: null,
    max: 5000000,
    inputMode: CurrencyMaskInputMode.FINANCIAL
};