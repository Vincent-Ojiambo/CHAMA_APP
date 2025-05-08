import mongoose from "mongoose";

const LoanSchema = new mongoose.Schema(
  {
    chama: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Chama",
      required: true,
    },
    borrower: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    guarantors: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }],
    amount: {
      type: Number,
      required: true,
      min: 0,
    },
    purpose: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected", "paid", "defaulted", "overdue"],
      default: "pending",
    },
    approvedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    approvalDate: {
      type: Date
    },
    repaymentSchedule: [{
      amount: {
        type: Number,
        required: true,
        min: 0,
      },
      dueDate: {
        type: Date,
        required: true,
      },
      status: {
        type: String,
        enum: ["pending", "completed", "overdue"],
        default: "pending",
      },
      paymentDate: {
        type: Date
      },
      paymentMethod: {
        type: String,
        enum: ["cash", "mobile_money", "bank_transfer", "other"]
      },
      paymentReference: {
        type: String
      }
    }],
    collateral: {
      type: String,
      trim: true,
    },
    interestRate: {
      type: Number,
      min: 0,
      max: 100,
    },
    interestAmount: {
      type: Number,
      default: 0,
    },
    totalRepaymentAmount: {
      type: Number,
      default: 0,
    },
    paymentHistory: [{
      amount: {
        type: Number,
        required: true,
        min: 0,
      },
      paymentDate: {
        type: Date,
        required: true,
      },
      paymentMethod: {
        type: String,
        enum: ["cash", "mobile_money", "bank_transfer", "other"],
        required: true,
      },
      paymentReference: {
        type: String,
        trim: true,
      },
      notes: {
        type: String,
        trim: true,
      },
      verifiedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      }
    }],
    createdAt: {
      type: Date,
      default: Date.now,
      immutable: true,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
    closedAt: {
      type: Date
    },
    defaultDate: {
      type: Date
    },
    overdueSince: {
      type: Date
    }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Virtuals
LoanSchema.virtual("totalPaid").get(function() {
  return this.paymentHistory.reduce((sum, payment) => sum + payment.amount, 0);
});

LoanSchema.virtual("balance").get(function() {
  return this.totalRepaymentAmount - this.totalPaid;
});

LoanSchema.virtual("isOverdue").get(function() {
  if (this.status !== "approved") return false;
  
  const today = new Date();
  const nextPayment = this.repaymentSchedule.find(s => 
    s.status === "pending" && s.dueDate <= today
  );
  
  return !!nextPayment;
});

LoanSchema.virtual("daysOverdue").get(function() {
  if (!this.isOverdue) return 0;
  
  const nextPayment = this.repaymentSchedule.find(s => 
    s.status === "pending" && s.dueDate <= new Date()
  );
  
  return Math.floor((new Date() - nextPayment.dueDate) / (1000 * 60 * 60 * 24));
});

// Indexes
LoanSchema.index({ chama: 1, createdAt: -1 });
LoanSchema.index({ borrower: 1, createdAt: -1 });
LoanSchema.index({ status: 1 });
LoanSchema.index({ "repaymentSchedule.dueDate": 1 });
LoanSchema.index({ "repaymentSchedule.status": 1 });
LoanSchema.index({ "guarantors": 1 });

// Methods
LoanSchema.methods.calculateInterest = function() {
  if (!this.interestRate) return 0;
  
  const monthlyRate = this.interestRate / 12 / 100;
  const totalInterest = this.amount * monthlyRate * this.repaymentSchedule.length;
  
  this.interestAmount = totalInterest;
  this.totalRepaymentAmount = this.amount + totalInterest;
  
  // Update each repayment installment with interest
  const installmentAmount = this.totalRepaymentAmount / this.repaymentSchedule.length;
  this.repaymentSchedule.forEach(installment => {
    installment.amount = installmentAmount;
  });
};

LoanSchema.methods.markAsPaid = async function(payment) {
  this.status = "paid";
  this.closedAt = new Date();
  
  // Add to payment history
  this.paymentHistory.push(payment);
  
  // Update repayment schedule
  const remainingInstallments = this.repaymentSchedule.filter(
    s => s.status === "pending"
  );
  
  remainingInstallments.forEach(installment => {
    installment.status = "completed";
    installment.paymentDate = new Date();
    installment.paymentMethod = payment.paymentMethod;
    installment.paymentReference = payment.paymentReference;
  });
  
  await this.save();
  return this;
};

LoanSchema.methods.markAsDefaulted = async function() {
  this.status = "defaulted";
  this.defaultDate = new Date();
  
  // Update all remaining installments as overdue
  const remainingInstallments = this.repaymentSchedule.filter(
    s => s.status === "pending"
  );
  
  remainingInstallments.forEach(installment => {
    installment.status = "overdue";
  });
  
  await this.save();
  return this;
};

LoanSchema.methods.calculateLateFee = function() {
  if (!this.isOverdue) return 0;
  
  const daysOverdue = this.daysOverdue;
  return this.amount * 0.02 * daysOverdue; // 2% daily late fee
};

export default mongoose.model("Loan", LoanSchema);
