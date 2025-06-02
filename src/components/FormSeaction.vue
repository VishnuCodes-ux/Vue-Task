<template>
  <div>
    <Form
      :validation-schema="schema"
      :initial-values="props.formData"
      @submit="saveData"
    >
      <h3 class="mb-5">{{ props.formTitleText }}</h3>

      <div class="form-group mb-3">
        <Field
          name="name"
          placeholder="Name"
          class="form-control"
          type="text"
        />
        <ErrorMessage class="text-danger" name="name" />
      </div>
      <div class="form-group mb-3">
        <Field
          name="age"
          placeholder="Age"
          class="form-control"
          type="number"
        />
        <ErrorMessage class="text-danger" name="age" />
      </div>
      <div class="form-group mb-3">
        <Field
          name="email"
          placeholder="Email"
          class="form-control"
          type="email"
        />
        <ErrorMessage class="text-danger" name="email" />
      </div>
      <button class="btn btn-primary m-1" type="submit">Save</button>
      <button
        class="btn btn-secondary m-1"
        @click="$emit('close')"
        type="button"
      >
        Close
      </button>
    </Form>
  </div>
</template>
<script setup>
import { defineProps } from "vue";
import { Form, Field, ErrorMessage } from "vee-validate";
const props = defineProps({
  formTitleText: String,
  formData: {
    type: {
      default: () => {
        return {
          name: "",
          age: "",
          email: "",
        };
      },
    },
  },
  schema: {
    required: true
  },
  showForm: {
    type: Boolean,
    default: false,
  },
  saveData: {
    type: Function,
    required: true,
  },
});
</script>