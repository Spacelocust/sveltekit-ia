<script lang="ts">
  import type { ActionData, PageData } from './$types';
  import { enhance } from '$app/forms';

  export let form: ActionData;

  let formLoading = false;
</script>

<div class="flex items-center flex-col">
  <form
    class="my-2"
    method="post"
    action="?/searchCountry"
    use:enhance={() => {
      formLoading = true;
      return async ({ update }) => {
        formLoading = false;
        update();
      };
    }}
  >
    <input type="text" name="search" placeholder="Chercher votre bonheur.." />
    <button type="submit" class="border-solid border-2 border-sky-500 p-1">search</button>
  </form>
</div>

{#if formLoading}
<span class="my-2">loading...</span>
{/if}

{#if form?.data.result}
  {#if form.error } 
    <span class="my-2">Error lors de la recherche</span>
  {:else}
    <ul class="border-solid border-2 border-black">
      {#if form.data.result.length === 0}
        <li class="border-solid border-2 border-black p-1 m-2">
          <h3>Aucun résultat</h3>
        </li>
      {:else}
        {#each form.data.result as country}
          <li class="border-solid border-2 border-black p-1 m-2">
            <h3>{ country.name }</h3>
            <ul>
              <li>La capitale: { country.capital }</li>
              <li>La langue: { country.language }</li>
              <li>Le nombre d'habitants: { country.population }</li>
              <li>Le climat: { country.climate }</li>
              <li>La devise: { country.currency }</li>
            </ul>
          </li>
        {/each}
      {/if}
    </ul>
  {/if}
{/if}
