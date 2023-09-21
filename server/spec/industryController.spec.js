const request = require("supertest");
const app = require("../server");
const industryModel = require("../models/industryModel");
const mongoose = require("mongoose");

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
    expect(response.status).toBe(201);
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
});
