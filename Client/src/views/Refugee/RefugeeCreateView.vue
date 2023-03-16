<script setup lang="ts">
import FormInputField from '@/components/form/FormInputField.vue';
import RefugeeGetLocation from '@/components/Refugee/RefugeeGetLocation.vue';
import { ref } from 'vue';

const name = ref();
const address = ref('');

const submit = () => {
  const regufee = {
    name: name.value,
    address: address.value
  }
  console.log(regufee)
};

const cancelCreation = () => {
    console.log("Cancel")
}
</script>

<template>
  <div>
    <h1>
      Refugee Create View
    </h1>
    <div>
      <form @submit.prevent="submit">
        <FormInputField label="Name" v-model="name" />
        <FormInputField label="Address" v-model="address" />
        <RefugeeGetLocation/>
        <button type="button" :onClick="cancelCreation">Cancel</button>
        <button type="submit">Save</button>
      </form>
    </div>
  </div>
</template>

<style scoped>
</style>