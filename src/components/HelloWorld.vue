<template>
  <div class="container">
    <transition name="modal">
      <div class="modal" v-if="showForm" style="display: block">
        <div class="modal-dialog modal-lg modal-dialog-centered" role="document" style="width: 600px">
          <div class="modal-content" style="text-align: center">
            <div class="modal-body" style="padding: 40px">
              <ValidationForm @submit="saveData">
                <div class="form-group mb-3">
                  <ValidationField name="name" rules="required|min:3" v-slot="{ field, errors: fieldErrors }">
                    <input
                      v-bind="field"
                      type="text"
                      placeholder="Name"
                      class="form-control"
                      :class="{ input: true, 'is-danger': fieldErrors.length > 0 }"
                    />
                    <span v-if="fieldErrors.length" class="help is-danger">{{ fieldErrors[0] }}</span>
                  </ValidationField>
                </div>

                <div class="form-group mb-3">
                  <ValidationField name="age" rules="required|numeric|min_value:18" v-slot="{ field, errors: fieldErrors }">
                    <input
                      v-bind="field"
                      type="number"
                      placeholder="Age"
                      class="form-control"
                      :class="{ input: true, 'is-danger': fieldErrors.length > 0 }"
                    />
                    <span v-if="fieldErrors.length" class="help is-danger">{{ fieldErrors[0] }}</span>
                  </ValidationField>
                </div>

                <div class="form-group mb-3">
                  <ValidationField name="email" rules="required|email" v-slot="{ field, errors: fieldErrors }">
                    <input
                      v-bind="field"
                      type="text"
                      placeholder="Email"
                      class="form-control"
                      :class="{ input: true, 'is-danger': fieldErrors.length > 0 }"
                    />
                    <span v-if="fieldErrors.length" class="help is-danger">{{ fieldErrors[0] }}</span>
                  </ValidationField>
                </div>

                <button type="submit" class="btn btn-primary m-1">Save</button>
                <button type="button" class="btn btn-secondary m-1" @click="closeForm">Close</button>
              </ValidationForm>
            </div>
          </div>
        </div>
      </div>
    </transition>

    <div style="text-align: left; margin-bottom: 20px">
      <button
        @click="addNew"
        style="
          background: green;
          padding: 5px 40px;
          color: #ffffff;
          cursor: pointer;
          border-radius: 5px;
          border: 1px solid green;
        "
      >
        Add
      </button>
    </div>

    <div class="col-md-12">
      <kendo-grid :data-items="gridData" :filterable="true">
        <kendo-grid-column field="id" title="ID" />
        <kendo-grid-column field="name" title="Name" />
        <kendo-grid-column field="age" title="Age" />
        <kendo-grid-column field="email" title="Email" />
        <kendo-grid-column :width="200" title="Action">
          <template #cell="{ dataItem }">
            <button class="btn btn-success btn-sm m-1" @click="editHandler(dataItem)">Edit</button>
            <button class="btn btn-danger btn-sm m-1" @click="deleteHandler(dataItem)">Delete</button>
          </template>
        </kendo-grid-column>
      </kendo-grid>
    </div>
  </div>
</template>

<script>
import { ref, reactive, getCurrentInstance } from "vue";
import { Form as ValidationForm, Field as ValidationField } from "vee-validate";
import { Grid, GridColumn } from "@progress/kendo-vue-grid";

export default {
  components: {
    ValidationForm,
    ValidationField,
    'kendo-grid': Grid,
    'kendo-grid-column': GridColumn,
  },

  setup() {
    const { proxy } = getCurrentInstance();
    const showForm = ref(false);

    const formData = reactive({
      id: null,
      name: "",
      age: "",
      email: "",
    });

    const gridData = ref([
      { id: 1, name: "John Doe dd", age: 28, email: "JohnDoe@test.com" },
      { id: 2, name: "Jane Smith", age: 32, email: "JaneSmith@test.com" },
      { id: 3, name: "Michael Johnson", age: 45, email: "MichaelJohnson@test.com" },
    ]);

    function editHandler(rowData) {
      formData.id = rowData.id;
      formData.name = rowData.name;
      formData.age = rowData.age;
      formData.email = rowData.email;
      showForm.value = true;
    }

    function deleteHandler(rowData) {
      proxy.$swal
        .fire({
          title: "Are you sure?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Yes, delete it!",
          cancelButtonText: "Cancel",
        })
        .then((result) => {
          if (result.isConfirmed) {
            const index = gridData.value.findIndex((item) => item.id === rowData.id);
            if (index !== -1) {
              gridData.value.splice(index, 1);
              proxy.$swal.fire("Deleted!", "Record has been deleted.", "success");
            }
          } else {
            proxy.$swal.fire("Cancelled", "Your record is safe.", "info");
          }
        });
    }

    function addNew() {
      formData.id = null;
      formData.name = "";
      formData.age = "";
      formData.email = "";
      showForm.value = true;
    }

    function closeForm() {
      showForm.value = false;
    }

    function saveData(values) {
      if (formData.id === null) {
        const newId = gridData.value.length ? Math.max(...gridData.value.map((x) => x.id)) + 1 : 1;
        gridData.value.push({
          id: newId,
          name: values.name,
          age: values.age,
          email: values.email,
        });
        proxy.$swal.fire("Success", "New record added.", "success");
      } else {
        const index = gridData.value.findIndex((item) => item.id === formData.id);
        if (index !== -1) {
          gridData.value[index] = {
            id: formData.id,
            name: values.name,
            age: values.age,
            email: values.email,
          };
          proxy.$swal.fire("Success", "Record updated.", "success");
        }
      }

      showForm.value = false;
    }

    return {
      showForm,
      formData,
      gridData,
      editHandler,
      deleteHandler,
      addNew,
      saveData,
      closeForm,
    };
  },
};
</script>

<style scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1050;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background-color: rgba(0, 0, 0, 0.5);
}

.is-danger {
  border-color: red;
}

.help.is-danger {
  color: red;
  font-size: 12px;
}

.input {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
}
</style>
