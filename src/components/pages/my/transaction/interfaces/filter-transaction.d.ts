import { ProcessType } from "@/src/utils/consts/ProcessType";

export default interface FilterTransactionInterface {
    type: ProcessType | null;
    account: string | null;
    category: string | null;
    search: string;
}