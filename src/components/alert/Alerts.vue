<!--사용법. created에 case를 추가하고 쓰고자 하는 vue 파일의 메서드에
showWarning(){ this.$eventBus.$emit('showAlert', 2); }
 과 같이 선언하시면 됩니다.-->
<template>
    <div class="notifications-wrapper">
        <notification v-for="notification in notifications" :notification="notification"
                      @close-notification="removeNotification" transition="fade">
        </notification>
    </div>
</template>

<script>
    import notification from '@/components/alert/Alert_item.vue';
    import {abGetLang} from "../../config/localization";

    const NotificationStore = {
        state: [], // here the notifications will be added

        addNotification: function (notification) {
            if (this.state.length > 0) {
                let prev = this.state[this.state.length - 1];
                let calced = notification.timestamp - prev.timestamp;
                if (prev.text === notification.text && calced < 1500) {
                    return false;
                }
            }
            this.state.push(notification);
        },
        removeNotification: function (timestamp) {
            //Array 및 v-for문 특성상 계속 쌓아둬야만, Alert_item.vue의 isClosed와 병행 이용 가능
            //본 함수 이용 불가

            /* for(let i = 0 ; i < this.state.length ; i++) {
                 console.log(i)
                 console.log(this.state.length)
                 console.log(this.state)
                 if(this.state[i].timestamp === timestamp) {
                     console.log(timestamp)
                     console.log(this.state[i].timestamp)
                     this.state.splice(i, 1);
                     break;
                 }
             }*/
        }
    };


    export default {
        name: "Alerts",
        components: {notification: notification,},
        props: {},
        data() {
            return {
                notifications: NotificationStore.state,
                type: {
                    Success: 'Success',
                    Warning: 'Warning',
                    Error: 'Error',
                }
            }
        },
        created() {
            this.$eventBus.$on('showAlert', (param) => {
                // Title === "" 의 경우 Title = Type
                switch (param) {
                    case 0 : this.show(this.type.Success, "", ""); break;
                    case 400 : this.show(this.type.Error, "", this.$str("duplicate_request")); break;
                    case 401 : this.show(this.type.Error, "401 Error", abGetLang('401')); break;
                    case 406 : this.show(this.type.Error, "", this.$str("suspended_account")); break;
                    case 412 : this.show(this.type.Error, "", this.$str('invalid_request')); break;
                    case 413 : this.show(this.type.Error, "", this.$str('invalid_email_verification_code')); break;
                    case 414 : this.show(this.type.Error, "", this.$str('not_verified_email')); break;
                    case 415 : this.show(this.type.Error, "", this.$str('id_verification_required')); break;
                    case 416 : this.show(this.type.Error, "", this.$str('already_setted')); break;
                    case 417 : this.show(this.type.Error, "", this.$str('not_enough_available_balance')); break;
                    case 418 : this.show(this.type.Error, "", this.$str('not_enough_available_volume')); break;
                    case 419 : this.show(this.type.Error, "", this.$str('invalid_trade_password')); break;
                    case 420 : this.show(this.type.Error, "", this.$str('not_valid_min_max_amount')); break;
                    case 421 : this.show(this.type.Error, "", this.$str('amount_not_matched')); break;
                    case 422 : this.show(this.type.Error, "", this.$str('invalid_ad_no')); break;
                    case 423 : this.show(this.type.Error, "", this.$str('invalid_id_verification')); break;
                    case 424 : this.show(this.type.Error, "", this.$str('merchant_can_not_approach')); break;
                    case 425 : this.show(this.type.Error, "", this.$str("invalid_mobile_verification")); break;
                    case 426 : this.show(this.type.Error, "", this.$str("already_paid_order")); break;
                    case 427 : this.show(this.type.Error, "", this.$str("invalid_order_status")); break;
                    case 428 : this.show(this.type.Error, "", this.$str("not_unpaid_status")); break;
                    case 429 : this.show(this.type.Error, "", this.$str("not_paid_status")); break;
                    case 430 : this.show(this.type.Error, "", this.$str("not_complaining_status")); break;
                    case 431 : this.show(this.type.Error, "", this.$str("already_completed_order")); break;
                    case 432 : this.show(this.type.Error, "", this.$str("already_canceled_order")); break;
                    case 433 : this.show(this.type.Error, "", this.$str("invalid_member_for_cancel")); break;
                    case 434 : this.show(this.type.Error, "", this.$str("has_processing_order")); break;
                    case 435 : this.show(this.type.Error, "", this.$str("already_expired_order")); break;
                    case 436 : this.show(this.type.Error, "", this.$str("invalid_sms_verification_code")); break;
                    case 437 : this.show(this.type.Error, "", this.$str("invalid_sms_phone_number")); break;
                    case 450 : this.show(this.type.Error, "", this.$str("block_member")); break;
                    case 451 : this.show(this.type.Error, "", this.$str("update_password_suspension_period")); break;  //password update  되면 24시간 거래x
                    case 452 : this.show(this.type.Error, "", this.$str("trade_count_limit")); break;
                    case 453 : this.show(this.type.Error, "", this.$str("already_disabled_ad")); break;
                    case 454 : this.show(this.type.Error, "", this.$str("already_enable_ad")); break;
                    case 455 : this.show(this.type.Error, "", this.$str("not_disabled_ad")); break;
                    case 456 : this.show(this.type.Error, "", this.$str("not_enable_ad")); break;
                    case 457 : this.show(this.type.Error, "", this.$str("invalid_amount")); break;
                    case 458 : this.show(this.type.Error, "", this.$str("duplicated_custom_token_name")); break;
                    case 459 : this.show(this.type.Error, "", this.$str("duplicated_custom_token_name_short")); break;
                    case 460 : this.show(this.type.Error, "", this.$str("update_phone_suspension_period")); break;  //phone update  되면 24시간 거래x
                    case 461 : this.show(this.type.Error, "", this.$str("duplicated_phone_number")); break;  //
                    case 462 : this.show(this.type.Error, "", this.$str("vault_exception")); break;  //
                    case 463 : this.show(this.type.Error, "", this.$str("order_cancel_count_suspension")); break;  //거래3번 취소되면 24시간 거래x
                    case 464 : this.show(this.type.Error, "", this.$str("has_processing_ad")); break;
                    case 499 : this.show(this.type.Error, "", this.$str("not_valid_approach")); break;
                    // case 500 : this.show(this.type.Error, "", "failed"); break;
                    case 512 : this.show(this.type.Error, "", this.$str("mail_server_error")); break;
                    case 513 : this.show(this.type.Error, "", this.$str("sms_sender_error")); break;



                    //클라이언트 단 상태코드

                    // 시스템 메세지 2000~
                    case 2000 : this.show(this.type.Success, "", this.$str('comp')); break;    // 성공
                    case 2001 : this.show(this.type.Success, "", this.$str('comp_copy')); break;    // 카피 완료
                    case 2002 : this.show(this.type.Success, "", this.$str('comp_verification_code_send')); break;    // 인증 코드 전송
                    case 2003 : this.show(this.type.Success, "", this.$str('comp_code_verified')); break;    // 코드 인증 성공
                    case 2004 : this.show(this.type.Success, "", this.$str('comp_request_complete')); break;    // 코드 인증 성공

                    //로그인 및 회원가입 메세지 2050~
                    case 2051 : this.show(this.type.Success, "", this.$str('comp_email_duplicate')); break;    // 계정 존재 확인
                    case 2052 : this.show(this.type.Success, "", this.$str('comp_password_reset')); break;    // 비밀번호 초기화 성공

                    //광고 메세지 2100~
                    case 2101 : this.show(this.type.Success, "", this.$str('comp_ad_post')); break;    // 광고 등록 완료
                    case 2102 : this.show(this.type.Success, "", this.$str('comp_ad_cancel')); break;    // 광고 취소
                    case 2103 : this.show(this.type.Success, "", this.$str('comp_ad_edit')); break;    // 광고 수정 완료
                    case 2104 : this.show(this.type.Success, "", this.$str('comp_ad_disable')); break;    // 광고 비활성 완료
                    case 2105 : this.show(this.type.Success, "", this.$str('comp_ad_enable')); break;    // 광고 활성 완료
                    case 2106 : this.show(this.type.Success, "", this.$str('comp_ad_delete')); break;    // 광고 삭제 완료

                    //주문 메세지 2150~
                    case 2150 : this.show(this.type.Success, "", this.$str('comp_order')); break;    // 거래 완료
                    case 2151 : this.show(this.type.Success, "", this.$str('comp_order_paid')); break;    // 결제 완료
                    case 2153 : this.show(this.type.Success, "", this.$str('comp_order_appeal')); break;    // 이의제기 등록 완료
                    case 2154 : this.show(this.type.Success, "", this.$str('comp_order_appeal_cancel')); break;    // 이의제기 취소
                    case 2155 : this.show(this.type.Success, "", this.$str('comp_order_expire')); break;    // 거래 만료
                    case 2156 : this.show(this.type.Success, "", this.$str('comp_order_cancel')); break;    // 취소 완료
                    case 2157 : this.show(this.type.Success, "", this.$str('comp_order_create')); break;    // 취소 완료


                    //마이페이지 메세지 2250~
                    case 2251 : this.show(this.type.Success, "", this.$str('comp_linked_phone_change')); break;    // 연동 전화번호 수정 완료
                    case 2252 : this.show(this.type.Success, "", this.$str('comp_unblock')); break;    // 차단해제 완료
                    case 2253 : this.show(this.type.Success, "", this.$str('comp_payment_method_register')); break;    // 결제수단 등록 완료
                    case 2254 : this.show(this.type.Success, "", this.$str('comp_payment_method_delete')); break;    // 결제수단 삭제 완료
                    case 2255 : this.show(this.type.Success, "", this.$str('comp_payment_method_active')); break;    // 결제수단 turn on
                    case 2256 : this.show(this.type.Success, "", this.$str('comp_payment_method_deactive')); break;    // 결제수단 turn off
                    case 2257 : this.show(this.type.Success, "", this.$str('comp_my_identification_register')); break;    // 인증등록 완료

                    //Merchant 메세지 2350~
                    case 2350 : this.show(this.type.Success, "", this.$str('comp_apply_merchant')); break;    // merchant 등록 완료


                    //클라이언트 단 에러코드 4000 ~
                    case 4001 : this.show(this.type.Warning, "", this.$str('')); break;
                    case 4002 : this.show(this.type.Warning, "", this.$str('acceptConditions')); break;       // 이용약관 체크 필요
                    case 4003 : this.show(this.type.Warning, "", this.$str('verifySlider')); break;             // 인증 슬라이더 필요
                    case 4004 : this.show(this.type.Warning, "", this.$str('err_needPaymentMethod')); break;    // 결제수단 필요
                    case 4005 : this.show(this.type.Warning, "", this.$str('err_wrongApproach')); break;    // 잘못된 접근
                    case 4006 : this.show(this.type.Warning, "", this.$str('warn_needSetNickname')); break;    // 닉네임 등록 필요
                    case 4007 : this.show(this.type.Warning, "", this.$str('warn_needSetIDVerification')); break;    // ID인증 필요
                    case 4008 : this.show(this.type.Warning, "", this.$str('warn_verification_no_phone_data')); break;    // 인증 코드 실패, 번호 없음
                    case 4009 : this.show(this.type.Warning, "", this.$str('warn_verification_code_no_email_data')); break;    // 인증 코드 실패, 번호 없음
                    case 4010 : this.show(this.type.Warning, "", this.$str('warn_need_Merchant_verification')); break;    // 인증 코드 실패, 번호 없음
                    case 4011 : this.show(this.type.Error, "", this.$str('err_login')); break;    // 로그인 실패
                    case 4012 : this.show(this.type.Error, "", this.$str('warn_file_size')); break;    // 이미지 용량 초과
                    case 4013 : this.show(this.type.Error, "", this.$str('warn_file_exist')); break;    // 이미지 없음
                    case 4014 : this.show(this.type.Error, "", this.$str('warn_Incorrect_end_date')); break;    // 종료날짜가 시작날짜보다 빠름
                    case 4015 : this.show(this.type.Error, "", this.$str('warn_needLogin')); break;    // 로그인 필요
                    case 4016 : this.show(this.type.Error, "", this.$str('warn_Incorrect_start_date')); break;    // 시작날짜가 오늘날짜보다 느림

                    //광고 에러코드 4100 ~
                    case 4101 : this.show(this.type.Warning, "", this.$str('warn_completeProcessingOrder')); break;       // 진행중인 거래 존재
                    case 4102 : this.show(this.type.Warning, "", this.$str('warn_changeStatusDisable')); break;       // disable 상태 변경 필요
                    case 4103 : this.show(this.type.Warning, "", this.$str('warn_wallet_create')); break;       // 지갑 생성 실패

                    //마이페이지 에러코드 4150 ~
                    case 4151 : this.show(this.type.Warning, "", this.$str('warn_password_duplicate')); break;       // 비밀번호 동일
                    case 4152 : this.show(this.type.Warning, "", this.$str('warn_payment_method_duplicate')); break;       // 결제수단 중복 등록

                    // 준비중
                    case 9000 : this.show(this.type.Warning, "", this.$str('It\'s under development now.')); break;       // 개발중입니다.



                    case 'chat_size' : this.show(this.type.Error, "Error", abGetLang('warningAttachmentFileSize')); break;
                    default : break;
                }
            })
        },
        methods: {
            show(type, title, text) {
                NotificationStore.addNotification({
                    title: title === '' ? type : title,
                    text: text,
                    type: type,
                    timeout: true,
                    timestamp: Date.now()
                });
            },
            remove() {
                NotificationStore.removeNotification(notification)
            },
            removeNotification: function (notification) {
                NotificationStore.removeNotification(notification)
            },
        },
        beforeDestroy() {
            //다른 화면 갔다가 돌아왔을때 창이 refresh 되어있기 위함.
            NotificationStore.state = [];
            this.$eventBus.$off('showAlert');
        }
    }
</script>

<style scoped>

</style>