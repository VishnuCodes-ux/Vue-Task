import { createApp } from 'vue'
import App from './App.vue'

import { Grid, GridColumn } from '@progress/kendo-vue-grid'
import { DropDownList } from '@progress/kendo-vue-dropdowns'
import { Input } from '@progress/kendo-vue-inputs'
import { DatePicker } from '@progress/kendo-vue-dateinputs'
import '@progress/kendo-theme-default/dist/all.css'



import { defineRule } from 'vee-validate'
import { required, email, min, numeric, min_value } from '@vee-validate/rules'
import { Form, Field, ErrorMessage } from 'vee-validate'

defineRule('required', required)
defineRule('email', email)
defineRule('min', min)
defineRule('numeric', numeric)
defineRule('min_value', min_value)

import Swal from 'sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'

const app = createApp(App)

app.component('KendoGrid', Grid)
app.component('KendoGridColumn', GridColumn)
app.component('KendoDropDownList', DropDownList)
app.component('KendoInput', Input)
app.component('KendoDatePicker', DatePicker)

app.component('ValidationForm', Form)
app.component('ValidationField', Field)
app.component('ValidationErrorMessage', ErrorMessage)

app.config.globalProperties.$swal = Swal

app.mount('#app')
