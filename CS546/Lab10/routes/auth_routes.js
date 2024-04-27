//import express, express router as shown in lecture code

import { Router } from "express";
const router = Router();
import { registerUser, loginUser } from "../data/users.js";

router.route("/").get(async (req, res) => {
  //code here for GET THIS ROUTE SHOULD NEVER FIRE BECAUSE OF MIDDLEWARE #1 IN SPECS.
  return res.json({ error: "YOU SHOULD NOT BE HERE!" });
});

router
  .route("/register")
  .get(async (req, res) => {
    res.render("register", { pageTitle: "Register with us" });
  })
  .post(async (req, res) => {
    const {
      firstNameInput,
      lastNameInput,
      emailAddressInput,
      passwordInput,
      confirmPasswordInput,
      roleInput,
    } = req.body;

    let missingFields = [];
    let errors = [];

    [
      "firstNameInput",
      "lastNameInput",
      "emailAddressInput",
      "passwordInput",
      "confirmPasswordInput",
      "roleInput",
    ].forEach((field) => {
      if (!req.body[field]) {
        missingFields.push(field.replace("Input", ""));
      }
    });

    if (missingFields.length > 0) {
      return res.status(400).render("register", {
        error: `Missing fields: ${missingFields.join(", ")}.`,
        pageTitle: "Register with us",
        prevData: req.body,
      });
    }

    if (!/^[A-Za-z]{2,25}$/.test(firstNameInput)) {
      errors.push(
        "First name must be between 2 and 25 characters and cannot contain numbers or spaces."
      );
    }

    // Validate lastNameInput
    if (!/^[A-Za-z]{2,25}$/.test(lastNameInput)) {
      errors.push(
        "Last name must be between 2 and 25 characters and cannot contain numbers or spaces."
      );
    }

    // Validate emailAddressInput
    if (!/^\S+@\S+\.\S+$/.test(emailAddressInput)) {
      errors.push("Email address is invalid.");
    }

    // Validate passwordInput
    if (!/(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}/.test(passwordInput)) {
      errors.push(
        "Password must be at least 8 characters long and include at least one uppercase letter, one number, and one special character."
      );
    }

    // Confirm passwordInput matches confirmPasswordInput
    if (passwordInput !== confirmPasswordInput) {
      errors.push("Passwords do not match.");
    }

    // Validate roleInput
    if (!["admin", "user"].includes(roleInput.toLowerCase())) {
      errors.push('Role must be either "admin" or "user".');
    }

    if (errors.length > 0) {
      // Respond with 400 status code and error messages
      return res.status(400).render("register", {
        pageTitle: "Register with us",
        error: `The following errors have been encountered:   ${errors.join(
          ", "
        )}`,
      });
    }

    try {
      let reg = await registerUser(
        firstNameInput,
        lastNameInput,
        emailAddressInput,
        passwordInput,
        roleInput
      );
      return res.redirect("/login");
    } catch (e) {
      if (e === "500 Error") {
        errors.push(e);
        return res.status(500).render("error", {
          error: `Internal server error  ${errors.join(", ")}`,
        });
      } else {
        return res
          .status(400)
          .render("register", { pageTitle: "Register with us", error: `${e}` });
      }
    }
  });

router
  .route("/login")
  .get(async (req, res) => {
    res.render("login", { pageTitle: "Login" });
  })
  .post(async (req, res) => {
    const { emailAddressInput, passwordInput } = req.body;

    let missingFields = [];
    let errors = [];

    ["emailAddressInput", "passwordInput"].forEach((field) => {
      if (!req.body[field]) {
        missingFields.push(field.replace("Input", ""));
      }
    });

    if (!/^\S+@\S+\.\S+$/.test(emailAddressInput)) {
      errors.push("Email address is invalid");
    }

    if (!/(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}/.test(passwordInput)) {
      errors.push(
        "Password must be at least 8 characters long and include at least one uppercase letter, one number, and one special character."
      );
    }

    if (errors.length > 0) {
      // Respond with 400 status code and error messages
      return res.status(400).render("login", {
        pageTitle: "Login",
        error: `The following errors have been encountered:   ${errors.join(
          ", "
        )}`,
      });
    }

    try {
      let user = await loginUser(emailAddressInput, passwordInput);
      if (user) {
        req.session.user = {
          firstName: user.firstName,
          lastName: user.lastName,
          emailAddress: user.emailAddress,
          role: user.role,
        };
        if (user.role === "admin") {
          return res.redirect("/admin");
        } else {
          return res.redirect("/protected");
        }
      } else {
        return res.status(400).render("login", {
          error: "Invalid username or password.",
          pageTitle: "Login",
        });
      }
    } catch (e) {
      if (e === "500 Error") {
        errors.push(e);
        return res.status(500).render("error", {
          error: `Internal server error  ${errors.join(", ")}`,
        });
      } else {
        errors.push(e);
        return res.status(400).render("login", {
          pageTitle: "Login",
          error: `${errors.join(", ")}`,
        });
      }
    }
  });

router.route("/protected").get(async (req, res) => {
  if (req.session.user.role === "admin") {
    res.render("protected", {
      firstName: req.session.user.firstName,
      lastName: req.session.user.lastName,
      isAdmin: true,
      role: req.session.user.role,
      currentTime: new Date().toUTCString(),
    });
  } else {
    res.render("protected", {
      firstName: req.session.user.firstName,
      lastName: req.session.user.lastName,
      isAdmin: false,
      role: req.session.user.role,
      currentTime: new Date().toUTCString(),
    });
  }
});

router.route("/admin").get(async (req, res) => {
  res.render("admin", {
    firstName: req.session.user.firstName,
    lastName: req.session.user.lastName,
    currentTime: new Date().toUTCString(),
  });
});

router.route("/error").get(async (req, res) => {
  res.render("error");
});

router.route("/logout").get(async (req, res) => {
  res.clearCookie("AuthState");
  res.render("logout", { body: "You have been logged out." });
});

export default router;
