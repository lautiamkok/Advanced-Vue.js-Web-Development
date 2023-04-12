<template>
  <p>
    Hello World!
  </p>
  <h2>
    Plugins
  </h2>
  <p>
    $apiBaseUrl: {{ $apiBaseUrl }}
  </p>
  <p>
    $foo: {{ $foo }}
  </p>
  <p>
    $hey: {{ $hey('Jane') }}
  </p>
  <ClientOnly>
    <p>
      $hi (client only): {{ $hi('Molly') }}
    </p>
  </ClientOnly>

  <h2>
    Utils
  </h2>
  <p>
    doSomething: {{ doSomething() }}
  </p>

  <h2>
    Composables
  </h2>
  <p>
    Named export `useA`: {{ a }}
  </p>
  <p>
    Named export `useB`: {{ b }}
  </p>
  <p>
    Named export `useC`: {{ c }}
  </p>
  <p>
    Named export `useD`: {{ d }}
  </p>
  <p>
    Default export `useFoo`: {{ foo }}
  </p>
  <p>
    Nested default export `useBaz`: {{ useBaz() }}
  </p>
</template>

<script setup>
// Call the plugins when you want to use them here.
const { $hey, $hello } = useNuxtApp()

// Make sure to call the plugin on the server side only.
if (process.server) {
  console.log('server only:', $hello('John'))
}

// Note that no need to de-structure the exported functions from composables.
const a = useA()
const b = useB()
const c = useC()
const d = useD()
const foo = useFoo()
console.log(useBaz())
</script>
