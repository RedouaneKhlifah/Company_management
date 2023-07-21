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
            userType: {
                type: Number,
                default: 5
                /**
                 * 1 == Super Admin
                 * 2 == Admin
                 * 3 == Read-only Admin
                 * 4 == Trainer (Formateur)
                 * 5 == Employee
                 */
            },
            fullName: {
                type: String,
                trim: true
            },
            profilePicture: {
                data: Buffer,
                contentType: String,
                type: String,
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
                    ref: "competence",
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
                    ref: "emploi",
                    required: true
                }
            }
        ],
        history: {
            createdBy: {
                user_id: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "personne"
                },
                timestamp: Date,
            },
            updatedBy: [
                {
                    user_id: {
                        type: mongoose.Schema.Types.ObjectId,
                        ref: "personne"
                    },
                    timestamp: Date,
                }
            ]
        }
    },
    {
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
