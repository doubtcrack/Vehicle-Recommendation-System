#include<bits/stdc++.h>
using namespace std;

// this function finds Distance; takes location ID as loc1 and loc2
double calculateDistance(int loc1, int loc2) {
    return abs(loc1-loc2); //It doesn't matter if we square it or not, as We just want minimum 3 distances out of all.
}

//Step 1 : Stores all the information about the vehicle.
struct Vehicle {
    string vehicleNo;
    string category;
    int passengerCapacity;
    bool available;
    string driverContactNo;
};


//Step-2 : Function that will return the vehicles
// This function will return the 3 vehicles as per the problem.
void getRecommendations(int inputLocationId, int numOfPassengers, unordered_map<int, Vehicle>& vehicles) {
    
    //Using priority queue, Because It will save our time to find nearest vehicles. We can use 2d vector to store all the distance and then sort it.
    priority_queue<pair<int,int>> distances;
    
    
    for (auto& vehiclePair : vehicles) {
        int locationId = vehiclePair.first;
        Vehicle& vehicle = vehiclePair.second;

        //If vehichle is not present or It has not required capacity then we should recommend the vehicle
        if (vehicle.available && vehicle.passengerCapacity >= numOfPassengers) {  
            double distance = calculateDistance(inputLocationId, locationId);
            distances.push(make_pair(distance, locationId));

            if(distances.size()>3){   //For optimising the space; we will need only 3 nearest vehicles
                distances.pop();
            }

        }
    }

    while(!distances.empty()){
        int nearestVehicle = distances.top().second;
        distances.pop();
        Vehicle v1 = vehicles.at(nearestVehicle);
        cout << v1.vehicleNo << ", " << v1.category << ", " << v1.driverContactNo << endl; //printing the results inside the function as mentioned in problem statement
    }
}

int main()
{

    unordered_map<int, Vehicle> vehicles = {
        {100, {"HR-26 0091", "car", 4, true, "090909878"}},
        {201, {"HR-26 7896", "auto", 2, true, "09876534"}},
        {301, {"HR-26 2345", "car", 5, true, "78902564"}},
        {011, {"HR-26 8798", "car", 4, false, "987654"}},
        {101, {"HR-26 6754", "auto", 2, false, "78990245"}},
        {110, {"HR-26 7891", "bike", 1, true, "87902453"}},
        {102, {"HR-26 5678", "bike", 1, false, "78902453"}},
    };

    // Taking Input
    int inputLocationId, numOfPassengers;
    cout << "Enter your location ID and number of passengers: ";
    cin >> inputLocationId >> numOfPassengers;

    // As mentioned, the function which will recommend and print the results.
    getRecommendations(inputLocationId, numOfPassengers, vehicles);
    return 0;
}
