import User from "../../src/model/User"
import { CreateUserService } from "../../src/api/CreateUser"

describe("CreateUserService", () => {
    test("Should create user", () => {
        //Given
        let uut = new CreateUserService();
        let user = {id: 0, username: 'user1'};

        //When
        let newUser = uut.createUser(user);

        //Then
        expect(newUser.id).toBe(1);
    })
})