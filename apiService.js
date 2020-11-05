const axios = require('axios').default

let instance;
let axiosInstance;


class ApiService {
    
    static getInstance() {
        if (!instance) {
            instance = new ApiService();
        }

        return instance;
    }

    constructor() {
        axiosInstance = axios.create({
            baseURL: process.env.API_URL
        })
    }

    async isUserRegistered(address) {
        return await axiosInstance.get(`/users/${address}/is-registered`);
    }

    async createVoucher(data, token) {
        return await axiosInstance.post('/vouchers', data, {
            headers: { 'Authorization': `Bearer ${token}` }
        }
        )
    }

    async updateVoucher(id, data, token) {
        return await axiosInstance.patch(`/vouchers/${id}`, data, {
            headers: { 'Authorization': `Bearer ${token}` }
        }
        )
    }

    async getVoucher(id) {
        return await axiosInstance.get(`/vouchers/${id}`)
    }

    async getSellerVouchers(userAddress) {
        return await axiosInstance.get(`/vouchers/sell/${userAddress}`)
    }

    async getBuyerVouchers(userAddress) {
        return await axiosInstance.get(`/vouchers/buy/${userAddress}`)
    }

    async getVouchersStatus(token) {
        return await axiosInstance.get(`/vouchers/seller-vouchers/status`, {
            headers: { 'Authorization': `Bearer ${token}` }
        })
    }

    async getActiveVouchers(token) {
        return await axiosInstance.get(`/vouchers/seller-vouchers/active`, {
            headers: { 'Authorization': `Bearer ${token}` }
        })
    }

    async getInactiveVouchers(token) {
        return await axiosInstance.get(`/vouchers/seller-vouchers/inactive`, {
            headers: { 'Authorization': `Bearer ${token}` }
        })
    }

    async getMyVoucherDetails(voucherId, token) {

        return await axiosInstance.get(`/user-vouchers/${voucherId}/voucher-details`, {
            headers: { 'Authorization': `Bearer ${token}` }
        })
    }

    async getAllUsersByVoucherID(voucherId, token) {
        return await axiosInstance.get(`/user-vouchers/buyers/${voucherId}/`, {
            headers: { 'Authorization': `Bearer ${token}` }
        })
    }

    async getMyVouchers(token) {
        return await axiosInstance.get(`/user-vouchers/`, {
            headers: { 'Authorization': `Bearer ${token}` }
        })
    }

    async deleteVoucher(id, token) {
        return await axiosInstance.delete(`/vouchers/${id}`, {
            headers: { 'Authorization': `Bearer ${token}` }
        }
        )
    }

    async deleteImage(id, imageUrl, token) {
        return await axiosInstance.delete(`/vouchers/${id}/image?imageUrl=${imageUrl}`, {
            headers: { 'Authorization': `Bearer ${token}` }
        }
        )
    }

    async generateNonce(address) {
        return await axiosInstance.post(`/users/${address}`)
    }

    async verifySignature(address, signature) {
        return await axiosInstance.post(`/users/${address}/verify-signature`, { signature })
    }

    async commitToBuy(voucherID, data, token) {
        return await axiosInstance.post(`/users/${voucherID}/buy`, data, {
            headers: { 'Authorization': `Bearer ${token}` },
        })
    }

    async updateUserVoucher(data, token) {
        return await axiosInstance.patch(`/user-vouchers/update`, data, {
            headers: { 'Authorization': `Bearer ${token}` },
        })
    }

    async getPaymentDetails(voucherID, token) {
        return await axiosInstance.get(`/payments/${voucherID}`, {
            headers: { 'Authorization': `Bearer ${token}` },
        })
    }
}

module.exports = ApiService.getInstance();

