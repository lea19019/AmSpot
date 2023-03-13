<!-- <template>
    <div>
      <div ref="map" style="height: 400px;"></div>
      <input type="text" v-model="location" placeholder="Enter a location" />
      <p>Address: {{ address }}</p>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted } from 'vue';
  
  let location = ref('');
  let address = ref('');
  let map;
  
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
  
        map = new google.maps.Map($refs.map, {
          center,
          zoom: 15,
        });
  
        const marker = new google.maps.Marker({
          position: center,
          map,
          draggable: true,
        });
  
        // Listen for the marker's 'dragend' event to get the updated location
        marker.addListener('dragend', () => {
          const newLocation = marker.getPosition();
          // Convert the location's latitude and longitude into a formatted address
          const geocoder = new google.maps.Geocoder();
          geocoder.geocode({ location: newLocation }, (results, status) => {
            if (status === 'OK') {
              address.value = results[0].formatted_address;
            }
          });
        });
      },
      (error) => {
        console.error(`Error getting current location: ${error.message}`);
      }
    );
  });
  
  // Initialize the Autocomplete service and attach it to the input field
  const input = document.querySelector('input');
  const autocomplete = new google.maps.places.Autocomplete(input);
  
  // Listen for the 'place_changed' event to get the selected place's details
  autocomplete.addListener('place_changed', () => {
    // Get the selected place's details
    const place = autocomplete.getPlace();
  
    // Extract the formatted address from the place object
    const formattedAddress = place.formatted_address;
  
    // Store the address in the component's state
    address.value = formattedAddress;
  
    // Center the map on the selected place's location
    const location = place.geometry.location;
    map.setCenter(location);
  });
  </script>
   -->