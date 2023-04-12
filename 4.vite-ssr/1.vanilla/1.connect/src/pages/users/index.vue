<template>
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
</template>

<script setup>
const users = ref()
const { data } = await useF3tch('/users?limit=5')
if (!data) {
  createError({
    status: 500,
    message: 'No data!'
  })
}
users.value = data ? data.users : data
</script>
