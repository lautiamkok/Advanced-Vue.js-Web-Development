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

    <p style="color: red;" v-if="response.statusCode && response.statusCode != 200">
      {{ response.message }}
    </p>
  </div>
</template>

<script setup>
const router = useRouter()
const route = useRoute()
const id = route.params.id
const response = reactive({})

const { data: user } = await useF3tch(`/users/${id}`)
if (!user) {
  createError({
    statusCode: 500,
    message: 'No data!'
  })
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
    response.statusCode = error.statusCode
    response.message = error.message
    return
  }
  router.push(`/users/`)
}
 
function cancel () {
  router.push(`/users/${id}`)
}
</script>
