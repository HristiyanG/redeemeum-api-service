# Redemeum Frontend API Service

### Installation
```
npm install redeemeum-api-service --save
```

## Description

In order to connect your frontend application to the API you would need to set API_URL in your `.env` file like this:

``` 
API_URL=http://localhost:3000
```

### Response Codes
```
200: Success
400: Bad request
401: Unauthorized
403: Forbidden
404: Cannot be found
50X: Internal Server Error
```

#### Here are all the functions the Service currently provides and some useful information: 

* `generateNonce(signerAddress)` -> generate random nonce everytime prior user tries to log in and returns is to the FE 
* `verifySignature(signerAddress, signature)` -> returns JWT token for the logged user. The signature is create by signing message with the user's wallet and the nonce
* `createVoucher(formData, token)` -> formData has the following properties
    * title - String, required
    * qty - Number, required
    * category - String, not required
    * startDate - Date, required
    * expiryDate - Date, required
    * offeredDate - Date, required
    * price - Schema.Types.Decimal128, required
    * buyerDeposit - Schema.Types.Decimal128, required
    * sellerDeposit - Schema.Types.Decimal128, required
    * description - String, not required
    * location - String, required
    * contact - String, required
    * conditions - String, required
    * voucherOwner - String, required
    * txHash - String, required
    * _tokenIdSupply - String, required
    * _promiseId - String, required
    * fileToUpload - File[], not required
    
* `getVoucher(id)`
* `getSellerVouchers(userAddress)`
* `getBuyerVouchers(userAddress)`
* `getVouchersStatus(token)` -> returns vouchers statuses (active / inactive) for the seller
* `getActiveVouchers(token)` -> returns all active voucher for the seller
* `getInactiveVouchers(token)` -> returns all inactive voucher for the seller
* `getMyVoucherDetails(voucherId, token)` -> returns voucher details for the buyer
* `getAllUsersByVoucherID(voucherId, token)` -> returns all the buyers committed a voucher from the specific VoucherBatch
* `getMyVouchers(token)` -> returns all vouchers the buyer committed
* `commitToBuy(voucherID, data, token)` -> store a committed voucher in the DB.
    * data is the parsed event from the blockchain. Example: 
    ```javascript
    const data =  {
        txHash: "0x00b8b2aed0ec1da983dd364e800210f9ff036a445b9bd27fa24d6291a248848b",
        _holder: "0x39650Cd0969B1FE9e25E468150EC35E4002Bfdb1",
        _issuer: "0x5aF2b312eC207D78C4de4E078270F0d8700C01e2",
        _promiseId: "0x93bb64c3c1130c2496d2d5bb8a74dad74014b65e7b414850f66329abd9b104b6",
        _tokenIdSupply: "57896044618658097711785492504343953927315557066662158946655541218820101242880",
        _tokenIdVoucher: "57896044618658097711785492504343953927315557066662158946655541218820101242881"
    }
    ```
* `updateUserVoucher(data, token)` -> updates user voucher after interacting with the blockchain. Depending on the function you call as a buyer / seller you will need to provide the respective status. It will not come from the Smart Contracts
    * data example: 
    ```javascript
    const data = { 
        _id: 'userVoucherID',
       status:  "CANCELLED" || "REDEEMED" || "REFUNDED" || "COMPLAINED"}

* `getPaymentDetails(voucherID, token)` -> returns an object identifying who received what after finalization of a voucher