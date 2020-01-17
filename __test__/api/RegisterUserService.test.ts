import User from "../../src/model/User"
import { RegisterUserService } from "../../src/api/RegisterUser"

describe("RegisterUserService", () => {
    test("Should register user", async () => {
        //Given
        let uut = new RegisterUserService(); //a real test would inject a mock UserMap
        let username = "user";
        let password = "secret";

        //When
        let user = await uut.registerUser(username, password);

        //Then
        expect(user.id).toBe(1);
        expect(user.username).toBe(username);
    })
})