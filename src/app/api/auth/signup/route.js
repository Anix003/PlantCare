import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { AddNewUser } from "@/services/AddNewUser";

export async function POST(request) {
  try {
    console.log("Received request to create a new user...");
    const {
      firstName,
      lastName,
      email,
      password,
      phone,
      company,
      acceptMarketing,
    } = await request.json();

    // Hash the password
    // const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = {
      firstName,
      lastName,
      email,
      // password: hashedPassword,
      password: password, // Use the plain password for now
      phone,
      company,
      acceptMarketing,
    };

    // console.log("Get new User Data:", newUser);
    console.log("Adding new user to the database...");
    // Save newUser to Google Sheets or database
    const addedUser = await AddNewUser(newUser, "userdata");
    // console.log("User added successfully:", addedUser);
    if (!addedUser) {
      throw new Error("Failed to add user to the database");
    }

    // TODO: Send verification email

    // Return the added user data
    console.log("Sending response back to the client...");
    return NextResponse.json(
      {
        success: true,
        data: addedUser,
      },
      {
        status: 201,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: error.message || "Failed to create account",
      },
      { status: 500 }
    );
  }
}
