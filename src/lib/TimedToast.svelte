<script lang="ts">
  import { Toast } from "flowbite-svelte";
  import { type ComponentProps, createEventDispatcher } from "svelte";
  import { fly } from "svelte/transition";

  const dispatch = createEventDispatcher();

  export let id: number;
  export let variant: keyof typeof colorMap = "info";
  export let duration = 6000;

  let open = true;

  const colorMap: Record<string, ComponentProps<Toast>["color"]> = {
    info: "blue",
    success: "green",
    warning: "yellow",
    error: "red",
  };

  const timeout = setTimeout(() => (open = false), duration);

  $: if (open === false) {
    clearTimeout(timeout);
    open = false;
    dispatch("toast:closed", { id });
  }
</script>

<Toast
	bind:open
	color={colorMap[variant]}
	class={$$props.class}
	transition={fly}
	params={{ x: 200 }}
>
	<slot />
</Toast>
