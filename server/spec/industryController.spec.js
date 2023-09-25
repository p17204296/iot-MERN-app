const request = require("supertest");
const app = require("../server");
const industryModel = require("../models/industryModel");
const mongoose = require("mongoose");

const HTTP_STATUS_OK = 200;
const HTTP_STATUS_CREATED = 201;
const HTTP_STATUS_NOT_FOUND = 404;

beforeAll(async () => {
  console.log("\n ---------- Industry Controller Tests: ---------- \n ");
  await mongoose.disconnect();
  console.log("\n Connecting to Test Database...");

  // Initialize Mongoose with the test MongoDB URI
  await mongoose.connect(process.env.TEST_MONGO_URI, { dbName: "testDB" });
});

afterAll(async () => {
  // Close the Mongoose connection and stop the MongoDB server
  await mongoose.disconnect();
});

describe("Industry Controller Unit Tests", () => {
  beforeEach(async () => {
    // Clear the industry collection in the database before each test
    await industryModel.deleteMany({});
  });

  it("should create a new industry", async () => {
    // Create a test industry object
    const industryData = {
      industryName: "Test Industry",
    };

    // Make a POST request to create a new industry
    const response = await request(app)
      .post("/api/industries")
      .send(industryData);

    // Verify the response status code and structure
    expect(response.status).toBe(HTTP_STATUS_CREATED);
    expect(response.body.industryName).toBe("Test Industry");

    // Ensure the created industry exists in the database
    const createdIndustry = await industryModel.findById(response.body._id);
    expect(createdIndustry).toBeTruthy();
  });

  it("should update an existing industry", async () => {
    // Create an existing industry in the database
    const existingIndustry = await industryModel.create({
      industryName: "Existing Industry",
    });

    // Update data for the existing industry
    const updatedData = {
      industryName: "Updated Industry",
    };

    // Make a PATCH request to update the existing industry
    const response = await request(app)
      .patch(`/api/industries/${existingIndustry._id}`)
      .send(updatedData);

    // Verify the response status code
    expect(response.status).toBe(200);

    // Ensure the industry in the database is updated
    const updatedIndustry = await industryModel.findById(existingIndustry._id);
    expect(updatedIndustry).toBeTruthy();
    expect(updatedIndustry.industryName).toBe("Updated Industry");
  });

  it("should delete an existing industry", async () => {
    // Create an existing industry in the database
    const existingIndustry = await industryModel.create({
      industryName: "Industry to Delete",
    });

    // Make a DELETE request to delete the existing industry
    const response = await request(app).delete(
      `/api/industries/${existingIndustry._id}`
    );

    // Verify the response status code and structure
    expect(response.status).toBe(200);
    expect(response.body.industryName).toBe("Industry to Delete");

    // Ensure the industry is deleted from the database
    const deletedIndustry = await industryModel.findById(existingIndustry._id);
    expect(deletedIndustry).toBeNull();
  });

  it("should get a single industry by ID", async () => {
    // Create a test industry
    const industryData = {
      industryName: "Test Industry",
    };
    const createdIndustry = await industryModel.create(industryData);

    // Make a GET request to retrieve the industry by its ID
    const response = await request(app).get(
      `/api/industries/${createdIndustry._id}`
    );

    // Verify the response status code and industry data
    expect(response.status).toBe(HTTP_STATUS_OK);
    expect(response.body.industryName).toBe("Test Industry");
  });

  it("should return a 404 error when getting a non-existent industry by ID", async () => {
    // Attempt to retrieve a non-existent industry by ID
    const nonExistentIndustryId = mongoose.Types.ObjectId();
    const response = await request(app).get(
      `/api/industries/${nonExistentIndustryId}`
    );

    // Verify the response status code and error message
    expect(response.status).toBe(HTTP_STATUS_NOT_FOUND);
    expect(response.body.error).toBe("No such industry");
  });

  it("should get all industries sorted by industryName in ascending order", async () => {
    // Create multiple test industries with different names
    await industryModel.create({ industryName: "Zebra Industry" });
    await industryModel.create({ industryName: "Apple Industry" });

    // Make a GET request to retrieve all industries sorted by industryName in ascending order
    const response = await request(app)
      .get("/api/industries")
      .query({ sort: "industryName,asc" });

    // Verify the response status code and industry order
    expect(response.status).toBe(HTTP_STATUS_OK);
    const industries = response.body.industries;
    expect(industries[0].industryName).toBe("Apple Industry");
    expect(industries[1].industryName).toBe("Zebra Industry");
  });

  it("should get industries with pagination (page and limit)", async () => {
    // Create multiple test industries
    await industryModel.create({ industryName: "Industry 1" });
    await industryModel.create({ industryName: "Industry 2" });
    await industryModel.create({ industryName: "Industry 3" });

    // Make a GET request to retrieve industries with pagination
    const response = await request(app)
      .get("/api/industries")
      .query({ page: 2, limit: 1 });

    // Verify the response status code and industry data
    expect(response.status).toBe(HTTP_STATUS_OK);
    const industries = response.body.industries;
    expect(industries.length).toBe(1);
    expect(industries[0].industryName).toBe("Industry 2");
  });
});
