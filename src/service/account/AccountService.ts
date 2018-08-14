import AxiosService from "@/service/AxiosService";
import User from "@/vuex/model/Account";
import MainRepository from "@/vuex/MainRepository";

export default {
    Account: {
        signup: function (data: any, callback: any) {
            AxiosService._requestWithBody('member', 'POST', data,
                function (data: any) {
                    callback(data)
                },
                function (error) {
                    console.log("ERROR :::::::  " + error);
                })
        },
        // 인증코드 전송
        sendVerificationCode: function (data: any, callback: any) {
            AxiosService._requestWithUrlPram('signUpVerification', 'POST', data,
                function (data: any) {
                    callback(data)
                },
                function (error) {
                    console.log("ERROR :::::::  " + error);
                })
        },
        // 인증코드 검증
        checkVerificationCode: function (data: any, callback: any) {
            AxiosService._requestWithUrlPram('signUpVerification', 'PUT', data,
                function (data: any) {
                    callback(data)
                },
                function (error) {
                    console.log("ERROR :::::::  " + error);
                })
        },
        // 유져 정보 get
        getUserInfo: function (callback: any) {
            AxiosService._requestWithBody('member/my', 'GET', '',
                function (data: any) {
                    callback(data);
                },
                function (error) {
                    console.log("ERROR :::::::  " + error);
                })
        },
        //유저 로그인 상태
        isUserActive: function (data: any, callback: any) {
            AxiosService._requestWithUrlPram('isUserActive', 'GET', data,
                function (data: any) {
                    callback(data);
                },
                function (error) {
                    console.log("ERROR :::::::  " + error);
                })
        },
    },
    Verification: {
        memberVerification: function (data: any, callback: any) {
            AxiosService._requestWithUrlPram('memberVerification', 'GET', data,
                function (data: any) {
                    callback(data);
                },
                function (error) {
                    console.log("ERROR :::::::  " + error);
                })
        },
        idVerification: function (data: any, callback: any) {
            AxiosService._requestWithUrlPram('idverification', 'GET', data,
                function (data: any) {
                    callback(data);
                },
                function (error) {
                    console.log("ERROR :::::::  " + error);
                })
        }
    },
    PaymentMethod: {
        getPaymentMethod: function (data: any, callback: any) {
            AxiosService._requestWithUrlPram('payment', 'GET', data,
                function (data: any) {
                    callback(data);
                },
                function (error) {
                    console.log("ERROR :::::::  " + error);
                })
        }
    },
    BlockList: {
        getBlockList: function (data: any, callback: any) {
            AxiosService._requestWithUrlPram('member/block', 'GET', data,
                function (data: any) {
                    callback(data);
                },
                function (error) {
                    console.log("ERROR :::::::  " + error);
                })
        }
    },
    LoginHistory: {
        getLoginHistory: function (data:any, callback:any) {
            AxiosService._requestWithUrlPram('login/history', 'GET', data,
                function (data: any) {
                    callback(data);
                },
                function (error) {
                    console.log("ERROR :::::::  " + error);
                })
        }
    },
    SecuritySettings: {
        getSecuritySettings: function (data:any, callback:any) {
            AxiosService._requestWithUrlPram('security/history', 'GET', data,
                function (data: any) {
                    callback(data);
                },
                function (error) {
                    console.log("ERROR :::::::  " + error);
                })
        }
    }
}

