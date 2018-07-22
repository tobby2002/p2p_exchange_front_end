import AxiosService from "@/service/AxiosService";

// 페이지네이션, 트레이드센터 데이터 및 트레이드센터 필터 포함 공통
export default {
    tradeView: {
        //+ "&limitMin=" + limitMin
        tradeTotalInfo : function (token: string, adType: string, country: string, currency: string, limitMin: number, callback: any) {
            AxiosService._requestWithBody('tradePageCount?token='+ token + '&adType='+ adType + '&country=' + country
                + '&currency=' + currency + "&limitMin=" + limitMin
                , 'GET', '',
                function (data: any) {
                    callback(data);
                },
                function (error) {
                    console.log(error);
                })
        },
        //+ "&limitMin=" + limitMin
        tradePageInfo : function (page: number, token: string, adType: string, country: string, currency: string, limitMin: number, callback: any) {
            AxiosService._requestWithBody('tradeView?size=10&page='+ page + '&token='+ token + '&adType='+ adType + '&country=' + country
                + '&currency=' + currency + "&limitMin=" + limitMin
                ,'GET', '',
                function (data: any) {
                    callback(data);
                },
                function (error) {
                    console.log(error);
                })
        },
    }
}
