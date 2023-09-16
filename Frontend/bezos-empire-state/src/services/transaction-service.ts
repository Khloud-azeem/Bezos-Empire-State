import apiClient from "./api-client";

export interface Transaction {
    id: number;
    amount: number;
    date: string;
    merchant_name: string;
    category: string[];
    isMarked?: boolean;
}

interface MerchantDB {
    name: string;
    total_amount: number;
}

class TransactionService {

    getAllTransactions() {
        const controller = new AbortController();
        const request = apiClient.get<Transaction[]>("/transactions", { signal: controller.signal });
        return { request, cancel: () => controller.abort() }
    }
    getAllMerchants() {
        return apiClient.get<MerchantDB[]>("/merchantsGet");
    }

    addMerchant(merchant: object) {
        return apiClient.post("/merchantsCreate", merchant);
    }
    updateMerhant(merchant: object) {
        return apiClient.post("/merchantsUpdate", merchant);
    }
    deleteMerchant(merchant: object) {
        return apiClient.post("/merchantsDelete", merchant);
    }

}

export default new TransactionService();