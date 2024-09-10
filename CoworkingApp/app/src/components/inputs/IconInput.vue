<script setup lang="ts">
import { ref, watch } from "vue";

const props = defineProps({
  id: {
    type: String,
    default: "icon-input",
  },
  placeholder: {
    type: String,
    required: true,
  },
  initialValue: {
    type: String,
    default: "",
  },
  type: {
    type: String,
    default: "text",
  },
});

const inputValue = ref("");

watch(
  () => inputValue.value,
  (newValue) => {
    emit("onValueChanged", newValue);
  }
);
watch(
  () => props.initialValue,
  (newValue) => {
    inputValue.value = newValue;
  }
);

const emit = defineEmits(["onValueChanged"]);
</script>

<template>
  <div class="p-1.5 flex flex-row w-90 max-w-full">
    <slot name="icon" :id="id">
      <label :for="id">
        <img src="@/assets/svg/map-pin.svg" alt="map pin" class="mr-3" />
      </label>
    </slot>
    <input
      v-model="inputValue"
      :id="id"
      :type="type"
      :placeholder="placeholder"
      class="flex-1 font-instrument focus:outline-none text-center"
    />
  </div>
</template>
