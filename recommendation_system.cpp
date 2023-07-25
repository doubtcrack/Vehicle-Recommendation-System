#include <iostream>
#include <vector>
#include <algorithm>
#include <cmath>
 using namespace std;
struct Vehicle {
    int locationId;
    string vehicleNo;
    string category;
    int numPassengers;
    bool available;
    long long driverContactNo;
};

double calculateDistance(int loc1, int loc2) {
    return pow(loc1 - loc2, 2);
}

vector<Vehicle> recommendNearestVehicles(const vector<Vehicle>& vehicles, int userLocation, int numPassengers) {
    vector<Vehicle> availableVehicles;

    for (const auto& vehicle : vehicles) {
        if (vehicle.available && vehicle.numPassengers >= numPassengers) {
            availableVehicles.push_back(vehicle);
        }
    }

    sort(availableVehicles.begin(), availableVehicles.end(),
              [userLocation](const Vehicle& a, const Vehicle& b) {
                  return calculateDistance(userLocation, a.locationId) < calculateDistance(userLocation, b.locationId);
              });

    size_t numRecommendations = min(3, static_cast<int>(availableVehicles.size()));
    return vector<Vehicle>(availableVehicles.begin(), availableVehicles.begin() + numRecommendations);
}

void addVehicle(vector<Vehicle>& vehicles, int locationId, string vehicleNo, string category, int numPassengers, bool available, long long driverContactNo) {
    vehicles.push_back({locationId, vehicleNo, category, numPassengers, available, driverContactNo});
}

int main() {
    vector<Vehicle> vehicles;

    // Add vehicle information to the dataset
    addVehicle(vehicles, 100, "HR-26 0091", "car", 4, true, 90909878);
    addVehicle(vehicles, 201, "HR-26 7896", "auto", 2, true, 9876534);
    addVehicle(vehicles, 301, "HR-26 2345", "car", 5, true, 78902564);
    addVehicle(vehicles, 011, "HR-26 8798", "car", 4, false, 987654);
    addVehicle(vehicles, 101, "HR-26 6754", "auto", 2, false, 78990245);
    addVehicle(vehicles, 110, "HR-26 7891", "bike", 1, true, 87902453);
    addVehicle(vehicles, 102, "HR-26 5678", "bike", 1, false, 78902453);

    int userLocation,numPassengers;
    
    cout<<"Enter your Location Id and total number of passengers:\n";
    cin>>userLocation, numPassengers;

    vector<Vehicle> recommendedVehicles = recommendNearestVehicles(vehicles, userLocation, numPassengers);

    // Output the recommended vehicles
    for (const auto& vehicle : recommendedVehicles) {
        cout << vehicle.vehicleNo << ", " << vehicle.category << ", " << vehicle.driverContactNo << endl;
    }

    return 0;
}
