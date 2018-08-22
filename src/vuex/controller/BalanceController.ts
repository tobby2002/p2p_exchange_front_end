import {VuexTypes} from "@/vuex/config/VuexTypes";
import {Store} from "vuex";
import {CurrencyType} from "@/vuex/model/CurrencyType";
import Balance from "@/vuex/model/Balance";

export default class BalanceController {
    store: Store<any>;

    constructor (vuexStore: Store<any>) {
        this.store = vuexStore
    }

    setBalance(balanceData: any) {
        this.store.dispatch(VuexTypes.SET_BALANCE_DATA, balanceData);
    }

    getBalance() {
        return this.store.state.balance.balanceList;
    }

    getBalances() {
        return this.store.state.balance.balanceList;
    }

    findByCrptoCurrency(crpto: string) {
        let result = new Balance('');

        for(let i = 0; i < this.getBalances().length; i++) {
            let _item = this.getBalances()[i];
            if (_item.cryptoCurrency === crpto) {
                result = _item;
            }
        }
        return result;
    }

    getTotalEstimatedValue(currency: string) {
        let _totalValue = {
            btc: 0,
            currency: 0,
        };

        for (let key in this.getBalances()) {
            _totalValue.btc += this.getBalances()[key].btcAmount;
            _totalValue.currency += this.getBalances()[key].calcTo(currency)
        }

        return _totalValue;
    }
}

