<template>
  <h2>
    Form Validation with Vuelidate
  </h2>

  <p v-bind:class="{ 'error': response.statusText != 'ok' }">
  {{ response.message }}
  </p>

  <form
    v-on:submit.prevent="submitForm"
    novalidate="true"
  >
    <p v-bind:class="{ 'error': v$.honorific.$errors.length }">
      <label for="honorific">
        Title: 
      </label>
      <input
        v-model="honorific"
        type="radio"
        name="honorific"
        value="mr"
      /> Mr
      <input
        v-model="honorific"
        type="radio"
        name="honorific"
        value="ms"
      /> Ms
      <div v-for="error of v$.honorific.$errors" :key="error.$uid">
        <div>
          {{ error.$message }}
        </div>
      </div>
    </p>

    <p v-bind:class="{ 'error': v$.name.$errors.length }">
      <label for="name"></label>
        Name: 
      <input
        v-model.trim="name"
        v-on:blur="v$.name.$touch"
        type="text"
        name="name"
        placeholder="Name"
      >
      <div v-for="error of v$.name.$errors" :key="error.$uid">
        <div>
          {{ error.$message }}
        </div>
      </div>
    </p>

    <p v-bind:class="{ 'error': v$.email.$errors.length }">
      <label for="email">
        Email: 
      </label>
      <input
        v-model.trim="email"
        v-on:blur="v$.email.$touch"
        type="email"
        name="email"
        placeholder="Email"
      >
      <div v-for="error of v$.email.$errors" :key="error.$uid">
        <div>
          {{ error.$message }}
        </div>
      </div>
    </p>

    <p v-bind:class="{ 'error': v$.telephone.$errors.length }">
      <label for="telephone">
        Telephone: 
      </label>
      <input
        v-model.number="telephone"
        v-on:blur="v$.telephone.$touch"
        type="text"
        name="telephone"
        placeholder="Telephone"
      >
      <div v-for="error of v$.telephone.$errors" :key="error.$uid">
        <div>
          {{ error.$message }}
        </div>
      </div>
    </p>

    <p v-bind:class="{ 'error': v$.contactMethod.$errors.length }">
      <label for="contactMethod">
        How would you like to be contacted?: 
      </label>
      <select
        v-model="contactMethod"
        v-on:blur="v$.contactMethod.$touch"
        name="Contact Method"
      >
        <option value="">Please select one</option>
        <option value="email">Email</option>
        <option value="telephone">Telephone</option>
      </select>
      <div v-for="error of v$.contactMethod.$errors" :key="error.$uid">
        <div>
          {{ error.$message }}
        </div>
      </div>
    </p>

    <p v-bind:class="{ 'error': v$.message.$errors.length }">
      <label for="message">
        Message: 
      </label>
      <textarea
        v-model.trim="message"
        v-on:blur="v$.message.$touch"
        placeholder="Write something"
        name="message"
      ></textarea>
      <div v-for="error of v$.message.$errors" :key="error.$uid">
        <div>
          {{ error.$message }}
        </div>
      </div>
    </p>

    <p>
      <label for="subscribe">
        Subscribe to the mailing list: 
      </label>
      <input
        v-model="subscribe"
        type="checkbox"
        name="subscribe"
        true-value="yes"
        false-value="no"
      />
    </p>

    <p
      v-show="subscribe === 'yes'"
      v-bind:class="{ 'error': v$.agreement.$errors.length }"
    >
      <label for="agreement" >
        Agree to <a href="#">Privacy Policy</a>: 
      </label>
      <input
        v-model="agreement"
        type="checkbox"
        value="privacy policy"
        agreement="agreement"
      /><br/>
      <label for="agreement">
        Agree to <a href="#">Terms and Conditions</a>: 
      </label>
      <input
        v-model="agreement"
        type="checkbox"
        value="terms and conditions"
        name="agreement"
      />
      <div v-for="error of v$.agreement.$errors" :key="error.$uid">
        <div>
          {{ error.$message }}
        </div>
      </div>
    </p>

    <p>
      <input
        type="submit"
        value="Submit"
      >
    </p>
  </form>
