import { Param, Body, Get, Post, Put, Delete, JsonController } from "routing-controllers";
import {User, UserModel} from './User';

@JsonController()
export class UserController {

    @Get("/users")
    getAll(): any  {
       return UserModel.find().lean();
      //  console.log(user);
      //  return user.toString();
    }

    @Get("/users/:id")
    getOne(@Param("id") id: number): string {
       return "This action returns user #" + id;
    }

    @Post("/users")
    async post(@Body() user: User): Promise<string>  {
       console.log(user);
       await UserModel.create(user);
       return 'OK';
    }

    @Put("/users/:id")
    put(@Param("id") id: number, @Body() user: any): string {
       return "Updating a user...";
    }

    @Delete("/users/:id")
    remove(@Param("id") id: number): string {
       return "Removing user...";
    }

}