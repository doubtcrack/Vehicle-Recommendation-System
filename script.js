document.getElementById("recommendBtn").addEventListener("click", function () {
  const inputLocationId = parseInt(
    document.getElementById("userLocation").value
  );
  const numOfPassengers = parseInt(
    document.getElementById("numPassengers").value
  );

  // For simplicity, let's assume we have the vehicle data in a JavaScript object as follows:

  const vehicles = {
    100: {
      vehicleNo: "HR-26 0091",
      category: "car",
      passengerCapacity: 4,
      available: true,
      driverContactNo: "090909878",
    },
    201: {
      vehicleNo: "HR-26 7896",
      category: "auto",
      passengerCapacity: 2,
      available: true,
      driverContactNo: "09876534",
    },
    301: {
      vehicleNo: "HR-26 2345",
      category: "car",
      passengerCapacity: 5,
      available: true,
      driverContactNo: "78902564",
    },
    0o11: {
      vehicleNo: "HR-26 8798",
      category: "car",
      passengerCapacity: 4,
      available: false,
      driverContactNo: "987654",
    },
    101: {
      vehicleNo: "HR-26 6754",
      category: "auto",
      passengerCapacity: 2,
      available: false,
      driverContactNo: "78990245",
    },
    110: {
      vehicleNo: "HR-26 7891",
      category: "bike",
      passengerCapacity: 1,
      available: true,
      driverContactNo: "87902453",
    },
    102: {
      vehicleNo: "HR-26 5678",
      category: "bike",
      passengerCapacity: 1,
      available: false,
      driverContactNo: "78902453",
    },
  };

  // Function to calculate distance
  function calculateDistance(loc1, loc2) {
    return Math.abs(loc1 - loc2);
  }

  // Function to recommend the nearest vehicles
  function getRecommendations(inputLocationId, numOfPassengers, vehicles) {
    const distances = [];

    for (const [locationId, vehicle] of Object.entries(vehicles)) {
      if (vehicle.available && vehicle.passengerCapacity >= numOfPassengers) {
        const distance = calculateDistance(
          inputLocationId,
          parseInt(locationId)
        );
        distances.push({ distance, vehicle });
      }
    }

    distances.sort((a, b) => a.distance - b.distance);

    const recommendedVehicles = distances.slice(0, 3);

    const vehicleList = document.getElementById("vehicleList");
    vehicleList.innerHTML = "";
    recommendedVehicles.forEach(({ vehicle }) => {
      const listItem = document.createElement("li");
      listItem.textContent = `${vehicle.vehicleNo}, ${vehicle.category}, ${vehicle.driverContactNo}`;
      vehicleList.appendChild(listItem);
    });

    const outputDiv = document.getElementById("output");
    if (recommendedVehicles.length > 0) {
      outputDiv.classList.remove("hidden");
    } else {
      outputDiv.classList.add("hidden");
    }
  }

  getRecommendations(inputLocationId, numOfPassengers, vehicles);
});
