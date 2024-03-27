import UserFacade from "../DP/userFacade";

const handleLogin = async (req, res) => {
    try {
        const { taikhoan, password } = req.body;
        if (!taikhoan || !password) {
            return res.status(400).json({
                errcode: 1,
                message: 'Vui lòng điền đầy đủ thông tin',
            });
        }
        const userData = await UserFacade.handleUserLogin(taikhoan, password);
        return res.status(200).json({
            errcode: userData.errcode,
            message: userData.errMessage,
            user: userData.user ? userData.user : {},
        });
    } catch (error) {
        console.error('Error in handleLogin:', error);
        return res.status(500).json({
            errcode: 1,
            errMessage: 'Internal server error',
        });
    }
};

const handleGetAllUser = async (req, res) => {
    try {
        const id = req.query.id || 'all';
        if (id === 'all') {
            return res.status(400).json({
                errcode: 1,
                errMessage: 'Missing require parameters',
                users: [],
            });
        }
        const users = await UserFacade.getAllUsers(id);
        return res.status(200).json({
            errcode: 0,
            errMessage: 'OK',
            users,
        });
    } catch (error) {
        console.error('Error in handleGetAllUser:', error);
        return res.status(500).json({
            errcode: 1,
            errMessage: 'Internal server error',
        });
    }
};

const handleCreateNewUser = async (req, res) => {
    try {
        const message = await UserFacade.CreateNewUser(req.body);
        console.log(message);
        return res.status(200).json(message);
    } catch (error) {
        console.error('Error in handleCreateNewUser:', error);
        return res.status(500).json({
            errcode: 1,
            errMessage: 'Internal server error',
        });
    }
};

const handleDeleteUser = async (req, res) => {
    try {
        const { id } = req.body;
        if (!id) {
            return res.status(400).json({
                errcode: 1,
                errMessage: 'Missing required parameters!',
            });
        }
        const message = await UserFacade.deleteUser(id);
        console.log(message);
        return res.status(200).json(message);
    } catch (error) {
        console.error('Error in handleDeleteUser:', error);
        return res.status(500).json({
            errcode: 1,
            errMessage: 'Internal server error',
        });
    }
};

const handleEditUser = async (req, res) => {
    try {
        const data = req.body;
        const message = await UserFacade.updateUserData(data);
        return res.status(200).json(message);
    } catch (error) {
        console.error('Error in handleEditUser:', error);
        return res.status(500).json({
            errcode: 1,
            errMessage: 'Internal server error',
        });
    }
};

const getAllCode = async (req, res) => {
    try {
        const { type } = req.query;
        if (!type) {
            return res.status(400).json({
                errcode: 1,
                errMessage: 'Missing required parameters!',
            });
        }
        const data = await UserFacade.getAllCodeService(type);
        return res.status(200).json(data);
    } catch (error) {
        console.error('Error in getAllCode:', error);
        return res.status(500).json({
            errcode: -1,
            errMessage: 'Error from server',
        });
    }
};

module.exports = {
    handleLogin,
    handleGetAllUser,
    handleCreateNewUser,
    handleEditUser,
    handleDeleteUser,
    getAllCode,
};
