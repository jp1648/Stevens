//import mongo collections, bcrypt and implement the following data functions
import { users } from "../config/mongoCollections.js";
import bcrypt from "bcrypt";

export const registerUser = async (
  firstName,
  lastName,
  emailAddress,
  password,
  role
) => {
  if (!firstName || !lastName || !emailAddress || !password || !role) {
    throw new Error("All fields must be supplied");
  }

  firstName = firstName.trim();
  lastName = lastName.trim();
  emailAddress = emailAddress.trim();

  if (!/^[A-Za-z]{2,25}$/.test(firstName)) {
    throw new Error("Invalid firstName");
  }
  if (!/^[A-Za-z]{2,25}$/.test(lastName)) {
    throw new Error("Invalid lastName");
  }

  if (!/^\S+@\S+\.\S+$/.test(emailAddress)) {
    throw new Error("Invalid emailAddress format");
  }

  const usersCollection = await users();

  if (!usersCollection) {
    throw new Error("500 Error");
  }

  emailAddress = emailAddress.toLowerCase();
  const validEmail = await usersCollection.findOne({
    emailAddress: emailAddress,
  });

  if (validEmail) {
    throw new Error("Email already exists");
  }

  if (!/(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}/.test(password)) {
    throw new Error("Invalid password");
  }

  const saltRounds = 16;
  const hash = await bcrypt.hash(password, saltRounds);

  const roleLower = role.toLowerCase();
  if (roleLower !== "admin" && roleLower !== "user") {
    throw new Error("Invalid role");
  }

  const userEntry = await usersCollection.insertOne({
    firstName: firstName,
    lastName: lastName,
    emailAddress: emailAddress,
    password: hash,
    role: role,
  });

  return {
    insertedUser: true,
  };
};

export const loginUser = async (emailAddress, password) => {
  if (!emailAddress || !password) {
    throw new Error("All fields must be supplied");
  }

  if (!/^\S+@\S+\.\S+$/.test(emailAddress)) {
    throw new Error("Invalid emailAddress format");
  }

  emailAddress = emailAddress.toLowerCase();

  if (!/(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}/.test(password)) {
    throw new Error("Invalid password");
  }

  const usersCollection = await users();

  const validEmail = await usersCollection.findOne({
    emailAddress: emailAddress,
  });

  if (!validEmail) {
    throw new Error("Either the email address or password is invalid");
  }

  const { password: hash } = await usersCollection.findOne(
    { emailAddress: emailAddress },
    { projection: { password: 1, _id: 0 } }
  );

  const passMatch = await bcrypt.compare(password, hash);

  if (passMatch) {
    const { firstName, lastName, role } = await usersCollection.findOne(
      { emailAddress: emailAddress },
      { projection: { firstName: 1, lastName: 1, role: 1, _id: 0 } }
    );

    return {
      firstName: firstName,
      lastName: lastName,
      emailAddress: emailAddress,
      role: role,
    };
  } else {
    throw new Error("Either the email address or password is invalid");
  }
};
