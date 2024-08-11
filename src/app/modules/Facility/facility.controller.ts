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

export const facilityController = {
  createFacility,
};
