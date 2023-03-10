import Car from "../Models/car.model.js";
import HTTPError from'../Utils/http-error.js';
import HTTPResponse from "../Utils/http-response.js";
import StatusCodes from "http-status-codes";

 export const createCar = async (req, res, next) => {
  const {model, color, make, registrationNo, category} = req.body;
  let insertedCar = await Car.findOne({$or:[{registrationNo}, {category, make, model}]});
  if(insertedCar){
    return next(new HTTPError('Same Car exists', StatusCodes.CONFLICT))
  }
  let car = new Car({model, color, make, registrationNo, category});
   await car.save();
  res.status(StatusCodes.CREATED).json(new HTTPResponse(car, 'Car added successfully'))
   
};

export const getCars = async (req, res, next) => {
    let allCars = await Car.find({}).populate('category').lean();
  res.send(new HTTPResponse(allCars));
};

export const updateCar = async (req, res, next) => {
  let updatedcar = await Car.findByIdAndUpdate(req.params.id, {name: req.body.name}, {new: true});
  res.status(StatusCodes.OK).send(new HTTPResponse(updatedcar, 'Car updated successfully'));
};

export const deleteCar = async (req, res, next) => {
  let deleteCar = await Car.findByIdAndDelete(req.params.id);
  res.status(StatusCodes.OK).send(new HTTPResponse(deleteCar, 'Car deleted successfully'));
};

