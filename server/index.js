require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const app = express();
const mongoose = require('mongoose');
const morgan = require('morgan');
const multer = require('multer');
const path = require('path');

const authRouter = require("./routers/auth.router");
const userRouter = require("./routers/user.router");
const postRouter = require("./routers/post.router");

const connectDB = async () => {
    try {
        await mongoose.connect(
            `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@social-media.pgrhv.mongodb.net/Social-Media?retryWrites=true&w=majority`, 
            {
                useCreateIndex: true,
				useNewUrlParser: true,
				useUnifiedTopology: true,
				useFindAndModify: false
            }
        )
        console.log('MongoDB connected');
    } catch (error) {
        console.log(error.message);
        process.exit(1);
    }
}

connectDB();

app.use('/images', express.static(path.join(__dirname, 'public/images')))

// middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/images")
    },
    filename: (req, file, cb) => {
        cb(null, req.body.name);
    }
});

const upload = multer({ storage });
app.post('/api/upload', upload.single('file'), (req, res) => {
    try {
        return res.status(200).json('File uploaded successfully.');
    } catch (error) {
        console.log(error);
    }
});

app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use('/api/posts', postRouter);

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
})