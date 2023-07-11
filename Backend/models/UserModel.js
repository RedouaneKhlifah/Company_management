import mongoose from "mongoose";
import bcrypt from "bcryptjs";

// Creating a new schema for users using mongoose
const userSchema = mongoose.Schema({
    user_type: {
        type: Number,
        default: 2
    },
    info_personelle: {
        Nom: {
            type: String,
            trim: true,
            require: true
        },
        Prénom: {
            type: String,
            trim: true,
            require: true
        },
        full_name: {
            type: String,
            trim: true,
        },
        Téléphone: {
            type: String,
            trim: true
        },
        "E-mail": {
            type: String,
            require: true,
            trim: true,
            unique: true
        },
        password: {
            type: String,
            require: true
        }
    },
    info_pro: {
        Direction: {
            type: String,
            trim: true,
            require: true
        },
        Catégorie: {
            type: String,
            trim: true,
            require: true
        },
        Formation: {
            type: String,
            trim: true,
            require: true
        },
        Spécialité: {
            type: String,
            trim: true,
            require: true
        },
        "Expérience extérieure": {
            type: Number,
            trim: true,
            require: true
        },
        "Expérience intérieure": {
            type: Date,
            trim: true,
            require: true
        },
        "Service extérieur": {
            type: String,
            trim: true,
            require: true
        }
    },
    Compétences: [
        {
            Emploi: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "emplois",
                require: true
            },
            Compétence: [
                {
                    competence_id: {
                        type: mongoose.Schema.Types.ObjectId,
                        ref: "competences",
                        require: true
                    },
                    Niveau: {
                        type: Number,
                        trim: true,
                        require: true
                    }
                }
            ]
        }
    ]
}, {
    // Adding timestamps to the schema to track when documents are created and updated
    timestamps: true,
    // Allow fields not defined in the schema to be saved to the database
    strict: false
});

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
