export async function fetchAvailablePlaces() {
    const response = await fetch("http://localhost:3000/places");
    const result = await response.json();

    if(!response.ok) {
        throw new Error("Failed to fetch places.");
    }

    return result.places;
}

export async function fetchUserPlaces() {
    const response = await fetch("http://localhost:3000/places");
    const result = await response.json();

    if(!response.ok) {
        throw new Error("Failed to fetch user places.");
    }

    return result.places;
}

export async function updateUserPlaces(places) {
    const response = await fetch("http://localhost:3000/user-places", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({places}),
    });

    const resData = await response.json();

    if(!response.ok) {
        throw new Error(resData.message || "Failed to update user places.");
    }

    return resData.message;
}