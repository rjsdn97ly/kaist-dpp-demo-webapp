<script>
  import "../app.postcss";
  import Header from "$lib/components/header.svelte";
  import Footer from "$lib/components/footer.svelte";
  import CustomCss from "$lib/css/custom.css";
</script>
<svelte:head>
  <!-- elements go here -->
  <!-- <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests"> -->
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0" />
</svelte:head>

<Header />
<slot />
<!-- <Footer /> -->

<!-- layout은 가장 상위의 layout을 따라가는 듯 -->
