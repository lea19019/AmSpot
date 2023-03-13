<!-- ASKED FOR COMPOSITION API BUT GAVE IT WITH OPTIONS API STRUCTURE -->


<!-- Sure, here's the first solution using Composition API: -->

<!-- <template>
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
</script> -->




<!-- And here's an example of how you could use the vue2-google-maps library to display your location and the closest locations: -->

<!-- <template>
  <div>
    <gmap-map
      :center="userLocation"
      :zoom="15"
      :options="{ zoomControl: true, streetViewControl: false }"
      @center_changed="onCenterChanged"
    >
      <gmap-marker
        :position="userLocation"
        :title="'Your Location'"
        icon="http://maps.google.com/mapfiles/kml/pal2/icon2.png"
      />
      <gmap-marker
        v-for="location in closestLocations"
        :key="location.id"
        :position="{ lat: location.latitude, lng: location.longitude }"
        :title="location.name"
        icon="http://maps.google.com/mapfiles/kml/pal2/icon2.png"
      />
    </gmap-map>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { gmapApi } from 'vue2-google-maps';

export default {
  name: 'LocationMap',

  props: {
    locations: Array,
    distance: Number,
  },

  setup(props) {
    const userLocation = ref(null);
    const closestLocations = computed(() => {
      if (!userLocation.value) {
        return [];
      }
      return props.locations
        .map((location) => {
          const locationCoords = new gmapApi.LatLng(
            location.latitude,
            location.longitude
          );
          const distance = gmapApi.geometry.spherical.computeDistanceBetween(
            userLocation.value,
            locationCoords
          );
          return { ...location, distance };
        })
        .filter((location) => location.distance <= props.distance)
        .sort((a, b) => a.distance - b.distance);
    });

    const onCenterChanged = () => {
      userLocation.value = this.$refs.mapObject.getCenter();
    };

    return {
      userLocation,
      closestLocations,
      onCenterChanged,
    };
  },
};
</script> -->


<!-- 
Note that this solution uses the computed function to automatically calculate the closest locations whenever the user location or the list of locations changes. It also uses the gmapApi object provided by the vue2-google-maps library to calculate distances and create markers. -->