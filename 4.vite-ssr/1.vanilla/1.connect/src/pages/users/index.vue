<!-- Option 1: Use a slot -->
<template>
  <error-boundary>
    <div v-if="users">
      <h2>
        Users
      </h2>
      <ul>
        <li v-for="user in users" v-bind:key="user.id">
          <router-link :to="`/users/${user.id}`">
            {{ user.firstName }} {{ user.lastName }}
          </router-link>
          <router-link :to="`/users/update/${user.id}`">
            [Update]
          </router-link>
          <router-link :to="`/users/delete/${user.id}`">
            [Delete]
          </router-link>
        </li>
      </ul>
      <router-link to="/users/create">
        Add New
      </router-link>
    </div>
  </error-boundary>
</template>

<!-- Option 2: Use a component -->
<!-- <template>
  <div v-if="users">
    <h2>Users</h2>
    <ul>
      <li v-for="user in users" v-bind:key="user.id">
        <router-link :to="`/users/${user.id}`">
          {{ user.name }}
        </router-link>
        <router-link :to="`/users/update/${user.id}`">
          [Update]
        </router-link>
        <router-link :to="`/users/delete/${user.id}`">
          [Delete]
        </router-link>
      </li>
    </ul>
    <router-link to="/users/create">
      Add New
    </router-link>
  </div>
  <error-handler v-else />
</template> -->

<script setup>
import useError from '@/composables/use-error'
import useF3tch from '@/composables/use-f3tch'

// Option 1:
// Propagate errors to the app level.
// TypeError test:
// const num = 123
// num.toUpperCase()

// Option 2:
// Always handle errors in the page level -- this component.
const { raw } = useError()
const users = ref()

try {
  // TypeError test:
  // const num = 123
  // num.toUpperCase()
  
  const { data, error } = await useF3tch('/users?limit=5')
  users.value = data ? data.users : data
  raw.value = error
} catch (error) {
  raw.value = error
}
</script>
