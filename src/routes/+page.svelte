<script>
    import { onMount } from 'svelte';
    import queryString from "query-string";
    import { GradientButton } from 'flowbite-svelte';
    import Youtube from "svelte-youtube-embed";

    let parsed = {};
    if (typeof window !== "undefined") {
        parsed = queryString.parse(window.location.search);
    }
    let qString = parsed.key + "";

    let deafultLang = "en";

    let key = qString.split("/")[1];
    let value = qString.split("/")[2];
    const address = 'https://id.oliot.org/dl/v1/resolve/' + key + '/' + value + '?linktype=linkset';
    let data = null;
    let results = [];
    let imgSrc = "";
    let videoSrc = "";
	let url="www.naver.com";

    onMount(async () => {
        const headers = new Headers({
            'Content-Type': 'application/json',
        });
        const response = await fetch(address, {headers}).then(response => response.json());
        let dupCheckArr = [];
        response.forEach((item,idx)=>{
            if(item.AcceptLanguage == deafultLang && item.LinkType != "image" && item.LinkType != "gs1:relatedVideo"){
                results.push(item);
            }
            if(item.LinkType == "image"){
                imgSrc = item.DestinationUrl;
            }
            if(item.LinkType == "gs1:relatedVideo"){
                let newStr = item.DestinationUrl;
                videoSrc = newStr.replace("https://youtu.be/", "")
            }
        });
        results = results; // mutate arrays or objects will not trigger updates by themselves. One way to fix that is to assign results to itself to tell the compiler it has changed
    });
</script>

<main>
    <img src="{imgSrc}" alt="not work">
    <br>
    <div class="area">
        <div class="link-area">
            {#each results as item}
                <GradientButton outline color="cyanToBlue" class="mt-1 flex-row" type="button" onclick="location.href='{item.DestinationUrl}' ">
                    <div class="flex-row">
                        <h3>{item.Title}</h3>
                        <svg aria-hidden="true" class="ml-2 mr-1 w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                    </div>
                </GradientButton>
            {:else}
                <!-- this block renders when photos.length === 0 -->
                <p>loading...</p>
            {/each}
        </div>

        <br>
        <hr />

        {#if videoSrc != ""}
            <Youtube id="{videoSrc}"/>
        {:else}
            <p>loading...</p>
        {/if}

        <br>
        <hr />

        <div class="traceability-area">
            <webview src={url}></webview>
        </div>
    </div>
</main>

<style>
    main {
        text-align: center;
        padding: 2rem;
    }
</style>
  