import mongoose from "mongoose";
import validator from "validator";

const ChamaSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Chama name is required"],
      trim: true,
      maxlength: [50, "Chama name cannot exceed 50 characters"],
      minlength: [2, "Chama name must be at least 2 characters"],
    },
    description: {
      type: String,
      trim: true,
      maxlength: [500, "Description cannot exceed 500 characters"],
    },
    members: [
      {
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        name: {
          type: String,
          required: true,
        },
        role: {
          type: String,
          enum: ["admin", "member"],
          default: "member",
        },
        gender: {
          type: String,
          enum: ["male", "female", "other"],
          required: true,
        },
        age: {
          type: Number,
          min: 18,
          max: 100,
        },
        county: {
          type: String,
          required: true,
        },
        subcounty: {
          type: String,
          required: true,
        },
        village: {
          type: String,
          required: true,
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
        isActive: {
          type: Boolean,
          default: true,
        }
      },
    ],
    totalFunds: {
      type: Number,
      default: 0,
    },
    contributionAmount: {
      type: Number,
      required: [true, "Contribution amount is required"],
      min: [100, "Minimum contribution amount is 100 KSH"],
    },
    currency: {
      type: String,
      enum: ["KSH", "USD", "EUR"],
      default: "KSH",
    },
    status: {
      type: String,
      enum: ["active", "inactive", "archived"],
      default: "active",
    },
    createdAt: {
      type: Date,
      default: Date.now,
      immutable: true,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Virtuals
ChamaSchema.virtual("totalMembers").get(function () {
  return this.members.length;
});

ChamaSchema.virtual("activeMembers").get(function () {
  return this.members.filter(member => member.isActive).length;
});

ChamaSchema.virtual("inactiveMembers").get(function () {
  return this.members.length - this.activeMembers;
});

// Methods
ChamaSchema.methods.calculateMemberStatistics = function() {
  const stats = {
    total: this.totalMembers,
    active: this.activeMembers,
    inactive: this.inactiveMembers,
    byGender: {
      male: this.members.filter(m => m.gender === 'male').length,
      female: this.members.filter(m => m.gender === 'female').length,
      other: this.members.filter(m => m.gender === 'other').length
    },
    byCounty: {},
    byAgeGroup: {
      '18-25': 0,
      '26-35': 0,
      '36-45': 0,
      '46-55': 0,
      '56+': 0
    }
  };

  // Calculate county distribution
  this.members.forEach(member => {
    if (member.county) {
      stats.byCounty[member.county] = (stats.byCounty[member.county] || 0) + 1;
    }
    
    // Calculate age group distribution
    if (member.age) {
      if (member.age >= 18 && member.age <= 25) stats.byAgeGroup['18-25']++;
      else if (member.age >= 26 && member.age <= 35) stats.byAgeGroup['26-35']++;
      else if (member.age >= 36 && member.age <= 45) stats.byAgeGroup['36-45']++;
      else if (member.age >= 46 && member.age <= 55) stats.byAgeGroup['46-55']++;
      else if (member.age >= 56) stats.byAgeGroup['56+']++;
    }
  });

  return stats;
};

// Indexes
ChamaSchema.index({ name: "text", description: "text" });
ChamaSchema.index({ createdAt: -1 });
ChamaSchema.index({ status: 1 });
ChamaSchema.index({ "members.userId": 1 });
ChamaSchema.index({ "members.isActive": 1 });
ChamaSchema.index({ "members.county": 1 });
ChamaSchema.index({ "members.gender": 1 });

export default mongoose.model("Chama", ChamaSchema);
