<template>
  <div v-if="user">
    <h2>
      {{ user.firstName }} {{ user.lastName }}
    </h2>
    <p>Email:
      {{ user.email }}
    </p>
    <p>Age:
      {{ user.age }}
    </p>
    <ul>
      <li>
        <router-link :to="`/users/update/${user.id}`">
          Update
        </router-link>
      </li>
      <li>
        <router-link :to="`/users/delete/${user.id}`">
          Delete
        </router-link>
      </li>
    </ul>
  </div>
  <error-handler v-else />
</template>

<script setup>
import useError from '@/composables/use-error'
import useF3tch from '@/composables/use-f3tch'

const route = useRoute()
const id = route.params.id

// Handle errors in the page level -- this component.
const { raw } = useError()
const user = ref()

try {
  const { data, error } = await useF3tch(`/users/${id}`)
  user.value = data
  raw.value = error
} catch (error) {
  raw.value = error
}
</script>
