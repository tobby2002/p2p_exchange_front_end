import AxiosService from "@/service/AxiosService";

export default {
    getMySecurityBalance : function (data: any, callback: any) {
        AxiosService._requestWithUrlPram('balance/security', 'GET', data ,
            function (data: any) {
                callback(data);
            },
            function () {
            })
    },
    getWallets : function (data: any, callback: any) {
        AxiosService._requestWithUrlPram('balance', 'GET', data ,
            function (data: any) {
                callback(data)
            },
            function () {
            })
    },
    getCustomTokenWallets : function (data: any, callback: any) {
        AxiosService._requestWithUrlPram('balance/customtoken', 'GET', data ,
            function (data: any) {
                callback(data)
            },
            function () {
            })
    },
    postWithdraw: function (method: any, data: any, callback: any) {
        AxiosService._requestWithPramAndBodyAndEmail('deposit/withdraw', 'POST', method, data ,
            function (data: any) {
                callback(data)
            },
            function () {
            })
    },
    getWalletHistory: function (data: any, callback: any) {
        AxiosService._requestWithUrlPram('balance/history', 'GET', data ,
            function (data: any) {
                callback(data)
            },
            function () {
            })
    },
}