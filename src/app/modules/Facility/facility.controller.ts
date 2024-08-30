import httpStatus from "http-status";
import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import { facilityService } from "./facility.service";

const createFacility = catchAsync(async (req, res) => {
  const result = await facilityService.createFacility(req.body);
  sendResponse(res, {
    success: true,
    message: "Facility added successfully",
    statusCode: httpStatus.CREATED,
    data: result,
  });
});
const updateFacility = catchAsync(async (req, res) => {
  const result = await facilityService.updateFacility(
    req.body,
    req.params.facilityId
  );
  sendResponse(res, {
    success: true,
    message: "Facility updated successfully",
    statusCode: httpStatus.OK,
    data: result,
  });
});
const deleteFacility = catchAsync(async (req, res) => {
  const result = await facilityService.deleteFacility(req.params.facilityId);
  sendResponse(res, {
    success: true,
    message: "Facility deleted successfully",
    statusCode: httpStatus.OK,
    data: result,
  });
});
const getAllFacility = catchAsync(async (req, res) => {
  const result = await facilityService.getAllFacility(req);
  sendResponse(res, {
    success: true,
    message: "Facilities retrieved successfully",
    statusCode: httpStatus.OK,
    data: result,
  });
});
const getSingleFacility = catchAsync(async (req, res) => {
  const result = await facilityService.getSingleFacility(req.params.id);
  sendResponse(res, {
    success: true,
    message: "Facility is retrieved successfully",
    statusCode: httpStatus.OK,
    data: result,
  });
});

export const facilityController = {
  createFacility,
  updateFacility,
  getAllFacility,
  deleteFacility,
  getSingleFacility,
};
