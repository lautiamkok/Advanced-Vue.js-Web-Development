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

  <p style="color: red;" v-if="response.status && response.status != 200">
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
  const { data } = await useF3tch(`/users/add`, {
    method: 'POST',

    // Need to add json content type so the server recieves a json object
    // instead of a json string for using native `fetch` or `cross-fetch`. But
    // no need to provide this info when using `ofetch` because ofetch
    // automatically stringifies request body (if an object is passed) and adds
    // JSON Content-Type and Accept headers(for put, patch and post requests).
    // https://github.com/unjs/ofetch#%EF%B8%8F-json-body headers: {
    //   'Content-Type':'application/json',
    // },

    // No need to use JSON.stringify to stringify user reactive object if using
    // `ofetch`.
    body: user
  })

  if (!data) {
    response.status = error.status
    response.message = error.data ? error.data.message : error.message
    return
  }
  router.push(`/users/`)
}
 
function cancel () {
  router.push(`/users/`)
}
</script>
