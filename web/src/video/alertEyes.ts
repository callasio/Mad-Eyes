const alertUrl = "http://127.0.0.1:3478"

export async function sendAlert() {
  try {
    const response = await fetch(alertUrl);
  } catch (error) {
    console.log('Error fetching alert:', error);
  }
}