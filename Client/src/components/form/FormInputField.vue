<script setup lang="ts">
    const props = defineProps<{ modelValue?: string | number, label: string }>()
</script>

<template>
    <div>
        <label>{{ label }}: </label>
        <input 
            v-bind="$attrs" 
            :value="modelValue" 
            @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
        >
    </div>
</template>