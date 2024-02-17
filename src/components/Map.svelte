<script>
    import tt from "@tomtom-international/web-sdk-maps";
    import '@tomtom-international/web-sdk-maps/dist/maps.css'
    import { onMount } from "svelte";

    let mapElement;
    onMount(() => {
            navigator.geolocation.getCurrentPosition((position) => {
            let longitude = position.coords.longitude;
            let latitude = position.coords.latitude; 

            let map = tt.map({
                key: "SOP3mR53bh1z6cBmklQHEAkWB6cAnrCR",
                container: mapElement,
                stylesVisibility: {
                trafficIncidents: true,
                trafficFlow: true
                },
                center: [longitude, latitude ],
                zoom: 15
            });
        })
    });
</script>

<div bind:this={mapElement} class="w-full h-96 rounded-lg border-gray-300 border"></div>