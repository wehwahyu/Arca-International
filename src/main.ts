import {createApp} from 'vue'
import {createPinia} from 'pinia'
import ElementPlus from 'element-plus';
import App from './App.vue'
import router from './router'
import './assets/main.css'
import './assets/barcode.css'
import 'element-plus/theme-chalk/index.css'
import { AgGridVue } from "ag-grid-vue3";

// icon
import {addIcons, OhVueIcon} from "oh-vue-icons";
import {BiBasket2, BiColumnsGap, BiEye, BiPeopleFill, BiTelephoneInboundFill, BiTranslate, BiPinFill, BiArrowUp, BiArrowDown, MdCategoryOutlined, BiBadgeTm, HiScale, RiCustomerService2Line, MdGroupsOutlined, MdWarehouseOutlined, IoPricetagsOutline, MdQuerystatsOutlined, RiCoinsLine, LaCartArrowDownSolid, RiStockLine, CoTransfer, BiArrowReturnLeft, MdPricechangeOutlined, BiBell, LaUserAltSolid, LaUserCogSolid, LaHandHoldingUsdSolid, LaClipboardListSolid, BiBox2, MdPaymentsOutlined, BiBoxes, BiJournalBookmark, FaRegularEdit, MdRestartalt, CoPrint, FaBarcode, RiLineChartLine, BiArrowReturnRight, IoArrowUndoOutline, IoArrowRedoOutline, CoSettings, LaUserCheckSolid, LaUserShieldSolid, MdDisplaysettingsOutlined, BiEraser, MdLogoutOutlined, MdEmailOutlined, BiX, BiClockHistory, FaBuilding, MdGroups, IoFlask, GiDrippingTube, CoFilter, RiFileList3Line, LaMapMarkedAltSolid, MdManagesearch, MdAutorenewOutlined, CoReload, LaExpandArrowsAltSolid, BiCartXFill, LaMoneyBillWaveSolid, RiRefund2Fill, MdScreensearchdesktop, LaAddressBook, BiBoxSeam, FaRegularAddressCard, MdStoremalldirectoryOutlined, FaHandshake, BiCalendarCheckFill} from "oh-vue-icons/icons";
// quill editor
import {QuillEditor} from '@vueup/vue-quill';
import '@vueup/vue-quill/dist/vue-quill.snow.css';
// mask
import { vMaska } from "maska"

import DashboardLayout from '@/layouts/DashboardLayout.vue'
import EmptyLayout from '@/layouts/EmptyLayout.vue'
import * as FaIcons from "oh-vue-icons/icons/fa";

const Fa = Object.values({ ...FaIcons });
addIcons(...Fa, BiTranslate, BiColumnsGap, BiBasket2, BiTelephoneInboundFill, BiPeopleFill, BiEye, BiPinFill, BiArrowUp, BiArrowDown, MdCategoryOutlined, BiBadgeTm, HiScale, RiCustomerService2Line, MdGroupsOutlined, MdWarehouseOutlined, IoPricetagsOutline, MdQuerystatsOutlined, RiCoinsLine, LaCartArrowDownSolid, RiStockLine, CoTransfer, BiArrowReturnLeft, MdPricechangeOutlined, BiBell, LaUserAltSolid, LaUserCogSolid, LaHandHoldingUsdSolid, LaClipboardListSolid, BiBox2, MdPaymentsOutlined, BiBoxes, BiJournalBookmark, FaRegularEdit, MdRestartalt, CoPrint, FaBarcode, RiLineChartLine, BiArrowReturnRight, IoArrowUndoOutline, IoArrowRedoOutline, CoSettings, LaUserCheckSolid, LaUserShieldSolid, MdDisplaysettingsOutlined, BiEraser, MdLogoutOutlined, MdEmailOutlined, BiX, BiClockHistory, FaBuilding, MdGroups, IoFlask, GiDrippingTube, CoFilter, RiFileList3Line, LaMapMarkedAltSolid, MdManagesearch, MdAutorenewOutlined, CoReload, LaExpandArrowsAltSolid, BiCartXFill, LaMoneyBillWaveSolid, RiRefund2Fill, MdScreensearchdesktop, LaAddressBook, BiBoxSeam, FaRegularAddressCard, MdStoremalldirectoryOutlined, FaHandshake, BiCalendarCheckFill);

const pinia = createPinia()
const app = createApp(App)

app.component('DefaultLayout', DashboardLayout)
app.component('EmptyLayout', EmptyLayout)
app.component('QuillEditor', QuillEditor)
app.component("v-icon", OhVueIcon)
app.directive("maska", vMaska)
app.component("AgGridVue", AgGridVue)

app.use(pinia)
app.use(ElementPlus)
app.use(router)
app.mount('#app')
