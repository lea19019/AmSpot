

<!-- CODE WAS INCOMPLETE -->


<!-- There are a few different ways you can display your location and the closest locations on a Google Maps map using Vue 3. Here are a few approaches you could take:

Calculate distances and sort the locations: One approach is to calculate the distance between your location and each of the other locations in the list, sort the list based on distance, and display the closest locations on the map. Here's an example of how you could implement this: -->



<!-- 

<template>
    <div>
      <div ref="map" style="height: 400px;"></div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted } from 'vue';
  
  export default {
    name: 'LocationMap',
  
    props: {
      locations: Array,
      distance: Number,
    },
  
    setup(props) {
      const map = ref(null);
  
      // Load the Google Maps JavaScript API
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${YOUR_API_KEY}&libraries=places`;
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);
  
      // Initialize the map and center it on the user's location
      onMounted(() => {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            const center = new google.maps.LatLng(latitude, longitude);
  
            const mapInstance = new google.maps.Map(map.value, {
              center,
              zoom: 15,
            });
  
            // Add a marker for the user's location
            const userMarker = new google.maps.Marker({
              position: center,
              map: mapInstance,
              title: 'Your Location',
            });
  
            // Calculate the distances between the user's location and each of the locations in the list
            const distances = props.locations.map((location) => {
              const locationCoords = new google.maps.LatLng(
                location.latitude,
                location.longitude
              );
              const distance = google.maps.geometry.spherical.computeDistanceBetween(
                center,
                locationCoords
              );
              return { ...location, distance };
            });
  
            // Sort the locations by distance
            distances.sort((a, b) => a.distance - b.distance);
  
            // Add markers for the closest locations to the map
            distances
              .filter((location) => location.distance <= props.distance)
              .forEach((location) => {
                const marker = new google.maps.Marker({
                  position: new google.maps.LatLng(
                    location.latitude,
                    location.longitude
                  ),
                  map: mapInstance,
                  title: location.name,
                });
              });
          },
          (error) => {
            console.error(`Error getting current location: ${error.message}`);
          }
        );
      });
  
      return {
        map,
      };
    },
  };
  </script>
   -->

<!-- 

   This component takes a list of locations and a distance parameter as props. It loads the Google Maps JavaScript API and initializes the map as before, and adds a marker for the user's location. It then calculates the distances between the user's location and each of the locations in the list, sorts the list by distance, and adds markers for the closest locations on the map.

Use a third-party library: Another approach is to use a third-party library that provides distance calculations and/or clustering functionality for Google Maps. For example, you could use the vue2-google-maps library, which provides a Vue 3 wrapper around the Google Maps JavaScript API and includes built-in support for calculating distances and clustering markers. Here's an example of how you could use this library: -->


<!-- <template>
    <div>
      <GmapMap
        ref="map"
        :center -->
  