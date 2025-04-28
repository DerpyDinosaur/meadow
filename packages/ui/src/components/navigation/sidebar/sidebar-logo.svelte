<script lang="ts">
	let { title, icon } = $props();
</script>

<div>
	{@render icon()}
	{title}
</div>