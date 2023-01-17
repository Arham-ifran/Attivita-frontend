var CryptoJS = require("crypto-js");
var dataEncryptionKey = 'mAeUgGaKaDdDaKuGEnC123';
var axios = require('axios')
export const ENV = {
    url: 'http://localhost:8081/v1/front/',
    invoicePath: `http://localhost:8081/invoices/`,
    uploadedImgPath: `http://localhost:8081/images/`,
    uploadedExtractPath: `http://localhost:8081/customerExtract/`,

    // url: 'https://attivita.arhamsoft.org/v1/front/',
    // invoicePath: `https://attivita.arhamsoft.org/invoices/`,
    // uploadedImgPath: `https://attivita.arhamsoft.org/images/`,
    // uploadedImgPath: `https://attivita.arhamsoft.org/customerExtract/`,


    // Headers
    Authorization: 'Bearer U2FsdGVkX19N17nCvW63G3X1nBf6ixXpyzfSyArEw/YCEAbEYSLiaFaQN4p9Sbr3BH8fhcDBZQvhccdKLpCFcB1BfDnzVKe3WfX6bgWRiik=',
    x_auth_token: 'F8KLhlTVO8psuIB',

    //set user in local storage
    encryptUserData: function (data) {
        let userData = localStorage.getItem('attivitaEncryptedUser');
        if (userData) {
            var bytes = CryptoJS.AES.decrypt(userData, dataEncryptionKey);
            var originalData = bytes.toString(CryptoJS.enc.Utf8);
            originalData = JSON.parse(originalData);
            if (originalData && originalData.callingCode) {
                data.callingCode = originalData.callingCode;
            }
            if (originalData && originalData.accessToken && !data.accessToken) {
                data.accessToken = originalData.accessToken;
            }
        }
        data = JSON.stringify(data);
        var encryptedUser = CryptoJS.AES.encrypt(data, dataEncryptionKey).toString();
        localStorage.setItem('attivitaEncryptedUser', encryptedUser);
        return true;
    },

    //return required keys
    getUserKeys: function (keys = null) {
        let userData = localStorage.getItem('attivitaEncryptedUser');
        if (userData) {
            var bytes = CryptoJS.AES.decrypt(userData, dataEncryptionKey);
            var originalData = bytes.toString(CryptoJS.enc.Utf8);
            originalData = JSON.parse(originalData);
            let user = {};
            if (keys) {
                keys = keys.split(" ");
                for (let key in keys) {
                    let keyV = keys[key];
                    user[keyV] = originalData[keyV];
                }
            }
            else {
                user = originalData;
            }
            return user;
        } else {
            return {};
        }

    },
    objectToQueryString: function (body) {
        const qs = Object.keys(body).map(key => `${key}=${body[key]}`).join('&');
        return qs;
    },

    clearStorage: function () {
        localStorage.removeItem('attivitaEncryptedUser')
        localStorage.removeItem('coupon')
        localStorage.removeItem('cart')
    },
    
    setLocalCart: function (cart) {
        let localCart = JSON.parse(localStorage.getItem("cart"))
        console.log(cart)
        let newCart = []
        let selectedProduct = null


       
        if(localCart && Array.isArray(localCart)){
            localCart.map((item) => {
                selectedProduct ={
                    productId: item?.productId,
                    name: item?.name,
                    shortDescription: item?.shortDescription,
                    image: item?.image,
                    variationName: item?.variationName,
                    variationId: item?.variationId,
                    quantity: item?.quantity,
                    price: item?.price,
                    salesPrice: item?.salesPrice,
                    discountPercentage: item?.discountPercentage
                }
                newCart.push(selectedProduct)
            })
        }
        if(cart?.items){
            cart.items.map((item) => {
                selectedProduct ={
                    productId: item.productId,
                    name: item.product.name,
                    shortDescription: item.product.shortDescription,
                    image: JSON.parse(item.product.Image),
                    variationName: item?.variation?.details.map((detail) => {return detail.attributeName+': '+detail.attributeValue}).join(' ,'),
                    variationId: item.variationId,
                    quantity: item.quantity,
                    price: item.unitSalesPrice,
                    salesPrice: item.unitSalesPrice * item.quantity,
                    discountPercentage: 0
                }
                newCart.push(selectedProduct)
            })
        }
        
		localStorage.setItem("cart", JSON.stringify(newCart))
		
    },
    uploadImage: function (e) {
        let data = new FormData();
        data.append('image', e.target.files[0]);
        return new Promise((resolve, reject) => {
            axios({
                method: 'post',
                url: `${ENV.url}staff/upload-image`,
                data: data,
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${process.env.REACT_APP_AUTHORIZATION}`,
                    'x-auth-token': process.env.REACT_APP_X_AUTH_TOKEN
                }
            })
                .then(data => {
                    resolve(data.data.data)
                })
                .catch(err => {
                    reject({ err })
                })
        })
    },


}
