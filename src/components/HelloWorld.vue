<template>
  <div class="container">
    <transition name="modal">
      <div class="modal" v-if="showForm" style="display: block">
        <div class="modal-dialog modal-lg modal-dialog-centered" role="document" style="width: 600px">
          <div class="modal-content" style="text-align: center">
            <div class="modal-body" style="padding: 40px">
              <Form :validation-schema="schema" :initial-values="formData" @submit="saveData">
                <div class="form-group mb-3">
                  <Field name="name" placeholder="Name" class="form-control" type="text" />
                  <ErrorMessage class="text-danger" name="name" />
                </div>
                <div class="form-group mb-3">
                  <Field name="age" placeholder="Age" class="form-control" type="number" />
                  <ErrorMessage class="text-danger" name="age" />
                </div>
                <div class="form-group mb-3">
                  <Field name="email" placeholder="Email" class="form-control" type="email" />
                  <ErrorMessage class="text-danger" name="email" />
                </div>
                <button class="btn btn-primary m-1" type="submit">Save</button>
                <button class="btn btn-secondary m-1" @click="showForm = false" type="button">Close</button>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </transition>

    <div style="text-align: left; margin-bottom: 20px">
      <button @click="addNew" class="btn btn-success">Add New</button>
    </div>

    <div class="col-md-12">
      <Grid 
        ref="grid" 
        :data-items="onDataBound" 
        :sortable="true" 
        :pageable="true"
        :edit-field="'inEdit'"
        @datastatechange="dataStateChange"
        :columns="columns"
      >
        <template v-slot:myTemplate="{ props }">
          <template v-if="props?.dataItem">
            <KButton
              class="btn btn-primary m-1"
              :theme-color="'success'"
              @click="editHandler(props.dataItem)"
            >
              Update
            </KButton>
            <KButton
              class="btn btn-danger m-1"
              :theme-color="'danger'"
              @click="deleteHandler(props.dataItem)"
            >
              Delete
            </KButton>
          </template>
        </template>

        <GridNoRecords>
          There is no data available.
        </GridNoRecords>
      </Grid>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import Swal from "sweetalert2";
import "@progress/kendo-theme-default/dist/all.css";

import { Grid, GridNoRecords } from "@progress/kendo-vue-grid";
import { Button as KButton } from "@progress/kendo-vue-buttons";

import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";

// Validation Schema
const schema = yup.object({
  name: yup.string().required('Name is required').min(3, 'At least 3 characters'),
  email: yup.string().email('Invalid email').required('Email is required'),
  age: yup.number().required('Age is required').min(18, 'Must be 18 or older'),
});

// State Variables
const showForm = ref(false);
const formData = ref({ id: null, name: "", age: "", email: "" });
const onDataBound = ref([
  { id: 1, name: "John Doe", age: 28, email: "JohnDoe@test.com" },
  { id: 2, name: "Jane Smith", age: 32, email: "JaneSmith@test.com" },
  { id: 3, name: "Michael Johnson", age: 45, email: "MichaelJohnson@test.com" },
]);

const columns = ref([
  { field: 'id', title: 'ID', width: '80px', filterable: false, editable: false },
  { field: 'name', title: 'Name', filterable: true },
  { field: 'age', title: 'Age', filter: 'numeric' },
  { field: 'email', title: 'Email', filterable: true },
  { cell: 'myTemplate', title: 'Actions', filterable: false, width: '200px' }
]);

const addNew = () => {
  formData.value = { id: null, name: "", age: "", email: "" };
  showForm.value = true;
};

const dataStateChange = (event) => {
  console.log("Data state changed:", event);
};

const editHandler = (dataItem) => {
  if (dataItem) {
    formData.value = { ...dataItem };
    showForm.value = true;
  }
};

const deleteHandler = (dataItem) => {
  Swal.fire({
    title: "Are you sure?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Yes, delete it!",
    cancelButtonText: "Cancel",
  }).then((result) => {
    if (result.isConfirmed) {
      onDataBound.value = onDataBound.value.filter((item) => item.id !== dataItem.id);
      Swal.fire("Deleted!", "The record has been deleted.", "success");
    }
  });
};

const saveData = (values, actions) => {
  if (formData.value.id === null) {
    formData.value.id = onDataBound.value.length + 1;
    values.id = formData.value.id;
    onDataBound.value.push({ ...values });
    Swal.fire("Success!", "Record added successfully.", "success");
  } else {
    const index = onDataBound.value.findIndex(item => item.id === formData.value.id);
    if (index !== -1) {
      onDataBound.value[index] = { ...values };
      Swal.fire("Success!", "Record updated successfully.", "success");
    }
  }
  actions.resetForm();
  showForm.value = false;
};
</script>

<style scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}
.modal-content {
  width: 600px;
  background: #fff;
  padding: 20px;
  border-radius: 8px;
}
.is-invalid {
  border-color: red;
}
.invalid-feedback {
  color: red;
  font-size: 12px;
}
</style>
