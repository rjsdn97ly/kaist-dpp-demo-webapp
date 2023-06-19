<script>
  import "../app.postcss";
  import Header from "$lib/components/header.svelte";
  import Footer from "$lib/components/footer.svelte";
  import CustomCss from "$lib/css/custom.css";
</script>

<Header />
<slot />
<!-- <Footer /> -->

<!-- layout은 가장 상위의 layout을 따라가는 듯 -->
