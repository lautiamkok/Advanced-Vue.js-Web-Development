<template>
  <h2>
    Create User
  </h2>

  <form>
    <p>First Name: 
      <input v-model="user.firstName" type="text" name="firstName">
    </p>
    <p>Last Name: 
      <input v-model="user.lastName" type="text" name="lastName">
    </p>
    <p>Email: 
      <input v-model="user.email" type="text" name="email">
    </p>
  </form>

  <ul>
    <li>
      <button v-on:click="cancel">
        Cancel
      </button>
    </li>
    <li>
      <button v-on:click="create">
        Create
      </button>
    </li>
  </ul>

  <p style="color: red;" v-if="response.statusCode && response.statusCode != 200">
    {{ response.message }}
  </p>

</template>

<script setup>
const router = useRouter()
const route = useRoute()
const user = reactive({
  firstName: '',
  lastName: '',
  email: ''
})
const response = reactive({})

async function create () {
   // Adding a new user will not add it into the server. It will simulate a POST
   // request and will return the new created user with a new id
   // https://dummyjson.com/docs/users
  const { data, error } = await useF3tch(`/users/add`, {
    method: 'POST',
    body: user
  })

  if (error) {
    response.statusCode = error.statusCode
    response.message = error.message
    return
  }
  router.push(`/users/`)
}
 
function cancel () {
  router.push(`/users/`)
}
</script>
