<template>
    <div>
      <div ref="map" style="height: 400px;"></div>
    </div>
</template>
  
<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { Loader, LatLngLiteral } from '@googlemaps/js-api-loader';
import dotenv from 'dotenv'
dotenv.config()

const mapRef = ref<google.maps.Map | null>(null);
const loader = new Loader({
  apiKey: process.env.VUE_APP_GOOGLE_MAPS_KEY,
});

onMounted(async () => {
  await loader.load();

  const map = new google.maps.Map(mapRef.value!, {
    center: { lat: 37.7749, lng: -122.4194 },
    zoom: 12,
  });

  const marker = new google.maps.Marker({
    map,
    draggable: true,
  });

  const geocoder = new google.maps.Geocoder();

  // When the user clicks on the map, update the marker position and geocode the location
  google.maps.event.addListener(map, 'click', (event: google.maps.MouseEvent) => {
    marker.setPosition(event.latLng);
    geocoder.geocode({ location: event.latLng }, (results, status) => {
      if (status === 'OK') {
        console.log(results[0].formatted_address);
        // You can do something with the address here, such as save it to a database
      }
    });
  });

  mapRef.value = map;
});

</script>