</template>

<script setup>
import { useVuelidate } from '@vuelidate/core'
import {
  required,
  and,
  helpers,
  email as isEmail,
  numeric,
  minLength
} from '@vuelidate/validators'

// Use a reactive object only.
// const form = reactive({
//   honorific: '',
//   name: '',
//   email: '',
//   telephone: '',
//   message: '',
//   contactMethod: '',
//   subscribe: 'no',
//   agreement:  []
// })

// Use ref objects and assign them to a reactive object.
const honorific = ref('')
const name = ref('')
const telephone = ref('')
const email = ref('')
const message = ref('')
const contactMethod = ref('')
const subscribe = ref('no')
const agreement = ref([])
const form = reactive({
  // When assigning a ref to a reactive property, it will be automatically
  // unwrapped.
  honorific,
  name,
  email,
  telephone,
  message,
  contactMethod,
  subscribe,
  agreement
})
const response = reactive({
  statusCode: '',
  statusText: '',
  message: ''
})

// Set rules for Vuelidate.
// Static/basic validation schema.
// const rules = {
//   honorific: {
//     required
//   }, // Matches form.honorific
//   name: {
//     required,
//     minLength: minLength(6)
//   }, // Matches form.name
//   email: {
//     required,
//     isEmail
//   }, // Matches form.email
//   telephone: {
//     required,
//     numeric
//   }, // Matches form.telephone
//   message: {
//     required
//   }, // Matches form.message
//   contactMethod: {
//     required
//   }, // Matches form.contactMethod
//   agreement: {
//     // required: requiredIf(() => form.subscribe === 'yes'),
//     shouldBeChecked: and(
//       () => form.agreement.includes('privacy policy'),
//       () => form.agreement.includes('terms and conditions')
//     )
//   } // Matches form.agreement
// }

// Dynamic validation schema.
// https://vuelidate-next.netlify.app/examples.html#dynamic-validation-schema
const rules = computed(() => {
  const localRules = {
    honorific: {
      required
    }, // Matches form.honorific
    name: {
      required,
      minLength: minLength(6)
    }, // Matches form.name
    email: {
      required,
      isEmail
    }, // Matches form.email
    telephone: {
      required,
      numeric
    }, // Matches form.telephone
    message: {
      required
    }, // Matches form.message
    contactMethod: {
      required
    }, // Matches form.contactMethod
    agreement: {}
  }
  if (form.subscribe === 'yes') {
    localRules.agreement = {
      // Custom error messages.
      // https://vuelidate-next.netlify.app/custom_validators.html#custom-error-messages
      shouldBeChecked: helpers.withMessage('The Privacy Policy and Terms & Conditions must be checked.', and(
        () => form.agreement.includes('privacy policy'),
        () => form.agreement.includes('terms and conditions')
      ))
    }
  }
  return localRules
})
const v$ = useVuelidate(rules, form)

async function submitForm () {
  // Validate form.
  const isValid = await v$.value.$validate()
  if (!isValid) {
    return
  }

  // Post the data in a real app.
  // const { data } = await useF3tch('/message', {
  //   method: 'POST',
  //   body: form
  // })
  
  // Dummy response.
  const data = {
    statusCode: 200,
    statusText: 'ok',
    message: 'Sent OK!'
  }
  if (data === null) {
    alert('Sorry, server error. Please try again.')
  }

  // Reset form.
  if (data.statusText === 'ok') {
    // Reset Vuelidate.
    v$.value.$reset()

    // Reset form properties.
    Object.entries(form).forEach(([key,value]) => {
      form[key] = ''
    })
    form.subscribe = 'no'
    form.agreement = []
  }

  if (data) {
    response.statusCode = data.statusCode
    response.statusText = data.statusText
    response.message = data.message
  }
}
</script>

<style scoped>
.error {
  color: red;
}

.error input,
.error select,
.error textarea {
  border: 1px solid red;
}
</style>
