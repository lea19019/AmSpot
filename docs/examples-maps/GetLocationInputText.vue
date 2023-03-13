<!-- <template>
    <div>
      <input type="text" v-model="location" placeholder="Enter a location" />
      <p>Address: {{ address }}</p>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  
  let location = ref('');
  let address = ref('');
  
  // Load the Google Maps JavaScript API
  const script = document.createElement('script');
  script.src = `https://maps.googleapis.com/maps/api/js?key=${YOUR_API_KEY}&libraries=places`;
  script.async = true;
  script.defer = true;
  document.head.appendChild(script);
  
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
  });
  </script>
   -->