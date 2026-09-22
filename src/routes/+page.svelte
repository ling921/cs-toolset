<script lang="ts">
  import { onMount } from 'svelte';
  import { loadPreferences, preferences } from '$lib/preferences.svelte';

  onMount(() => {
    loadPreferences();
    location.replace(`/${preferences.locale}/`);
  });
</script>

<svelte:head><meta name="robots" content="noindex" /></svelte:head>
