import { createApp } from 'vue'
import App from './App.vue'

// Kendo UI components
import { Grid, GridColumn } from '@progress/kendo-vue-grid'
import { DropDownList } from '@progress/kendo-vue-dropdowns'
import { Input } from '@progress/kendo-vue-inputs'
import { DatePicker } from '@progress/kendo-vue-dateinputs'
import '@progress/kendo-theme-default/dist/all.css'


// vee-validate rules and components
import { defineRule } from 'vee-validate'
import { required, email, min, numeric, min_value } from '@vee-validate/rules'
import { Form, Field, ErrorMessage } from 'vee-validate'

// Define validation rules globally
defineRule('required', required)
defineRule('email', email)
defineRule('min', min)
defineRule('numeric', numeric)
defineRule('min_value', min_value)

// SweetAlert2 for alerts
import Swal from 'sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'

const app = createApp(App)

// Register Kendo UI components globally
app.component('KendoGrid', Grid)
app.component('KendoGridColumn', GridColumn)
app.component('KendoDropDownList', DropDownList)
app.component('KendoInput', Input)
app.component('KendoDatePicker', DatePicker)

// Register vee-validate components globally
app.component('ValidationForm', Form)
app.component('ValidationField', Field)
app.component('ValidationErrorMessage', ErrorMessage)

// Make SweetAlert2 accessible globally as $swal
app.config.globalProperties.$swal = Swal

app.mount('#app')
