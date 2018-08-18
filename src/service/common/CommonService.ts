import AxiosService from "@/service/AxiosService";

export default {
    init: {
      setInitValue(callback: any){

      }
    },
    info: {
        // CNY, USDT 코인 환율 select
        getMarketPrice: function (callback: any) {
            AxiosService._requestWithBody('marketPrice', 'GET', '' ,
                function (data) {
                    callback(data);
                    return;
                },
                function () {
                })
        },
        getPaymentMethod: function (data : any, callback: any) {
            AxiosService._requestWithBody('paymentMethod', 'GET', data,
                function (data) {
                    callback(data);
                    return;
                },
                function () {
                })
        }
    },
    fileUpload: {
        //파일 업로드
        fileUpload: function (data:any, callback: any) {
            AxiosService._requestWithUrlPram('file','POST',data,
                function (data) {
                    callback(data);
                    return;
                },
                function () {
                })
        }
    }
}

