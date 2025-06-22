const UserModel = require('../Models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const user = await UserModel.findOne({ email });
        if (user) {
            return res.status(400).json({ error: 'User already exists', success: false });
        }
        const userModel = new UserModel({ name, email, password });
        userModel.password = await bcrypt.hash(password, 10);
        await userModel.save();
        return res.status(201).json({ message: 'User created successfully', success: true });
    } catch (err) {
        console.error('Signup error:', err);
        return res.status(500).json({ error: 'Internal server error', success: false });
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await UserModel.findOne({ email });
        const errorMessage = 'Authentication failed! Email or Password is wrong';
        if (!user) {
            return res.status(403).json({ error: errorMessage , success: false });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(403).json({ error: errorMessage, success: false });
        }

        const jwtToken = jwt.sign({
             email: user.email, id: user._id },
            process.env.JWT_SECRET, { expiresIn: '24h' });
        return res.status(200).json({
             message: 'Login successful',
             success: true,
             jwtToken,
            email: user.email,
             name: user.name
         });
    } catch (err) {
        console.error('Login error:', err);
        return res.status(500).json({ error: 'Internal server error', success: false });
    }
}

const updateProfile = async (req, res) => {
    try {
        const { name, email } = req.body;
        const userId = req.user.id; // This comes from the auth middleware
        
        // Check if email is already taken by another user
        const existingUser = await UserModel.findOne({ 
            email, 
            _id: { $ne: userId } 
        });
        
        if (existingUser) {
            return res.status(400).json({ 
                error: 'Email is already taken by another user', 
                success: false 
            });
        }
        
        const updatedUser = await UserModel.findByIdAndUpdate(
            userId,
            { name, email },
            { new: true, select: '-password' }
        );
        
        if (!updatedUser) {
            return res.status(404).json({ 
                error: 'User not found', 
                success: false 
            });
        }
        
        return res.status(200).json({
            message: 'Profile updated successfully',
            success: true,
            user: {
                name: updatedUser.name,
                email: updatedUser.email
            }
        });
    } catch (err) {
        console.error('Update profile error:', err);
        return res.status(500).json({ 
            error: 'Internal server error', 
            success: false 
        });
    }
};

module.exports = {
    signup,
    login,
    updateProfile
};