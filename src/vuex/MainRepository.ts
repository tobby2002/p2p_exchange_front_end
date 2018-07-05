import {Store} from "vuex";
import SampleController from "@/vuex/controller/SampleController";
import StateController from "@/vuex/controller/StateController";
import {VuexTypes} from "@/vuex/config/VuexTypes";
import AxiosService from "@/service/AxiosService";
import LoginService from "@/service/login/LoginService";


let sampleController: SampleController;
let stateController: StateController;

let store: Store<any>;
let instance: any;

export default {
    init: function (vuexStore: Store<any>, callback: () => any) {
        // Vuex < > Controller 연결
        store = vuexStore;

        sampleController = new SampleController(store);
        stateController = new StateController(store);

        // 자기 참조할 때 씀
        instance = this;

        // 서버 데이터 초기화 -> 완료 후 Callback
        // MainService.getInitValue(function (data: any) {
        //     instance.initData(data);
        //     callback()
        // });


        // 모바일 인지 체크 -> Vuex
        if (document.documentElement.clientWidth < 768) {
            this.State.controller().setIsMobile(true);
        } else {
            this.State.controller().setIsMobile(false);
        }

        // 운영체제 체크
        if (/Android/i.test(navigator.userAgent)) { // 안드로이드 체크
            this.State.controller().setCheckOs(1);
        } else if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) { // IOS 체크
            this.State.controller().setCheckOs(2);
        } else { // 기타
            this.State.controller().setCheckOs(3);
        }
    },

    initData: function (data: any) {
        // 서버 초기 데이터를 파싱 한다.
        // // 유저 파싱
        // this.setMyInfo(new User(data['user']));
        //
        // // 계정 JSON 파싱
        // for (let key in data['accounts']) {
        //     accountController.push(data['accounts'][key])
        // }
    },

    // 서버 데이터 초기화가 완료를 파악할 때 사용한다. (서버 데이터 완료 후 뷰 그리기 등)
    setInitCompleted(isCompleted: boolean) {
        store.dispatch(VuexTypes.INIT_COMPLETED, isCompleted)
    },



    State: {
        controller(): StateController {
            return stateController
        },
        isMobile(): boolean {
            return stateController.isMoblie();
        }
    },

    User: {

    },

    Login: {
        service() {
            return LoginService;
        }
    },

    SignUp: {

    },
}