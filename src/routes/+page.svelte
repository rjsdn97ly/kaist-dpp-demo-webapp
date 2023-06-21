<script>
    import { onMount } from 'svelte';
    import queryString from "query-string";
    import { GradientButton } from 'flowbite-svelte';
    import Youtube from "svelte-youtube-embed";

    let parsed = {};
    if (typeof window !== "undefined") {
        parsed = queryString.parse(window.location.search);
    }
    let pureQString = parsed.key + "";
    let qString = parsed.key + "";
    let deafultLang = "en";
    qString = qString.split("/");
    let stringS =  "";

    stringS = qString[1] + "/" + qString[2];
    if(qString.length > 3){
        stringS +=  "/" + qString[3] + "/" + qString[4];
    }
    if(qString.length > 5){
        stringS += "/" + qString[5] + "/" + qString[6];
    }
    const dlAddress = 'https://id.oliot.org/dl/v1/resolve/' + stringS + '?linktype=linkset';
    let data = null;
    let results = [];
    let imgSrc = "";
    let imgTitle = "";
    let videoSrc = "";
	// let traceUrl="";

    onMount(async () => {
        const headers = new Headers({
            'Content-Type': 'application/json',
        });
        const dlResponse = await fetch(dlAddress, {headers}).then(response => response.json());
        let dupCheckArr = [];
        dlResponse.forEach((item,idx)=>{
            if(item.AcceptLanguage == deafultLang && item.LinkType != "image" && item.LinkType != "gs1:homepage" && item.LinkType != "main"){
                results.push(item);
            }
            if(item.LinkType == "image"){
                imgSrc = item.DestinationUrl;
                imgTitle = item.Title;
            }
            if(item.LinkType == "gs1:relatedVideo"){
                let newStr = item.DestinationUrl;
                videoSrc = newStr.replace("https://youtu.be/", "")
            }
            // if(item.LinkType == "gs1:traceability"){
            //     traceUrl = item.DestinationUrl;
            // }
        });
        results = results; // mutate arrays or objects will not trigger updates by themselves. One way to fix that is to assign results to itself to tell the compiler it has changed
    });
</script>

<main>
    <div style="display: flex; flex-direction: column; box-shadow: 0px 0px 5px 1px #555555;">
        <p>{imgTitle}</p>
        <img src="{imgSrc}" alt="not work">
    </div>
    <br>
    <div class="area">
        <div style="display: flex; flex-direction: column;">
            <p>GS1 Services</p>
            <div class="link-area" style="padding: 0px 5px 0px 5px">
                {#each results as item}
                    <GradientButton outline color="cyanToBlue" class="mt-1 flex-row" type="button" onclick="location.href='{item.DestinationUrl}' ">
                        <div class="flex-row">
                            <h3>{item.LinkType}</h3>
                            <svg aria-hidden="true" class="ml-2 mr-1 w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                        </div>
                    </GradientButton>
                {:else}
                    <!-- this block renders when photos.length === 0 -->
                    <p>loading...</p>
                {/each}
            </div>
        </div>

        <br>

        <div style="display: flex; flex-direction: column;">
        {#if videoSrc != ""}
            <p>GS1 Realated Video</p>
            <Youtube id="{videoSrc}"/>
        {/if}
        </div>

        <!-- <br>

        <div style="display: flex; flex-direction: column; box-shadow: 0px 0px 5px 1px #555555;">
            <p>GS1 Traceability</p>
            {#if traceUrl != ""}
                <div class="traceability-area">
                    <br>
                    <div style="width: 100%; height:100%;">
                        <iframe
                            style="width: 130%; height:130%;
                            -moz-transform: scale(0.8, 0.8);
                            -webkit-transform: scale(0.8, 0.8);
                            -o-transform: scale(0.8, 0.8);
                            -ms-transform: scale(0.8, 0.8);
                            -moz-transform-origin: 0 0;
                            -webkit-transform-origin: 0 0;
                            -o-transform-origin: 0 0;
                            -ms-transform-origin: 0 0;
                            transform: scale(0.8, 0.8);
                            transform-origin: 0 0;"
                            scrolling="no" align="center"
                            title="epcis-trace" src="https://id.oliot.org{pureQString}?linktype=gs1:traceability">
                        </iframe>
                    </div>
                </div>
            {:else}
                <p>loading...</p>
            {/if}
        </div> -->
    </div>
</main>

<style>
    main {
        text-align: center;
        padding: 2rem;
    }
</style>
  