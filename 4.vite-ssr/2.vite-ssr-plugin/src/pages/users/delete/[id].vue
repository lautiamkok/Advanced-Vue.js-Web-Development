<template>
  <div v-if="user">
    <h2>
      Delete {{ user.firstName }} {{ user.lastName }}?
    </h2>
    <ul>
      <li>
        <button v-on:click="cancel">
          Cancel
        </button>
      </li>
      <li>
        <button v-on:click="remove">
          Confirm
        </button>
      </li>
    </ul>

    <p style="color: red;" v-if="response.status && response.status != 200">
      {{ response.message }}
    </p>
  </div>
  <error-handler v-else />
</template>

<script setup>
import useError from '@/composables/use-error'
import useF3tch from '@/composables/use-f3tch'

const router = useRouter()
const route = useRoute()
const id = route.params.id
const response = reactive({})

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

async function remove () {
  // Deleting a user will not delete it into the server. It will simulate a
  // DELETE request and will return deleted user with "isDeleted" & "deletedOn"
  // keys.
  // https://dummyjson.com/docs/users
  const { data, error } = await useF3tch(`/users/${id}`, {
    method: 'DELETE'
  })

  if (!data) {
    response.status = error.status
    response.message = error.data ? error.data.message : error.message
    return
  }
  router.push(`/users/`)
}
 
function cancel () {
  router.push(`/users/${id}`)
}
</script>
