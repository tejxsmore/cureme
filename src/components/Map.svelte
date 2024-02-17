<script>
    import tt from "@tomtom-international/web-sdk-maps";
    import '@tomtom-international/web-sdk-maps/dist/maps.css'
    import { onMount } from "svelte";

    let mapElement;
    onMount(() => {
        let map = tt.map({
            key: "SOP3mR53bh1z6cBmklQHEAkWB6cAnrCR",
            container: mapElement,
            stylesVisibility: {
                trafficIncidents: true,
                trafficFlow: true
            },
            center: [72.877426, 19.076090 ],
            zoom: 15
        });
    })
</script>

<div bind:this={mapElement} class="w-full h-96 pb-6 rounded-lg border-gray-300 border"></div>