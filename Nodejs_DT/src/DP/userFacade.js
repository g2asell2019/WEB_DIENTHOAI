// userFacade.js

import bcryptjs from 'bcryptjs';
import UserService from "../services/userServices";

class UserFacade {
  async login(username, password) {
    return await UserService.handleUserLogin(username, password);
  }

  async getAllUsers(userId) {
    return await UserService.getAllUsers(userId);
  }

  async createNewUser(userData) {
    return await UserService.CreateNewUser(userData);
  }

  async deleteUser(userId) {
    return await UserService.deleteUser(userId);
  }

  async updateUser(userData) {
    return await UserService.updateUserData(userData);
  }

  async getAllCode(typeInput) {
    return await UserService.getAllCodeService(typeInput);
  }

  async hashUserPassword(password) {
    return await bcryptjs.hash(password, 10);
  }
}

export default new UserFacade();
