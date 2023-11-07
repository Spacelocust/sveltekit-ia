<script>
  import '../app.postcss';

  import { enhance } from '$app/forms';

  export let data;
</script>

<div class="flex justify-between w-screen p-4">
  <h1 class="text-xl">Agency travel</h1>

  <div>
    <a href="/">search</a>
  </div>
</div>

<slot />
