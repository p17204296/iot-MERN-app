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

  it("should get all devices", async () => {
    // Create a new industry to link with the device
    const industry = await industryModel.create({
      industryName: "Test Industry",
    });
    // Create some test devices in the database
    const device1 = await deviceModel.create({
      deviceName: "Device 1",
      fee: 100,
      linkedIndustry: industry.industryName,
    });
    const device2 = await deviceModel.create({
      deviceName: "Device 2",
      fee: 200,
      linkedIndustry: "Test Industry",
    });
    const device3 = await deviceModel.create({
      deviceName: "Device 3",
      fee: 300,
      linkedIndustry: "Test Industry",
    });

    // Make a GET request to retrieve all devices
    const response = await request(app).get("/api/devices");

    // Verify the response status code and the number of devices returned
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body.devices)).toBe(true);
    expect(response.body.devices.length).toBe(3);

    // Verify the content of the first device in the response
    expect(response.body.devices[0].deviceName).toBe("Device 1");
    expect(response.body.devices[0].fee).toBe(100);
  });

  it("should get a single device by ID", async () => {
    // Create a new industry to link with the device
    const industry = await industryModel.create({
      industryName: "Test Industry",
    });
    // Create a new device in the database
    const newDevice = await deviceModel.create({
      deviceName: "New Device",
      fee: 400,
      linkedIndustry: industry.industryName,
    });

    // Make a GET request to retrieve the device by its ID
    const response = await request(app).get(`/api/devices/${newDevice._id}`);

    // Verify the response status code and the device data
    expect(response.status).toBe(200);
    expect(response.body.deviceName).toBe("New Device");
    expect(response.body.fee).toBe(400);
  });

  it("should return a 404 error when getting a non-existent device by ID", async () => {
    // Attempt to retrieve a non-existent device by ID
    const nonExistentDeviceId = mongoose.Types.ObjectId();
    const response = await request(app).get(
      `/api/devices/${nonExistentDeviceId}`
    );

    // Verify the response status code and error message
    expect(response.status).toBe(404);
    expect(response.body.error).toBe("No such device");
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
    const industry = await industryModel.create({
      industryName: "Test Industry",
    });

    // Create an existing device in the database
    const existingDevice = await deviceModel.create({
      deviceName: "Existing Device",
      fee: 200,
      linkedIndustry: industry.industryName,
    });

    // Update data for the existing device
    const updatedData = {
      deviceName: "Updated Device",
      fee: 150,
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
