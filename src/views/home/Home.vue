<template>
    <v-app v-if="isInitCompleted">
        <div style="height: 100%;">
            <div class="main-wrapper-height" v-bind:class="{cssFixed : isFixed || isChatOpened}">
                <abHeader></abHeader>
                <v-content class="bg-white main-fullheight">
                    <alert></alert>
                    <div class="mainView" :class="{ fullSizeMainView : isFullSize }">
                        <router-view></router-view>
                    </div>
                </v-content>
                <abFooter></abFooter>
                <AbTab v-if="isMobile"></AbTab>
            </div>

            <!--Order fix list -->
            <div class="cs-flex right-box" v-if="!isMobile && isFixed">
                <my-order-fixed></my-order-fixed>
            </div>

            <!-- Chat -->
            <div class="cs-flex right-box chat-css" v-if="isChatOpened" :class="{'right-box-chat-mobile' : isMobile}">
                <chat></chat>
            </div>

            <!--Chat manager-->
            <chat-manager></chat-manager>
        </div>
    </v-app>
</template>

<script lang="ts">
    import Vue from 'vue';
    import MainRepository from "../../vuex/MainRepository";
    import AbHeader from "./Header.vue"
    import AbFooter from "./Footer.vue"
    import AbTab from "./Tab.vue"
    import Alert from '../../components/alert/Alerts.vue';
    import MyOrderFixed from './body/myOrder/item/MyOrderFixed.vue';
    import Chat from './body/chat/Chat.vue';
    import ChatManager from './body/chat/item/ChatManager.vue';


    export default Vue.extend({
        name: 'home',
        components: {
            AbHeader,
            AbFooter,
            AbTab,
            Alert,
            MyOrderFixed,
            Chat,
            ChatManager
        },
        data() {
            return {
                isMobileMode: false,
            }
        },
        computed: {
            isMobile() {
                if (MainRepository.State.isMobile()) {
                    MainRepository.MyOrder.controller().setMyOrderModalFixed(false);
                }
                return MainRepository.State.isMobile();
            },
            isFullSize() {
                if (this.$route.name === 'abMain' || this.$route.name === 'walletToken'|| this.$route.name === 'walletDetails') {
                    return true;
                } else {
                    return false;
                }
            },
            isInitCompleted() {
                return MainRepository.State.isInitCompleted();
            },
            isFixed() {
                return MainRepository.MyOrder.controller().getMyOrderModalFixed();
            },
            isChatOpened() {
                return MainRepository.Chat.controller().getChatStatus();
            }
        },
        beforeCreate: function () {
            // vuex store를 넘겨준다.
            MainRepository.init(this.$store, function () {
            });

            MainRepository.initRouterController(this.$router);
        },
        mounted() {
            this.$nextTick(function () {
                window.addEventListener('resize', this.getWindowWidth);
                this.getWindowWidth();
            });

            // 클릭 이벤트 (ex, 영역 밖 클릭 시 모달 종료)
            Vue.prototype.$eventBus.$on('clickEvent', (callback) => {
                this.$el.addEventListener("click", (event) => {
                    callback(event);
                });
            });
        },
        methods: {
            getWindowWidth() {
                // 모바일 버전으로 전환됨
                if (document.documentElement.clientWidth < 977) {
                    if (!this.isMobileMode) {
                        this.isMobileMode = true;
                        MainRepository.State.controller().setMobile(true);
                    }
                } else { // PC 버전으로 전환됨
                    if (this.isMobileMode) {
                        this.isMobileMode = false;
                        MainRepository.State.controller().setMobile(false);
                    }
                }
            },
        }
    });
</script>

<style>
    /* 웹에서 최대 size 주기*/

    @media only screen and (min-width: 960px) {
        .mainView {
            max-width: 1224px;
            margin-left: auto;
            margin-right: auto;
        }

        /*main일때만 예외로 width 할당*/
        .fullSizeMainView {
            max-width: 100%;
        }
        .main-fullheight{
            margin-top: 64px;
            min-height: calc(100% - 436px);
        }

    }
    /* mobile 에서 gutter 주기*/

    @media only screen and (max-width: 959px) {
        .mainView {
            padding-left: 12px;
            padding-right: 12px;
        }

        /*main일때만 예외로 width 할당*/
        .fullSizeMainView {
            padding: 0px;
            max-width: 100%;
        }
        .main-fullheight{
            margin-top: 64px;
            min-height: calc(100% - 850px);
        }
    }


    .right-box {
        width: 300px;
        height: 100%;
        position: fixed;
        top: 0;
        right: 0;
        z-index: 120;
    }

    .right-box-chat-mobile {
        width: 100%;
        height: calc(100% - 64px);
    }

    .cs-flex {
        display: flex;
    }

    .cssFixed {
        width: calc(100% - 300px);
    }
    .main-wrapper-height{
        height: calc(100% - 64px);
    }


</style>