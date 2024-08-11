import httpStatus from "http-status";
import AppError from "../../errors/appError";
import { TFacility } from "./facility.interface";
import { Facility } from "./facility.model";

const createFacility = async (payload: TFacility) => {
  const result = await Facility.create(payload);
  return result;
};

const updateFacility = async (payload: Partial<TFacility>, id: string) => {
  const result = await Facility.findByIdAndUpdate(id, payload, {
    new: true,
  });
  return result;
};
const deleteFacility = async (id: string) => {
  const result = await Facility.findByIdAndUpdate(
    id,
    {
      isDeleted: true,
    },
    {
      new: true,
    }
  );
  return result;
};

const getAllFacility = async () => {
  const result = await Facility.find();
  if (result.length === 0) {
    throw new AppError(httpStatus.NOT_FOUND, "No data found");
  }
  return result;
};
export const facilityService = {
  createFacility,
  updateFacility,
  getAllFacility,
  deleteFacility,
};
