<template>
    <div>
        Selected: {{ selectedFlavor }}
        
        <div>
            <select v-model="selectedFlavor">
                <option v-for="flavor in flavors" :value="flavor.value" :key="flavor.value">{{ flavor.name }}</option>
            </select>
        </div>
    </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const flavors = [
    { name: 'No Flavor', value: 'plain' },
    { name: 'Angular', value: 'angular' },
    { name: 'Vue', value: 'vue' },
    { name: 'React', value: 'react' },
    { name: 'Svelte', value: 'svelte' },
]

const selectedFlavor = ref(flavors[0].value)

watch(selectedFlavor, () => {
    document.body.className = `active-${selectedFlavor.value}`
}, { immediate: true })
</script>
