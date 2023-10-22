import {IsEmail, IsNotEmpty, IsNumber, IsString, Matches, Length, MaxLength, Equals} from'class-validator';

export class AdminInfo{
    
    userid: number

    //for name
    @IsString({message:"Your name is invalid"})
    @Matches( /^[a-zA-Z]+$/, {message:"Enter Your name properly"})
    name:string

    
    username: string

    // For user email
    @IsEmail({}, { message: "Your email is invalid" })
    @IsNotEmpty({ message: "Email should not be empty" })
    @MaxLength(100, { message: "Email should not exceed 100 characters" })
    email: string;

    
    // For user password
    @IsString({ message: "Your password is invalid" })
    @IsNotEmpty({ message: "Password should not be empty" })
    @Length(6, 20, { message: "Password should be between 6 and 20 characters" })
    password: string;


    // For user age
    //@IsNumber({}, { message: "Age should be a number" })
    @IsNotEmpty({ message: "Age should not be empty" })
    age: number;


}