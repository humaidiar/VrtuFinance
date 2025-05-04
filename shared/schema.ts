import { pgTable, text, serial, integer, boolean, numeric, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Calculator form data schema
export const calculatorFormSchema = z.object({
  goal: z.enum(["first-home", "investment", "new-home", "refinancing"]),
  location: z.string().min(1, "Please select a location"),
  income: z.number().min(0, "Income must be a positive number"),
  savings: z.number().min(0, "Savings must be a positive number"),
  expenses: z.number().min(0, "Expenses must be a positive number"),
  commitments: z.number().min(0, "Commitments must be a positive number"),
  propertyPrice: z.number().min(0, "Property price must be a positive number"),
  depositAmount: z.number().min(0, "Deposit amount must be a positive number"),
  term: z.number().int().min(5).max(30).default(25),
  propertyType: z.enum(["existing", "new-construction", "apartment"]).optional(),
  appreciationRate: z.number().min(0).max(10).default(3).optional(),
});

export type CalculatorFormData = z.infer<typeof calculatorFormSchema>;

// Calculation results schema
export const calculationResultSchema = z.object({
  monthlyPayment: z.number(),
  initialOwnershipPercentage: z.number(),
  fullOwnershipYears: z.number(),
  totalRentPaid: z.number(),
  totalSharesPurchased: z.number(),
  yearlyBreakdown: z.array(
    z.object({
      year: z.number(),
      customerOwnershipPercentage: z.number(),
      weeklyPayment: z.number(),
      rentComponent: z.number(),
      shareComponent: z.number(),
      remainingProviderShare: z.number(),
    })
  ),
});

export type CalculationResult = z.infer<typeof calculationResultSchema>;

// Lead submissions for contact form
export const leads = pgTable("leads", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  message: text("message"),
  interested_in: text("interested_in"),
  created_at: text("created_at").notNull().default(new Date().toISOString()),
});

export const insertLeadSchema = createInsertSchema(leads).omit({
  id: true,
  created_at: true,
});

export type InsertLead = z.infer<typeof insertLeadSchema>;
export type Lead = typeof leads.$inferSelect;
