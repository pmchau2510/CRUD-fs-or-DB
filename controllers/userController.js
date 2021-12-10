const catchAsync = require("../middlewares/async");
const User = require("../models/user");
const ApiError = require("../utils/ApiError");
const fs = require("fs");
const { v4: uuidv4 } = require('uuid');

let users = [
];

exports.getUsers = catchAsync(async (req, res) => {
    const getUsers = fs.readFileSync('user.json').toString();
    if (!getUsers) {
        throw new ApiError(404, "Not Found");
    }
    res.json({
        success: true,
        data: JSON.parse(getUsers),
    });
});
exports.getUserById = catchAsync(async (req, res) => {
    const { id } = req.query;
    let data;
    const getUser = fs.readFileSync('user.json').toString();
    const foundUserId = JSON.parse(getUser);
    foundUserId.forEach((user) => {
        if (user.id === id) data = user;
    });
    if (!data) {
        throw new ApiError(404, "Not Found");
    }
    res.json({
        success: true,
        data,
    });
});

exports.searchUser = catchAsync(async (req, res) => {
    const { firstname, lastname } = req.query;

    const getUser = fs.readFileSync('user.json').toString();
    let dataUser = JSON.parse(getUser);
    var sortUser = [];
    if (getUser) {
        dataUser = dataUser.filter((user) => user.firstname === firstname || user.lastname === lastname);
        for (var i in dataUser) {
            sortUser.push(dataUser[i]);
        }
        sortUser.sort((a, b) => {
            if (a.firstname.toLowerCase() > b.firstname.toLowerCase()) return -1;
            if (a.firstname.toLowerCase() < b.firstname.toLowerCase()) return 1;
            return 0;
        });
        if (dataUser.length == 0) {
            throw new ApiError(404, "Not Found");
        }
    }
    res.json({
        success: true,
        data: sortUser,
    });
});
exports.createUser = catchAsync(async (req, res) => {

    const { firstname, lastname, age } = req.body;
    let errors = [];
    if (age < 1 || age > 100) {
        errors.push("Invalid age");
    }
    if (firstname.length < 3 || lastname.length < 3) {
        errors.push("Firstname or lastname must be at least 3 characters");
    }
    if (errors.length > 0) {
        return res.status(404).json({
            sucess: false,
            message: errors
        });
    }
    const getUser = fs.readFileSync('user.json').toString();
    if (getUser) {
        const dataUser = JSON.parse(getUser);
        users = dataUser;
    }
    const user =
    {
        id: uuidv4(),
        firstname,
        lastname,
        age
    }
    users.push(user);
    fs.writeFileSync('user.json', JSON.stringify(users));
    res.status(201).json(user);


});

exports.deleteUser = catchAsync(async (req, res) => {
    const { id } = req.params;
    const getUser = fs.readFileSync('user.json').toString();
    if (getUser) {
        let dataUser = JSON.parse(getUser);
        dataUser = dataUser.filter((user) => user.id !== id);
        fs.writeFileSync('user.json', JSON.stringify(dataUser));
    }
    res.json({
        success: true,
        message: `Successfully deleted user with id ${id}`
    });
});

exports.updateUser = catchAsync(async (req, res) => {
    const { firstname, lastname, age } = req.body;
    let errors = [];
    const { id } = req.params;
    const getUser = fs.readFileSync('user.json').toString();
    if (getUser) {
        let dataUser = JSON.parse(getUser);
        const user = await dataUser.find((user) => user.id === id);
        if (firstname) {
            if (firstname.length < 3)
                errors.push("Firstname must be at least 3 characters");
            else {
                user.firstname = firstname;
            }
        }
        if (lastname) {
            if (lastname.length < 3)
                errors.push("Lastname must be at least 3 characters");
            else {
                user.lastname = lastname;
            }
        }
        if (age) {
            if (age < 1 || age > 100)
                errors.push("Invalid age");
            else {
                user.age = age;
            }
        }
        if (errors.length > 0) {
            return res.status(404).json({
                sucess: false,
                message: errors
            });
        }
        fs.writeFileSync('user.json', JSON.stringify(dataUser));
    }
    res.json({
        sucess: true,
        message: `Successfully updated user with id ${id}`
    });

});


