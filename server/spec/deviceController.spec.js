const request = require("supertest");
const app = require("../server");
const industryModel = require("../models/industryModel");
const deviceModel = require("../models/deviceModel");
const mongoose = require("mongoose");

const HTTP_STATUS_OK = 200;
const HTTP_STATUS_CREATED = 201;
const HTTP_STATUS_NOT_FOUND = 404;

// Set up the database connection before running tests
beforeAll(async () => {
  console.log("\n ---------- Device Controller Tests: ---------- \n ");
  await mongoose.disconnect();
  console.log("\n Connecting to Test Database...");

  // Initialize Mongoose with the TEST MongoDB URI
  await mongoose.connect(process.env.TEST_MONGO_URI, { dbName: "testDB" });
});

afterAll(async () => {
  await mongoose.disconnect();
});

const createIndustry = async (industryName) => {
  return industryModel.create({ industryName });
};

const createDevice = async (deviceData) => {
  return deviceModel.create(deviceData);
};

describe("Device Controller Unit Tests", () => {
  beforeEach(async () => {
    // Clear the industry & device collection in the database before each test
    await industryModel.deleteMany({});
    await deviceModel.deleteMany({});
  });

  it("should get all devices", async () => {
    // Create an industry and three devices for testing
    const industry = await createIndustry("Test Industry");
    await createDevice({
      deviceName: "Device 1",
      fee: 100,
      linkedIndustry: industry.industryName,
    });
    await createDevice({
      deviceName: "Device 2",
      fee: 200,
      linkedIndustry: "Test Industry",
    });
    await createDevice({
      deviceName: "Device 3",
      fee: 300,
      linkedIndustry: "Test Industry",
    });

    // Make a GET request to retrieve all devices
    const response = await request(app).get("/api/devices");

    // Verify the response status code and device data
    expect(response.status).toBe(HTTP_STATUS_OK);
    const devices = response.body.devices;
    expect(devices.length).toBe(3);
    expect(devices[0].deviceName).toBe("Device 1");
    expect(devices[0].fee).toBe(100);
  });

  it("should get a single device by ID", async () => {
    // Create an industry and a new device for testing
    const industry = await createIndustry("Test Industry");
    const newDevice = await createDevice({
      deviceName: "New Device",
      fee: 400,
      linkedIndustry: industry.industryName,
    });

    // Make a GET request to retrieve the device by its ID
    const response = await request(app).get(`/api/devices/${newDevice._id}`);

    // Verify the response status code and device data
    expect(response.status).toBe(HTTP_STATUS_OK);
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
    expect(response.status).toBe(HTTP_STATUS_NOT_FOUND);
    expect(response.body.error).toBe("No such device");
  });

  it("should get all devices sorted by fee in descending order", async () => {
    // Create an industry and two devices with different fees
    const industry = await createIndustry("Test Industry");
    await createDevice({
      deviceName: "Device with Fee 100",
      fee: 100,
      linkedIndustry: industry.industryName,
    });
    await createDevice({
      deviceName: "Device with Fee 200",
      fee: 200,
      linkedIndustry: "Test Industry",
    });

    // Make a GET request to retrieve all devices sorted by fee in descending order
    const response = await request(app)
      .get("/api/devices")
      .query({ sort: "fee,desc" });

    // Verify the response status code and device order
    expect(response.status).toBe(HTTP_STATUS_OK);
    const devices = response.body.devices;
    expect(devices[0].fee).toBe(200);
    expect(devices[1].fee).toBe(100);
  });

  // Test case: Retrieve devices with a search query
  it("should get devices with a search query", async () => {
    // Create an industry and two devices with different names
    const industry = await createIndustry("Test Industry");
    await createDevice({
      deviceName: "Test Device 1",
      fee: 100,
      linkedIndustry: industry.industryName,
    });
    await createDevice({
      deviceName: "Device with Keyword",
      fee: 200,
      linkedIndustry: "Test Industry",
    });

    // Make a GET request to retrieve devices with a search query
    const response = await request(app)
      .get("/api/devices")
      .query({ search: "Keyword" });

    // Verify the response status code and device data
    expect(response.status).toBe(HTTP_STATUS_OK);
    const devices = response.body.devices;
    expect(devices.length).toBe(1);
    expect(devices[0].deviceName).toEqual("Device with Keyword");
    expect(devices[0].fee).toEqual(200);
  });

  it("should get devices with pagination (page and limit)", async () => {
    // Create an industry and multiple test devices
    const industry = await createIndustry("Test Industry");
    await createDevice({
      deviceName: "Test Device 1",
      fee: 100,
      linkedIndustry: industry.industryName,
    });
    await createDevice({
      deviceName: "Test Device 2",
      fee: 200,
      linkedIndustry: "Test Industry",
    });
    await createDevice({
      deviceName: "Test Device 3",
      fee: 300,
      linkedIndustry: "Test Industry",
    });

    // Make a GET request to retrieve devices with pagination
    const response = await request(app)
      .get("/api/devices")
      .query({ page: 2, limit: 1 });

    // Verify the response status code and device data
    expect(response.status).toBe(HTTP_STATUS_OK);
    const devices = response.body.devices;
    expect(devices.length).toBe(1);
    expect(devices[0].deviceName).toBe("Test Device 2");
  });

  it("should get devices filtered by linkedIndustry", async () => {
    // Create two industries and devices with different linked industries
    const industry1 = await createIndustry("Test Industry 1");
    const industry2 = await createIndustry("Test Industry 2");
    await createDevice({
      deviceName: "Device in Industry 1",
      fee: 100,
      linkedIndustry: industry1.industryName,
    });
    await createDevice({
      deviceName: "Device in Industry 2",
      fee: 200,
      linkedIndustry: industry2.industryName,
    });

    // Make a GET request to retrieve devices filtered by linkedIndustry
    const response = await request(app)
      .get("/api/devices")
      .query({ linkedIndustry: industry2.industryName });

    // Verify the response status code and device data
    expect(response.status).toBe(HTTP_STATUS_OK);
    const devices = response.body.devices;
    expect(devices.length).toBe(1);
    expect(devices[0].deviceName).toEqual("Device in Industry 2");
    expect(devices[0].fee).toEqual(200);
  });

  it("should create a new device", async () => {
    // Create an industry for the new device
    const industry = await createIndustry("Test Industry");

    // Define the data for the new device
    const deviceData = {
      deviceName: "Test Device",
      fee: 100,
      linkedIndustry: industry.industryName,
    };

    // Make a POST request to create a new device
    const response = await request(app).post("/api/devices").send(deviceData);

    // Verify the response status code and device data
    expect(response.status).toBe(HTTP_STATUS_CREATED);
    expect(response.body.deviceName).toBe("Test Device");
    expect(response.body.fee).toBe(100);

    // Ensure the created device exists in the database
    const createdDevice = await deviceModel.findById(response.body._id);
    expect(createdDevice).toBeTruthy();
  });

  it("should update an existing device", async () => {
    // Create an industry for the existing device
    const industry = await createIndustry("Test Industry");

    // Create an existing device in the database
    const existingDevice = await createDevice({
      deviceName: "Existing Device",
      fee: 200,
      linkedIndustry: industry.industryName,
    });

    // Define the updated data for the existing device
    const updatedData = {
      deviceName: "Updated Device",
      fee: 150,
    };

    // Make a PATCH request to update the existing device
    const response = await request(app)
      .patch(`/api/devices/${existingDevice._id}`)
      .send(updatedData);

    // Verify the response status code
    expect(response.status).toBe(HTTP_STATUS_OK);

    // Ensure the device in the test database is updated
    const updatedDevice = await deviceModel.findById(existingDevice._id);
    expect(updatedDevice).toBeTruthy();
    expect(updatedDevice.deviceName).toBe(updatedData.deviceName);
    expect(updatedDevice.fee).toBe(updatedData.fee);
  });

  it("should delete an existing device", async () => {
    // Create an existing device in the database
    const existingDevice = await createDevice({
      deviceName: "Device to Delete",
      fee: 300,
      linkedIndustry: "Test Industry",
    });

    // Make a DELETE request to delete the existing device
    const response = await request(app).delete(
      `/api/devices/${existingDevice._id}`
    );

    // Verify the response status code and device data
    expect(response.status).toBe(HTTP_STATUS_OK);
    expect(response.body.deviceName).toBe("Device to Delete");
    expect(response.body.fee).toBe(300);

    // Ensure the device is deleted from the database
    const deletedDevice = await deviceModel.findById(existingDevice._id);
    expect(deletedDevice).toBeNull();
  });
});
