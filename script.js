// Vehicle data
const vehicles = [
  {
    locationId: 100,
    vehicleNo: "HR-26 0091",
    category: "car",
    numPassengers: 4,
    available: true,
    driverContactNo: 90909878,
  },
  {
    locationId: 201,
    vehicleNo: "HR-26 7896",
    category: "auto",
    numPassengers: 2,
    available: true,
    driverContactNo: 9876534,
  },
  {
    locationId: 301,
    vehicleNo: "HR-26 2345",
    category: "car",
    numPassengers: 5,
    available: true,
    driverContactNo: 78902564,
  },
  {
    locationId: 0o11,
    vehicleNo: "HR-26 8798",
    category: "car",
    numPassengers: 4,
    available: false,
    driverContactNo: 987654,
  },
  {
    locationId: 101,
    vehicleNo: "HR-26 6754",
    category: "auto",
    numPassengers: 2,
    available: false,
    driverContactNo: 78990245,
  },
  {
    locationId: 110,
    vehicleNo: "HR-26 7891",
    category: "bike",
    numPassengers: 1,
    available: true,
    driverContactNo: 87902453,
  },
  {
    locationId: 102,
    vehicleNo: "HR-26 5678",
    category: "bike",
    numPassengers: 1,
    available: false,
    driverContactNo: 78902453,
  },
];

// Calculate Euclidean distance
function calculateDistance(loc1, loc2) {
  return Math.pow(loc1 - loc2, 2);
}

// Recommend nearest vehicles based on user input
function recommendNearestVehicles(userLocation, numPassengers) {
  const availableVehicles = vehicles.filter(
    (vehicle) => vehicle.available && vehicle.numPassengers >= numPassengers
  );

  availableVehicles.sort(
    (a, b) =>
      calculateDistance(userLocation, a.locationId) -
      calculateDistance(userLocation, b.locationId)
  );

  return availableVehicles.slice(0, 3);
}

// Display the recommended vehicles in the UI
function showRecommendations() {
  const userLocation = parseInt(document.getElementById("userLocation").value);
  const numPassengers = parseInt(
    document.getElementById("numPassengers").value
  );
  const vehicleList = document.getElementById("vehicleList");
  const outputDiv = document.getElementById("output");

  const recommendedVehicles = recommendNearestVehicles(
    userLocation,
    numPassengers
  );

  // Clear previous recommendations
  vehicleList.innerHTML = "";

  if (recommendedVehicles.length > 0) {
    outputDiv.classList.remove("hidden");
    for (const vehicle of recommendedVehicles) {
      const listItem = document.createElement("li");
      listItem.textContent = `${vehicle.vehicleNo}, ${vehicle.category}, ${vehicle.driverContactNo}`;
      vehicleList.appendChild(listItem);
    }
  } else {
    outputDiv.classList.add("hidden");
  }
}

document
  .getElementById("recommendBtn")
  .addEventListener("click", showRecommendations);
