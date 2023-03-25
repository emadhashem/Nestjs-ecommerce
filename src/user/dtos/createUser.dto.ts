import { IsEmail, IsString, Min, min, MinLength } from "class-validator";

export class CreateUserDto {
    @IsString({
        message: 'first name should not be empty'
    })
    readonly fname: string

    @IsString({
        message: 'Last name should not be empty'
    })
    readonly lname: string

    @IsString({})
    @IsEmail({}, {
        message: 'Email must be valid'
    })
    readonly email: string

    @IsString()
    @MinLength(4)
    readonly password: string
}