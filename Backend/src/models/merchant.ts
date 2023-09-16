import mongoose from "mongoose"

type Merchant = {
    name: string;
    total_amount: number;
}
const merchantSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        max: 100,
        min: 3,
    },
    total_amount: {
        type: Number,
        required: true,
    }
})
const MerchantSchema = mongoose.model("Merchant", merchantSchema);

class MerchantStore {
    async get() {
        try {
            const merchants = await MerchantSchema.find()
            return merchants
        } catch (err) {
            throw new Error(`${err}`);
        }
    }

    async update(merchant: Merchant) {
        try {
            const currentMerchant = await MerchantSchema.findOneAndUpdate({
                name: merchant.name,
                total_amount: merchant.total_amount
            });
            return currentMerchant
        } catch (err) {
            throw new Error(`${err}`);
        }
    }

    async create(merchant: Merchant) {
        try {
            let res;
            const currentMerchant = await MerchantSchema.findOne({
                name: merchant.name,
            });
            if (currentMerchant) {
                res = await this.update(merchant)
            } else {
                res = new MerchantSchema({
                    name: merchant.name,
                    total_amount: merchant.total_amount
                })
                await res.save();
            }
            return res
        } catch (err) {
            throw new Error(`${err}`);
        }
    }

    async deleteM(merchant: Merchant) {
        try {
            const currentMerchant = await MerchantSchema.findOneAndRemove({
                name: merchant.name,
            });
            return currentMerchant
        } catch (err) {
            throw new Error(`${err}`);
        }
    }
}
export default MerchantStore