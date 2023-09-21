const request = require("supertest");
const app = require("../server");
const industryModel = require("../models/industryModel");
const deviceModel = require("../models/deviceModel");
const mongoose = require("mongoose");

beforeAll(async () => {
  console.log("\n ---------- Device Controller Tests: ---------- \n ");
  await mongoose.disconnect();
  console.log("\n Connecting to Test Database...");

  // Initialize Mongoose with the TEST MongoDB URI
  await mongoose.connect(process.env.TEST_MONGO_URI, { dbName: "testDB" });
});

afterAll(async () => {
  // Close the Mongoose connection and stop the MongoDB server
  await mongoose.disconnect();
});

describe("Device Controller Unit Tests", () => {
  beforeEach(async () => {
    // Clear the industry & device collection in the database before each test
    await industryModel.deleteMany({});
    await deviceModel.deleteMany({});
  });

  it("should create a new device", async () => {
    // Create a new industry to link with the device
    const industry = await industryModel.create({
      industryName: "Test Industry",
    });

    // Create a test device object
    const deviceData = {
      deviceName: "Test Device",
      fee: 100,
      linkedIndustry: industry.industryName,
    };

    // Make a POST request to create a new device
    const response = await request(app).post("/api/devices").send(deviceData);

    // Verify the response status code and structure
    expect(response.status).toBe(201);
    expect(response.body.deviceName).toBe("Test Device");
    expect(response.body.fee).toBe(100);

    // Ensure the created device exists in the database
    const createdDevice = await deviceModel.findById(response.body._id);
    expect(createdDevice).toBeTruthy();
  });

  it("should update an existing device", async () => {
    // Create an existing device in the database
    const existingDevice = await deviceModel.create({
      deviceName: "Existing Device",
      fee: 200,
      linkedIndustry: "Test Industry",
    });

    // Update data for the existing device
    const updatedData = {
      deviceName: "Updated Device!!",
      fee: 1510,
    };

    // Make a PATCH request to update the existing device
    const response = await request(app)
      .patch(`/api/devices/${existingDevice._id}`)
      .send(updatedData);

    // Verify the response status code
    expect(response.status).toBe(200);

    // Ensure the device in the test database is updated
    const updatedDevice = await deviceModel.findById(existingDevice._id);
    expect(updatedDevice).toBeTruthy();
    expect(updatedDevice.deviceName).toBe(updatedData.deviceName);
    expect(updatedDevice.fee).toBe(updatedData.fee);
  });

  it("should delete an existing device", async () => {
    // Create an existing device in the database
    const existingDevice = await deviceModel.create({
      deviceName: "Device to Delete",
      fee: 300,
      linkedIndustry: "Test Industry",
    });

    // Make a DELETE request to delete the existing device
    const response = await request(app).delete(
      `/api/devices/${existingDevice._id}`
    );

    // Verify the response status code and structure
    expect(response.status).toBe(200);
    expect(response.body.deviceName).toBe("Device to Delete");
    expect(response.body.fee).toBe(300);

    // Ensure the device is deleted from the database
    const deletedDevice = await deviceModel.findById(existingDevice._id);
    expect(deletedDevice).toBeNull();
  });
});
