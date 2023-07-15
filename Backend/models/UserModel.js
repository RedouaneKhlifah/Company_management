import mongoose from "mongoose";
import bcrypt from "bcryptjs";

// Creating a new schema for users using mongoose
const userSchema = mongoose.Schema(
    {
        password: {
            type: String,
            required: true
        },
        otherInfo: {
            // 1 == Admin
            userType: {
                type: Number,
                default: 2
            },
            fullName: {
                type: String,
                trim: true
            },
            profilePicture: {
                data: Buffer,
                contentType: String
            }
        },
        personalInfo: {
            Nom: {
                type: String,
                trim: true,
                required: true
            },
            Prénom: {
                type: String,
                trim: true,
                required: true
            },
            Téléphone: {
                type: String,
                trim: true
            },
            "E-mail personnel": {
                type: String,
                required: true,
                trim: true,
                unique: true
            },
            "E-mail professionnel": {
                type: String,
                required: true,
                trim: true,
                unique: true
            }
        },
        professionalInfo: {
            Direction: {
                type: String,
                trim: true,
                required: true
            },
            Catégorie: {
                type: String,
                trim: true,
                required: true
            },
            Formation: {
                type: String,
                trim: true,
                required: true
            },
            Spécialité: {
                type: String,
                trim: true,
                required: true
            },
            "Expérience antérieure": {
                type: Number,
                trim: true,
                required: true
            },
            "Expérience à l'ANEP": {
                type: Date,
                trim: true,
                required: true
            },
            "Service extérieur": {
                type: String,
                trim: true,
                required: true
            }
        },
        skills: [
            {
                competence_id: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "competences",
                    required: true
                },
                title: {
                    type: String,
                    required: true
                },
                Niveau: {
                    type: Number,
                    trim: true,
                    required: true
                }
            }
        ],
        jobs: [
            {
                emploi_id: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "emplois",
                    required: true
                },
                title: {
                    type: String,
                    required: true
                }
            }
        ]
    },
    {
        // Adding timestamps to the schema to track when documents are created and updated
        timestamps: true,
        // Allow fields not defined in the schema to be saved to the database
        strict: false
    }
);

// Using a pre-save hook to hash the user's password before saving it to the database
userSchema.pre("save", async function (next) {
    // Checking if the password field has been modified
    if (!this.isModified("password")) {
        // Skip hashing the password if not modified
        next();
    }

    // Generating a salt using bcrypt
    const salt = await bcrypt.genSalt(10);

    // Hashing the user's password using the generated salt
    this.password = await bcrypt.hash(this.password, salt);
});

// Comparing the plain text password from the user with the hashed password in database
userSchema.methods.matchPassword = async function (pwd) {
    return await bcrypt.compare(pwd, this.password);
};

// Creating a new User model using the userSchema
const User = mongoose.model("personne", userSchema);

// Exporting the User model for use in other parts of the application
export default User;
