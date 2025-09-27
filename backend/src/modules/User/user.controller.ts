import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { UserServices } from './user.service';


const getSingleUser = catchAsync(async (req, res) => {
    const result = await UserServices.getingSigleuser(req.params.id);
    const isOk = result ? true : false;
    sendResponse(res, {
        statusCode: isOk ? 200 : 400,
        success: isOk,
        message: isOk ? 'Successfully get all User' : 'Failed to get all User',
        Data: isOk ? result : [],
    });
});

const deleteUser = catchAsync(async (req, res) => {
    const result = await UserServices.deleteduser(req.params.id);
    const isOk = result ? true : false;
    sendResponse(res, {
        statusCode: isOk ? 200 : 400,
        success: isOk,
        message: isOk ? 'Successfully Deleted User' : 'Failed to Delete User',
        Data: isOk ? result : [],
    });
});


const updateProfile = catchAsync(async (req, res) => {

    const file = req.file as Express.Multer.File;
    const result = await UserServices.updateProfile(file, req.params.id, req.body);
    const isOk = result ? true : false;
    sendResponse(res, {
        statusCode: isOk ? 200 : 400,
        success: isOk,
        message: isOk ? 'Successfully Updated Your Profile' : 'Failed to Update Profile',
        Data: isOk ? result : [],
    });

})


const getAllUser = catchAsync(async (req, res) => {
    const result = await UserServices.getAllUser();
    const isOk = result ? true : false;
    sendResponse(res, {
        statusCode: isOk ? 200 : 400,
        success: isOk,
        message: isOk ? 'Successfully Retruved All User' : 'Failed to Retrived All User',
        Data: isOk ? result : [],
    });
})



export const UserController = {
    getSingleUser,
    deleteUser,
    updateProfile,
    getAllUser,

};